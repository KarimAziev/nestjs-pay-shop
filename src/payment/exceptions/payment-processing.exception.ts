export class PaymentProcessingException extends Error {
  constructor(
    message: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'PaymentProcessingException';
    if (originalError) {
      this.stack = originalError.stack;
    }
  }
}
