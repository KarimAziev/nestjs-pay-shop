import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { OrderDetails } from '../orders/interfaces/order-details.interface';
import { PaymentStrategyFactory } from './factories/payment-strategy.factory';
import { PaymentProvider } from './enums/payment-provider.enum';
import { PaymentProcessingException } from './exceptions/payment-processing.exception';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private strategyFactory: PaymentStrategyFactory) {}

  async processPayment(
    orderDetails: OrderDetails,
    paymentProvider: PaymentProvider,
  ) {
    try {
      const strategy = this.strategyFactory.createStrategy(paymentProvider);
      return await strategy.pay(orderDetails);
    } catch (error) {
      this.logger.error(
        `Error processing payment: ${error.message}`,
        error.stack,
      );
      if (error instanceof PaymentProcessingException) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  }
}
