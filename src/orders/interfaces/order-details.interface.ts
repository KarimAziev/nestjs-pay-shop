export interface Customer {
  id: string;
  email: string;
}
export interface OrderDetailItem {
  productId: string;
  quantity: number;
}
export interface OrderDetails {
  amount: number;
  currency: string;
  customer: Customer;
  items: OrderDetailItem[];
}
