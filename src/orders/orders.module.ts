import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
