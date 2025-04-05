
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging with request context
  console.error(`Error on ${req.method} ${req.originalUrl}:`);
  console.error(`Message: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  
  // Get status code from response or default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // More detailed error response
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    code: err.code || 'SERVER_ERROR'
  });
};

export { errorHandler };
