export class EmailError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'EmailError';
    Error.captureStackTrace(this, this.constructor);
  }
}