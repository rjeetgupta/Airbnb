export interface ErrorBody {
  success: false;
  statusCode: number;
  message: string;
  errors: unknown[];
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly success = false;
  public readonly errors: unknown[];
  public readonly isOperational = true;

  constructor(statusCode: number, message: string, errors: unknown[] = []) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace?.(this, this.constructor);
  }

  toJSON(): ErrorBody {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request", errors: unknown[] = []) {
    super(400, message, errors);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", errors: unknown[] = []) {
    super(401, message, errors);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", errors: unknown[] = []) {
    super(403, message, errors);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found", errors: unknown[] = []) {
    super(404, message, errors);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Resource conflict", errors: unknown[] = []) {
    super(409, message, errors);
    this.name = "ConflictError";
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal server error", errors: unknown[] = []) {
    super(500, message, errors);
    this.name = "InternalServerError";
  }
}

export class NotImplementedError extends ApiError {
  constructor(message = "Not implemented", errors: unknown[] = []) {
    super(501, message, errors);
    this.name = "NotImplementedError";
  }
}
