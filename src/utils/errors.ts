export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class APIError extends BaseError {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: Array<{ message: string; field?: string }>
  ) {
    super(message);
  }
}

export class NetworkError extends BaseError {
  constructor(message: string = 'Network error occurred') {
    super(message);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, public field?: string) {
    super(message);
  }
}