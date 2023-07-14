const { errorStatuses } = require('./constans');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = errorStatuses.badRequest;
  }
}

module.exports = { ValidationError };
