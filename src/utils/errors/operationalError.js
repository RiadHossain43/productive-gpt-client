export class OperationalError extends Error {
  constructor(
    name = "Unknown operational error occured.",
    isOperational = true
  ) {
    super(description);
    this.name = name;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
