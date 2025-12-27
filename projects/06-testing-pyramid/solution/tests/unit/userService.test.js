// Unit tests - Fast, isolated, test single functions
const { createUser, validateUser } = require('../../services/userService');

describe('User Service Unit Tests', () => {
  describe('createUser', () => {
    test('creates user with valid data', () => {
      const user = createUser('John Doe', 'john@example.com');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.id).toBeDefined();
    });

    test('generates unique IDs', () => {
      const user1 = createUser('User 1', 'user1@example.com');
      const user2 = createUser('User 2', 'user2@example.com');
      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('validateUser', () => {
    test('validates user with name and email', () => {
      expect(validateUser('John', 'john@example.com')).toBe(true);
    });

    test('rejects user without name', () => {
      expect(validateUser('', 'john@example.com')).toBe(false);
    });

    test('rejects user without email', () => {
      expect(validateUser('John', '')).toBe(false);
    });

    test('rejects invalid email format', () => {
      expect(validateUser('John', 'invalid-email')).toBe(false);
    });
  });
});

