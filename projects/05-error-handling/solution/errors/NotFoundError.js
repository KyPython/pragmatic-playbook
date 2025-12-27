const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(resource, identifier) {
    super(`${resource} with id ${identifier} not found`, 404);
    this.resource = resource;
    this.identifier = identifier;
  }
}

module.exports = NotFoundError;

