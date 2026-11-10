const crypto = require("crypto");
const pool = require("../config/db");

const createAccount = async (userId) => {
  // Generate an unpredictable account number.
  const accountNumber =
    "LL" + crypto.randomBytes(8).toString("hex").toUpperCase();

  const [result] = await pool.execute(
    `INSERT INTO accounts
      (account_number, user_id, account_type, balance_paise)
     VALUES (?, ?, 'CUSTOMER', 0)`,
    [accountNumber, userId],
  );

  return {
    id: result.insertId,
    account_number: accountNumber,
    balance_paise: 0,
    status: "ACTIVE",
  };
};

const getAccounts = async (user) => {
  let query = `
    SELECT id, account_number, user_id,
           balance_paise, status, created_at
    FROM accounts
    WHERE account_type = 'CUSTOMER'
  `;

  const params = [];

  // Account holders can only see their own accounts.
  if (user.role === "ACCOUNT_HOLDER") {
    query += " AND user_id = ?";
    params.push(user.id);
  }

  query += " ORDER BY created_at DESC";

  const [accounts] = await pool.execute(query, params);

  return accounts;
};

const getAccountById = async (accountId, user) => {
  let query = `
    SELECT id, account_number, user_id,
           balance_paise, status, created_at
    FROM accounts
    WHERE id = ?
      AND account_type = 'CUSTOMER'
  `;

  const params = [accountId];

  if (user.role === "ACCOUNT_HOLDER") {
    query += " AND user_id = ?";
    params.push(user.id);
  }

  const [accounts] = await pool.execute(query, params);

  return accounts[0] || null;
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
};
