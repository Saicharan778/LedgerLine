const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "ledgerline-api",
      audience: "ledgerline-client",
    });

    // Verify that the user still exists and is active.
    const [users] = await pool.execute(
      `SELECT id, role, status
       FROM users
       WHERE id = ?`,
      [decoded.id],
    );

    if (users.length === 0 || users[0].status !== "ACTIVE") {
      return res.status(401).json({
        success: false,
        message: "User account is inactive or unavailable",
      });
    }

    req.user = {
      id: users[0].id,
      role: users[0].role,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    next(error);
  }
};
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
