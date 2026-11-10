const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middleware/auth.middleware");
const { depositValidator } = require("../validators/transaction.validator");
const { deposit } = require("../controllers/transaction.controller");

router.post(
  "/deposit",
  authenticate,
  authorize("ACCOUNT_HOLDER"),
  depositValidator,
  deposit,
);

module.exports = router;
