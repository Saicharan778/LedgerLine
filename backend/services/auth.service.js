const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const registerUser = async ({ name, email, password }) => {
  const passwordHash = await bcrypt.hash(password, 12);

  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password_hash)
     VALUES (?, ?, ?)`,
    [name, email, passwordHash],
  );

  return {
    id: result.insertId,
    name,
    email,
    role: "ACCOUNT_HOLDER",
  };
};

const loginUser = async ({ email, password }) => {
  const [users] = await pool.execute(
    `SELECT id, name, email, password_hash, role, status
     FROM users
     WHERE email = ?`,
    [email],
  );

  if (users.length === 0) {
    return null;
  }

  const user = users[0];

  if (user.status !== "ACTIVE") {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      issuer: "ledgerline-api",
      audience: "ledgerline-client",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};
