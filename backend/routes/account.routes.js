const express = require("express");

const accountController = require("../controllers/account.controller");

const { authenticate, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Create an account
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "ACCOUNT_HOLDER"),
  accountController.createAccount,
);
router.post(
  "/",
  authenticate,
  authorize("ACCOUNT_HOLDER"),
  accountController.createAccount,
);

// Get accounts
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "ACCOUNT_HOLDER"),
  accountController.getAccounts,
);

// Get a specific account
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "ACCOUNT_HOLDER"),
  accountController.getAccountById,
);

module.exports = router;
