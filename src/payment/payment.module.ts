import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentStrategyFactory } from './factories/payment-strategy.factory';

@Module({
  providers: [PaymentService, PaymentStrategyFactory],
  exports: [PaymentService],
})
export class PaymentModule {}
