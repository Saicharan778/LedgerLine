require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pool = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LedgerLine API is running",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(`LedgerLine server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

startServer();
