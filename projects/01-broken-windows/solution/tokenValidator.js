// Simple token validator for demo purposes
function validateToken(token) {
  // In production, this would validate JWT or session token
  return token && token.startsWith('Bearer ');
}

module.exports = { validateToken };

