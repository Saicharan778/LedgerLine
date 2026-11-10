const { body } = require("express-validator");

const moneyAmountValidator = () =>
  body("amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    .isString()
    .withMessage("Amount must be provided as a string")
    .bail()
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("Enter a valid amount with up to two decimal places");

const transferValidator = [
  body("fromAccountId")
    .isInt({ min: 1 })
    .withMessage("Valid source account ID is required"),
  body("toAccountId")
    .isInt({ min: 1 })
    .withMessage("Valid destination account ID is required"),
  moneyAmountValidator(),
];

const depositValidator = [
  body("accountId")
    .isInt({ min: 1 })
    .withMessage("Valid account ID is required"),
  moneyAmountValidator(),
];

const withdrawalValidator = [
  body("accountId")
    .isInt({ min: 1 })
    .withMessage("Valid account ID is required"),
  moneyAmountValidator(),
];

module.exports = {
  transferValidator,
  depositValidator,
  withdrawalValidator,
};
