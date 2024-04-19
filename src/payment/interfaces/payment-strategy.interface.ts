import { OrderDetails } from '../../orders/interfaces/order-details.interface';

export interface PaymentStrategy {
  pay(orderDetails: OrderDetails): Promise<any>;
}
