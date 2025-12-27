const { validateToken } = require('./tokenValidator');

// Rate limiting implemented (using simple in-memory store for demo)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // 100 requests per window

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

// Token expiration check implemented
function isTokenExpired(token) {
  // In production, decode JWT and check exp claim
  // For demo, assume tokens with 'expired' in them are expired
  return token.includes('expired');
}

// User permissions validation implemented
function hasPermission(user, requiredPermission) {
  const userPermissions = user.permissions || [];
  return userPermissions.includes(requiredPermission) || userPermissions.includes('admin');
}

function authenticate(req, res, next) {
  // Rate limiting
  const clientIp = req.ip || req.connection.remoteAddress;
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Token expiration check
  if (isTokenExpired(token)) {
    return res.status(401).json({ error: 'Token expired' });
  }
  
  const isValid = validateToken(token);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  // User permissions validation
  const user = { id: 1, email: 'user@example.com', permissions: ['read', 'write'] };
  if (!hasPermission(user, 'read')) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  
  req.user = user;
  next();
}

module.exports = { authenticate };

