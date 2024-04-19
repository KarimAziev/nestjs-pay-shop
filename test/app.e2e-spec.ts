import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Order Processing (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const orderPayload = {
    orderDetails: {
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
    },
    paymentProvider: 'paypal',
  };

  it('/orders/process (POST) with PayPal', () => {
    return request(app.getHttpServer())
      .post('/orders/process')
      .send({ ...orderPayload, paymentProvider: 'paypal' })
      .expect(201)
      .expect((res) => {
        expect(res.body.provider).toEqual('PayPal');
        expect(res.body.status).toEqual('success');
      });
  });

  it('/orders/process (POST) with Stripe', () => {
    return request(app.getHttpServer())
      .post('/orders/process')
      .send({ ...orderPayload, paymentProvider: 'stripe' })
      .expect(201)
      .expect((res) => {
        expect(res.body.provider).toEqual('Stripe');
        expect(res.body.status).toEqual('success');
      });
  });

  it('/orders/process (POST) with Braintree', () => {
    return request(app.getHttpServer())
      .post('/orders/process')
      .send({ ...orderPayload, paymentProvider: 'braintree' })
      .expect(201)
      .expect((res) => {
        expect(res.body.provider).toEqual('Braintree');
        expect(res.body.status).toEqual('success');
      });
  });
});
