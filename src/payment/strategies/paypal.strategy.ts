import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentStrategy } from '../interfaces/payment-strategy.interface';
import { OrderDetails } from '../../orders/interfaces/order-details.interface';
import { PaymentProcessingException } from '../exceptions/payment-processing.exception';

@Injectable()
export class PaypalStrategy implements PaymentStrategy {
  constructor(private configService: ConfigService) {}
  async pay(orderDetails: OrderDetails): Promise<any> {
    try {
      const apiKey = this.configService.get<string>('PAYPAL_API_KEY');
      console.log(`Using Paypal API Key: ${apiKey} for: `, orderDetails);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 'success', provider: 'PayPal', orderDetails });
        }, 1000);
      });
    } catch (error) {
      console.error('Payment error:', error.message);

      throw new PaymentProcessingException('Payment was declined.', error);
    }
  }
}
