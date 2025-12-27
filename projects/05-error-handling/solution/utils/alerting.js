const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Alerting system for production errors
 * In real app, this would send to Slack, PagerDuty, etc.
 */
function alertTeam(error, context = {}) {
  // Only alert in production for critical errors
  if (NODE_ENV !== 'production') {
    return;
  }
  
  // Only alert for 5xx errors (server errors)
  if (error.statusCode < 500) {
    return;
  }
  
  // Simulate sending alert
  const alert = {
    severity: 'high',
    message: `Production Error: ${error.message}`,
    statusCode: error.statusCode,
    timestamp: new Date().toISOString(),
    context
  };
  
  console.log('[ALERT]', JSON.stringify(alert));
  // In real app: 
  // - Send to Slack: slack.send(alert)
  // - Send to PagerDuty: pagerduty.trigger(alert)
  // - Send email: email.send(alert)
}

module.exports = { alertTeam };

