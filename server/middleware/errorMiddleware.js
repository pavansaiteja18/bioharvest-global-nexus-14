
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(`Error: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  
  // Get status code from response or default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    path: req.originalUrl,
    method: req.method,
  });
};

export { errorHandler };
