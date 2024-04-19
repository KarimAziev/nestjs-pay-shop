import { PaymentStrategy } from '../interfaces/payment-strategy.interface';

export class MockPaymentStrategy implements PaymentStrategy {
  async pay(orderDetails: any): Promise<any> {
    return Promise.resolve({ success: true, orderDetails });
  }
}

export class PaymentStrategyFactoryMock {
  static createStrategy(): PaymentStrategy {
    return new MockPaymentStrategy();
  }
}
