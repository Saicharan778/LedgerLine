require("dotenv").config();

const pool = require("../config/db");

async function testDatabase() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL connection successful!");

    const [tables] = await connection.query("SHOW TABLES");

    console.log("Available database tables:");

    tables.forEach((table) => {
      console.log(Object.values(table)[0]);
    });

    connection.release();
  } catch (error) {
    console.error("Database test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testDatabase();
