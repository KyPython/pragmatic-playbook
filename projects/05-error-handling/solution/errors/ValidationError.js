const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message, fields = {}) {
    super(message, 400);
    this.fields = fields;
  }
}

module.exports = ValidationError;

