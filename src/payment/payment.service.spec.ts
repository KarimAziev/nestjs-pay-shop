import { Test } from '@nestjs/testing';
import { PaymentService } from '../../src/payment/payment.service';
import { PaymentStrategyFactory } from '../../src/payment/factories/payment-strategy.factory';
import { PaymentStrategyFactoryMock } from '../../src/payment/__mocks__/payment-strategy.factory.mock';
import { OrderDetails } from '../orders/interfaces/order-details.interface';
import { PaymentProvider } from './enums/payment-provider.enum';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PaymentStrategyFactory,
          useValue: PaymentStrategyFactoryMock,
        },
      ],
    }).compile();

    paymentService = moduleRef.get<PaymentService>(PaymentService);
  });

  it('should process payment correctly using mock strategy', async () => {
    const orderDetails: OrderDetails = {
      amount: 100,
      currency: 'USD',
      customer: {
        id: 'cust-123',
        email: 'customer@example.com',
      },
      items: [
        {
          productId: 'prod-456',
          quantity: 1,
        },
      ],
    };
    const result = await paymentService.processPayment(
      orderDetails,
      PaymentProvider.Paypal,
    );
    expect(result).toBeDefined();
    expect(result.success).toBeTruthy();
  });
});
