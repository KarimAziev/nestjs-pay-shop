# About

This project provides a basic implementation of an online webshop capable of processing orders with multiple payment options, including Stripe, PayPal, and Braintree. The architecture is designed to allow for easy addition or removal of payment providers.

# Table of Contents <!-- :TOC: -->

- [About](#about)
  - [Architecture Overview](#architecture-overview)
  - [Implementation Details](#implementation-details)
  - [Running the Project](#running-the-project)
  - [Extending the System](#extending-the-system)

## Architecture Overview

The webshop is built using NestJS. The architecture is structured into modules, with adherence to the principles of modularity and single responsibility.

### Key Design Decisions

- **Strategy Pattern for Payment Processing**: This pattern allows for the addition of new payment methods without significantly altering the existing codebase, promoting easy maintenance and scalability.
- **Factory Pattern for Strategy Instantiation**: A factory is utilized to dynamically create instances of payment strategies based on the customer's choice, further decoupling the system components.
- **Module-Based Structure**: NestJS modules encapsulate specific functionalities, facilitating better organization and modular growth of the application.

### Project Structure

```plaintext
src/
|-- app.module.ts          # Root module, imports other modules
|-- main.ts                # Application bootstrap
|-- orders/                # Orders module, handles order processing
|   |-- interfaces/
|   |-- orders.controller.ts
|   |-- orders.module.ts
|   `-- orders.service.ts  # Hypothetical service for order management
|-- payment/               # Payment module, responsible for payment processing
    |-- strategies/        # Different payment strategies
    |-- interfaces/
    |-- enums/
    |-- factories/
    |-- payment.module.ts
    `-- payment.service.ts
```

## Implementation Details

### Payment Processing

The core of the payment processing logic lies in the use of the Strategy pattern through the `PaymentStrategy` interface and the `PaymentStrategyFactory`. When an order is placed, the `OrdersController` receives the payment provider selected by the customer. It then utilizes `PaymentService` to process the payment, which, in turn, uses `PaymentStrategyFactory` to instantiate the appropriate payment strategy based on the customer's choice.

### Payment Strategy Factory

This factory encapsulates the logic for instantiating payment strategy objects. It maps each `PaymentProvider` enum to its corresponding strategy class. When a new payment provider needs to be added, one can simply add a new strategy class and update the factory's mapping without altering the existing consumer code.

### Error Handling

Global and local exception filters are used to gracefully handle errors across the application, ensuring that any payment processing errors are caught and handled appropriately.

## Running the Project

### Installation

1. Clone the repository to the local machine.

2. Ensure the correct version of Node.js is installed, as specified in the [.nvmrc](./.nvmrc) file. Switch to the correct version with `nvm use`, if using NVM.

3. Install required dependencies:

```bash
npm install
```

4. Then run the application either in production or development mode:

### Production Mode

```bash
npm run start:prod
```

### Development Mode

```bash
  npm run start
  ## or in watch-mode
  npm run start:dev
```

### Running Tests

```bash
npm run test
```

#### End to End Tests:

```bash
npm run test:e2e
```

#### Test Coverage

```bash
npm run test:cov
```

## Extending the System

To add a new payment provider:

1. Create a new strategy class in `src/payment/strategies/` implementing the `PaymentStrategy` interface.
2. Add the new strategy to the `PaymentStrategyFactory` mapping.
3. Add the new provider to the `PaymentProvider` enum.
