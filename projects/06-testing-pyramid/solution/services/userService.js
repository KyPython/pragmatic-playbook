let userIdCounter = 0;

function createUser(name, email) {
  return {
    id: Date.now() + (++userIdCounter),
    name,
    email,
    createdAt: new Date().toISOString()
  };
}

function validateUser(name, email) {
  if (!name || !email) {
    return false;
  }
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = { createUser, validateUser };

