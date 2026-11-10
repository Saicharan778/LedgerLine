const express = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");

const authController = require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", registerValidator, authController.register);

router.post("/login", loginValidator, authController.login);
router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user profile",
    user: req.user,
  });
});
// Admin-only API
router.get("/admin-test", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

// Auditor-only API
router.get("/auditor-test", authenticate, authorize("AUDITOR"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Auditor",
  });
});

// Account holder API
router.get(
  "/account-holder-test",
  authenticate,
  authorize("ACCOUNT_HOLDER"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Account Holder",
    });
  },
);

module.exports = router;
