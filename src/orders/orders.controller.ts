import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from '../payment/payment.service';
import { OrderDetails } from './interfaces/order-details.interface';
import { PaymentProvider } from '../payment/enums/payment-provider.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process')
  async processOrder(
    @Body()
    body: {
      orderDetails: OrderDetails;
      paymentProvider: PaymentProvider;
    },
  ) {
    try {
      const paymentResult = await this.paymentService.processPayment(
        body.orderDetails,
        body.paymentProvider,
      );
      console.log(paymentResult);
      return paymentResult;
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw error;
    }
  }
}
