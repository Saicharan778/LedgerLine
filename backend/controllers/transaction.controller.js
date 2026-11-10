const { validationResult } = require("express-validator");
const { createDeposit } = require("../services/transaction.service");

const deposit = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const idempotencyKey = req.get("Idempotency-Key");

  if (
    !idempotencyKey ||
    idempotencyKey.length < 8 ||
    idempotencyKey.length > 128
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide an Idempotency-Key header between 8 and 128 characters",
    });
  }

  try {
    const result = await createDeposit({
      userId: req.user.id,
      accountId: req.body.accountId,
      amount: req.body.amount,
      idempotencyKey,
    });

    return res.status(result.httpStatus).json(result.body);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

module.exports = { deposit };
