class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Invalid request") {
    super(message, 400);
  }
}

class ConflictError extends AppError {
  constructor(message = "Resource conflict") {
    super(message, 409);
  }
}

module.exports = { AppError, NotFoundError, BadRequestError, ConflictError };
