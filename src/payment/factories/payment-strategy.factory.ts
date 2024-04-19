import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentStrategy } from '../interfaces/payment-strategy.interface';
import { StripeStrategy } from '../strategies/stripe.strategy';
import { PaypalStrategy } from '../strategies/paypal.strategy';
import { BraintreeStrategy } from '../strategies/braintree.strategy';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class PaymentStrategyFactory {
  private strategies: Map<
    PaymentProvider,
    new (configService: ConfigService) => PaymentStrategy
  > = new Map();

  constructor(private configService: ConfigService) {
    this.configService = configService;
    this.strategies.set(PaymentProvider.Stripe, StripeStrategy);
    this.strategies.set(PaymentProvider.Paypal, PaypalStrategy);
    this.strategies.set(PaymentProvider.Braintree, BraintreeStrategy);
  }

  createStrategy(paymentProvider: PaymentProvider) {
    const StrategyConstructor = this.strategies.get(paymentProvider);
    if (!StrategyConstructor) {
      throw new Error(`Unsupported payment provider: ${paymentProvider}`);
    }
    return new StrategyConstructor(this.configService);
  }
}
