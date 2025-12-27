const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Structured logging with environment-specific behavior
 */
const logger = {
  error: (error, context = {}) => {
    const logEntry = {
      level: 'error',
      message: error.message,
      stack: NODE_ENV === 'development' ? error.stack : undefined,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      ...context
    };
    
    // In production, send to error tracking service (Sentry, etc.)
    if (NODE_ENV === 'production') {
      // Simulate sending to error tracking
      console.log('[ERROR_TRACKING]', JSON.stringify(logEntry));
      // In real app: Sentry.captureException(error, { extra: context });
    } else {
      // In development, detailed console output
      console.error('❌ ERROR:', logEntry);
    }
    
    return logEntry;
  },
  
  info: (message, context = {}) => {
    const logEntry = {
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...context
    };
    console.log('[INFO]', JSON.stringify(logEntry));
    return logEntry;
  }
};

module.exports = logger;

