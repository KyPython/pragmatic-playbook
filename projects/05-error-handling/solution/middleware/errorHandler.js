const AppError = require('../errors/AppError');
const logger = require('../utils/logger');
const { alertTeam } = require('../utils/alerting');

/**
 * 3-tier error handling middleware
 * Different behavior for dev/staging/production
 */
function errorHandler(err, req, res, next) {
  // Log error with context
  const context = {
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    user: req.user?.id
  };
  
  logger.error(err, context);
  
  // Alert team for production errors
  alertTeam(err, context);
  
  // Determine response based on environment
  const NODE_ENV = process.env.NODE_ENV || 'development';
  
  if (err instanceof AppError) {
    // Operational errors (expected errors)
    return res.status(err.statusCode).json({
      error: err.message,
      ...(NODE_ENV === 'development' && { stack: err.stack, details: err })
    });
  }
  
  // Programming errors (unexpected errors)
  // Don't expose internal details in production
  return res.status(500).json({
    error: NODE_ENV === 'production' 
      ? 'An unexpected error occurred. Our team has been notified.'
      : err.message,
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;

