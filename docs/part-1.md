# About

In the rapidly evolving digital marketplace, the foundation of any successful online shop lies in its architecture.

This document presents a thoughtfully designed architecture for an online shop, engineered to provide flexibility, scalability, and maintainability.

The webshop is built using NestJS, whose modular nature helps keep the codebase organized and the dependencies clear.

This architecture aims to balance robust performance with ease of use, making it an ideal blueprint for developing a comprehensive and user-friendly e-commerce platform.

# Table of Contents <!-- :TOC: -->

- [About](#about)
  - [File and folder structure](#file-and-folder-structure)
  - [Separation of Business Logic](#separation-of-business-logic)
  - [Design Pattern Choices](#design-pattern-choices)

## File and folder structure

```plaintext
/src
  /api          # Controllers and routes
  /config       # Configuration settings, such as environment variables
  /constants    # Constant values used throughout the app
  /interfaces   # TypeScript interfaces or types that define object structures
  /middleware   # Custom middleware for express, if necessary
  /models       # Data models (e.g., using Mongoose for MongoDB)
  /modules      # Business logic units separated by domain
    /auth       # Authentication logic
    /cart       # Shopping cart logic
    /categories # Category management
    /orders     # Order management
    /products   # Product management
    /users      # User account management
  /services     # Services that encapsulate the core business logic
  /utils        # Utility functions and helpers
app.module.ts   # Main application module that ties everything together
main.ts         # Entry point of the application
```

## Separation of Business Logic

- **Modularization**: Each piece of business functionality (products, categories, customers, orders, etc.) should be encapsulated within its own module. This aligns with the modular nature of NestJS and helps keep the codebase organized and the dependencies clear.

- **Services and Repositories**: Within each module, business logic should be further separated into services and potentially repositories. Use services to contain the core business logic, while repositories handle data access, allowing for the clean separation between how data is accessed and manipulated.

## Design Pattern Choices

1. **Repository Pattern**: Useful when dealing with different data sources. It abstracts the data layer, allowing the application to interact with a repository interface to access data objects. This makes it easier to unit test the business logic by mocking the data layer.

2. **Strategy Pattern**: As demonstrated with the payment processor implementation in [Part 2](https://github.com/KarimAziev/nestjs-pay-shop/tree/main?tab=readme-ov-file#payment-strategy-factory), the Strategy pattern allows for the dynamic selection of algorithms at runtime-ideal for payment processing, shipping calculations, or tax computation strategies that might vary by region or other factors.

3. **Factory Pattern**: Especially useful when you have complex object creation logic that needs to be abstracted to ensure the calling code is decoupled from the concrete implementation classes of the objects it needs to create.

4. **Singleton Pattern**: Utilize for services that should only have a single instance throughout the application's lifecycle, such as a configuration service or a connection pool to an external service.

5. **Decorator Pattern**: Can be used in numerous ways in a modern web application, including enhancing responses, logging, and applying middleware for security concerns like authentication and authorization.
