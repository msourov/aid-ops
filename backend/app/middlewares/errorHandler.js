export const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";

  console.error(`[Error]: ${message}`);

  // Customize responses based on error types if needed
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(statusCode).json({
    status: statusCode,
    message,
    // Optionally include stack trace in development mode
    // stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};
