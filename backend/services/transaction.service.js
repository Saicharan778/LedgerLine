const crypto = require("crypto");
const pool = require("../config/db");
const { toPaise } = require("../utils/money");

const parseSavedResponse = (value) => {
  if (!value) return null;
  return typeof value === "string" ? JSON.parse(value) : value;
};

const createDeposit = async ({ userId, accountId, amount, idempotencyKey }) => {
  const amountPaise = BigInt(toPaise(amount));

  const requestHash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        type: "DEPOSIT",
        accountId: String(accountId),
        amountPaise: amountPaise.toString(),
      }),
    )
    .digest("hex");

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Claim this idempotency key before processing the deposit.
    await connection.execute(
      `INSERT INTO idempotency_keys
        (user_id, idempotency_key, request_hash)
       VALUES (?, ?, ?)`,
      [userId, idempotencyKey, requestHash],
    );

    // Find the internal system account.
    const [systemRows] = await connection.execute(
      `SELECT id
       FROM accounts
       WHERE account_type = 'SYSTEM'
         AND account_number = 'LEDGERLINE-SYSTEM-001'`,
    );

    if (systemRows.length !== 1) {
      throw new Error("System account is missing or incorrectly configured");
    }

    const systemAccountId = systemRows[0].id;

    // Lock both accounts in a consistent order.
    const [accounts] = await connection.execute(
      `SELECT id, user_id, account_type, balance_paise, status
       FROM accounts
       WHERE id IN (?, ?)
       ORDER BY id
       FOR UPDATE`,
      [systemAccountId, accountId],
    );

    const systemAccount = accounts.find(
      (account) => account.account_type === "SYSTEM",
    );

    const customerAccount = accounts.find(
      (account) => String(account.id) === String(accountId),
    );

    if (!customerAccount || customerAccount.account_type !== "CUSTOMER") {
      const error = new Error("Account not found");
      error.statusCode = 404;
      throw error;
    }

    // Do not reveal accounts belonging to another customer.
    if (String(customerAccount.user_id) !== String(userId)) {
      const error = new Error("Account not found");
      error.statusCode = 404;
      throw error;
    }

    if (!systemAccount) {
      throw new Error("System account could not be locked");
    }

    const systemBalance = BigInt(systemAccount.balance_paise);
    const customerBalance = BigInt(customerAccount.balance_paise);

    let refusalReason = null;

    if (
      systemAccount.status !== "ACTIVE" ||
      customerAccount.status !== "ACTIVE"
    ) {
      refusalReason = "One or more accounts are not active";
    } else if (systemBalance < amountPaise) {
      refusalReason = "Insufficient funds in the system account";
    }

    // Refused attempts are recorded, but never create ledger entries.
    if (refusalReason) {
      const [transactionResult] = await connection.execute(
        `INSERT INTO transactions
          (reference_id, transaction_type, status,
           from_account_id, to_account_id, amount_paise,
           initiated_by, failure_reason)
         VALUES (?, 'DEPOSIT', 'REFUSED', ?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          systemAccountId,
          accountId,
          amountPaise.toString(),
          userId,
          refusalReason,
        ],
      );

      const response = {
        success: false,
        message: refusalReason,
        transactionId: transactionResult.insertId,
        status: "REFUSED",
      };

      await connection.execute(
        `UPDATE idempotency_keys
         SET transaction_id = ?, response_json = ?
         WHERE user_id = ? AND idempotency_key = ?`,
        [
          transactionResult.insertId,
          JSON.stringify({ httpStatus: 422, body: response }),
          userId,
          idempotencyKey,
        ],
      );

      await connection.commit();

      return { httpStatus: 422, body: response };
    }

    const updatedSystemBalance = systemBalance - amountPaise;
    const updatedCustomerBalance = customerBalance + amountPaise;

    // Update both balances inside the same database transaction.
    await connection.execute(
      `UPDATE accounts SET balance_paise = ? WHERE id = ?`,
      [updatedSystemBalance.toString(), systemAccountId],
    );

    await connection.execute(
      `UPDATE accounts SET balance_paise = ? WHERE id = ?`,
      [updatedCustomerBalance.toString(), accountId],
    );

    // Create the successful transaction record.
    const [transactionResult] = await connection.execute(
      `INSERT INTO transactions
        (reference_id, transaction_type, status,
         from_account_id, to_account_id, amount_paise, initiated_by)
       VALUES (?, 'DEPOSIT', 'SUCCESS', ?, ?, ?, ?)`,
      [
        crypto.randomUUID(),
        systemAccountId,
        accountId,
        amountPaise.toString(),
        userId,
      ],
    );

    const transactionId = transactionResult.insertId;

    // Double-entry ledger: system debit and customer credit.
    await connection.execute(
      `INSERT INTO ledger_entries
        (transaction_id, account_id, entry_type, amount_paise)
       VALUES (?, ?, 'DEBIT', ?)`,
      [transactionId, systemAccountId, amountPaise.toString()],
    );

    await connection.execute(
      `INSERT INTO ledger_entries
        (transaction_id, account_id, entry_type, amount_paise)
       VALUES (?, ?, 'CREDIT', ?)`,
      [transactionId, accountId, amountPaise.toString()],
    );

    const response = {
      success: true,
      message: "Deposit completed successfully",
      transactionId,
      amountPaise: amountPaise.toString(),
      balancePaise: updatedCustomerBalance.toString(),
      status: "SUCCESS",
    };

    // Save the exact response for future retries.
    await connection.execute(
      `UPDATE idempotency_keys
       SET transaction_id = ?, response_json = ?
       WHERE user_id = ? AND idempotency_key = ?`,
      [
        transactionId,
        JSON.stringify({ httpStatus: 201, body: response }),
        userId,
        idempotencyKey,
      ],
    );

    await connection.commit();

    return { httpStatus: 201, body: response };
  } catch (error) {
    await connection.rollback();

    // Another request may already have claimed this key.
    if (error.code === "ER_DUP_ENTRY") {
      const [existingRows] = await pool.execute(
        `SELECT request_hash, response_json
         FROM idempotency_keys
         WHERE user_id = ? AND idempotency_key = ?`,
        [userId, idempotencyKey],
      );

      if (existingRows.length === 0) {
        throw error;
      }

      const existing = existingRows[0];

      if (existing.request_hash !== requestHash) {
        const conflict = new Error(
          "This idempotency key was already used with a different request",
        );
        conflict.statusCode = 409;
        throw conflict;
      }

      const saved = parseSavedResponse(existing.response_json);

      if (!saved) {
        const conflict = new Error(
          "The original request is still being processed. Retry shortly.",
        );
        conflict.statusCode = 409;
        throw conflict;
      }

      return {
        httpStatus: saved.httpStatus,
        body: saved.body,
      };
    }

    throw error;
  } finally {
    connection.release();
  }
};

const createWithdrawal = async ({
  userId,
  accountId,
  amount,
  idempotencyKey,
}) => {
  const amountPaise = BigInt(toPaise(amount));

  const requestHash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        type: "WITHDRAWAL",
        accountId: String(accountId),
        amountPaise: amountPaise.toString(),
      }),
    )
    .digest("hex");

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Claim the idempotency key.
    await connection.execute(
      `INSERT INTO idempotency_keys
        (user_id, idempotency_key, request_hash)
       VALUES (?, ?, ?)`,
      [userId, idempotencyKey, requestHash],
    );

    // Find the system account.
    const [systemRows] = await connection.execute(
      `SELECT id
       FROM accounts
       WHERE account_type = 'SYSTEM'
         AND account_number = 'LEDGERLINE-SYSTEM-001'`,
    );

    if (systemRows.length !== 1) {
      throw new Error("System account is missing or incorrectly configured");
    }

    const systemAccountId = systemRows[0].id;

    // Lock both accounts in ascending ID order.
    const [accounts] = await connection.execute(
      `SELECT id, user_id, account_type, balance_paise, status
       FROM accounts
       WHERE id IN (?, ?)
       ORDER BY id
       FOR UPDATE`,
      [systemAccountId, accountId],
    );

    const systemAccount = accounts.find(
      (account) => account.account_type === "SYSTEM",
    );

    const customerAccount = accounts.find(
      (account) => String(account.id) === String(accountId),
    );

    if (
      !customerAccount ||
      customerAccount.account_type !== "CUSTOMER" ||
      String(customerAccount.user_id) !== String(userId)
    ) {
      const error = new Error("Account not found");
      error.statusCode = 404;
      throw error;
    }

    if (!systemAccount) {
      throw new Error("System account could not be locked");
    }

    const customerBalance = BigInt(customerAccount.balance_paise);

    const systemBalance = BigInt(systemAccount.balance_paise);

    let refusalReason = null;

    if (
      customerAccount.status !== "ACTIVE" ||
      systemAccount.status !== "ACTIVE"
    ) {
      refusalReason = "One or more accounts are not active";
    } else if (customerBalance < amountPaise) {
      refusalReason = "Insufficient funds in customer account";
    }

    // Record refused attempts without creating ledger entries.
    if (refusalReason) {
      const [transactionResult] = await connection.execute(
        `INSERT INTO transactions
          (reference_id, transaction_type, status,
           from_account_id, to_account_id, amount_paise,
           initiated_by, failure_reason)
         VALUES (?, 'WITHDRAWAL', 'REFUSED', ?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          accountId,
          systemAccountId,
          amountPaise.toString(),
          userId,
          refusalReason,
        ],
      );

      const response = {
        success: false,
        message: refusalReason,
        transactionId: transactionResult.insertId,
        status: "REFUSED",
      };

      await connection.execute(
        `UPDATE idempotency_keys
         SET transaction_id = ?, response_json = ?
         WHERE user_id = ? AND idempotency_key = ?`,
        [
          transactionResult.insertId,
          JSON.stringify({
            httpStatus: 422,
            body: response,
          }),
          userId,
          idempotencyKey,
        ],
      );

      await connection.commit();

      return { httpStatus: 422, body: response };
    }

    // Calculate new balances.
    const updatedCustomerBalance = customerBalance - amountPaise;

    const updatedSystemBalance = systemBalance + amountPaise;

    // Update balances atomically.
    await connection.execute(
      `UPDATE accounts
       SET balance_paise = ?
       WHERE id = ?`,
      [updatedCustomerBalance.toString(), accountId],
    );

    await connection.execute(
      `UPDATE accounts
       SET balance_paise = ?
       WHERE id = ?`,
      [updatedSystemBalance.toString(), systemAccountId],
    );

    // Create successful withdrawal transaction.
    const [transactionResult] = await connection.execute(
      `INSERT INTO transactions
        (reference_id, transaction_type, status,
         from_account_id, to_account_id, amount_paise,
         initiated_by)
       VALUES (?, 'WITHDRAWAL', 'SUCCESS', ?, ?, ?, ?)`,
      [
        crypto.randomUUID(),
        accountId,
        systemAccountId,
        amountPaise.toString(),
        userId,
      ],
    );

    const transactionId = transactionResult.insertId;

    // Double-entry ledger.
    // Customer DEBIT.
    await connection.execute(
      `INSERT INTO ledger_entries
        (transaction_id, account_id, entry_type, amount_paise)
       VALUES (?, ?, 'DEBIT', ?)`,
      [transactionId, accountId, amountPaise.toString()],
    );

    // System CREDIT.
    await connection.execute(
      `INSERT INTO ledger_entries
        (transaction_id, account_id, entry_type, amount_paise)
       VALUES (?, ?, 'CREDIT', ?)`,
      [transactionId, systemAccountId, amountPaise.toString()],
    );

    const response = {
      success: true,
      message: "Withdrawal completed successfully",
      transactionId,
      amountPaise: amountPaise.toString(),
      balancePaise: updatedCustomerBalance.toString(),
      status: "SUCCESS",
    };

    // Save response for idempotent retries.
    await connection.execute(
      `UPDATE idempotency_keys
       SET transaction_id = ?, response_json = ?
       WHERE user_id = ? AND idempotency_key = ?`,
      [
        transactionId,
        JSON.stringify({
          httpStatus: 201,
          body: response,
        }),
        userId,
        idempotencyKey,
      ],
    );

    await connection.commit();

    return { httpStatus: 201, body: response };
  } catch (error) {
    await connection.rollback();

    // Handle duplicate idempotency keys.
    if (error.code === "ER_DUP_ENTRY") {
      const [existingRows] = await pool.execute(
        `SELECT request_hash, response_json
         FROM idempotency_keys
         WHERE user_id = ? AND idempotency_key = ?`,
        [userId, idempotencyKey],
      );

      if (existingRows.length === 0) {
        throw error;
      }

      const existing = existingRows[0];

      if (existing.request_hash !== requestHash) {
        const conflict = new Error(
          "This idempotency key was already used with a different request",
        );
        conflict.statusCode = 409;
        throw conflict;
      }

      const saved = parseSavedResponse(existing.response_json);

      if (!saved) {
        const conflict = new Error(
          "The original request is still being processed. Retry shortly.",
        );
        conflict.statusCode = 409;
        throw conflict;
      }

      return {
        httpStatus: saved.httpStatus,
        body: saved.body,
      };
    }

    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  createDeposit,
  createWithdrawal,
};
