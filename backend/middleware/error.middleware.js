const errorHandler = (error, req, res, next) => {
  console.error("API Error:", error.message);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorHandler;
