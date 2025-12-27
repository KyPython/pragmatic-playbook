module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js', '**/test.js'],
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js'
  ]
};

