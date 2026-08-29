# CoffeeShops

A full-stack coffee-shop management and point-of-sale application designed to manage day-to-day shop operations, including sales, purchases, inventory, customers, suppliers, payments, employees, and financial activity.

The application supports multiple shops and provides role-based access for shop owners, moderators, and staff members. It combines a React/TypeScript frontend with an ASP.NET Core Web API backed by PostgreSQL, with Redis used for transient order data and activity history.

> **Status:** Legacy project / being revisited and modernized.

## Features

### Shop Management

- Create and manage a coffee shop
- Configure the number of tables
- Track shop-level financial activity
- Manage shop employees and staff accounts
- Assign shop ownership
- Role-based access to shop operations
- Shop-level dashboard statistics

### Point of Sale & Operations

The application models business operations rather than treating sales as simple product CRUD.

A sale can include:

- Multiple products
- Quantities and prices
- Table information
- Customer information
- Partial or complete payment
- Associated inventory changes
- Financial transactions

Purchases are handled similarly and can be associated with suppliers.

Operations are categorized into sales and purchases and maintain their associated line items, totals, payments, dates, tables, and customers/suppliers.

### Inventory Management

Products support inventory tracking with batch-level information.

Each product can have:

- Current inventory
- Minimum stock threshold
- Selling price
- Category
- Product image
- Inventory tracking enabled/disabled
- Showcase visibility
- Sold quantity
- Loss quantity
- Multiple purchase batches

Product batches track:

- Purchase date
- Quantity
- Purchase price
- Expiration date
- Sold quantity
- Expired quantity
- Loss quantity
- Remaining quantity
- Profit
- Active/sold-out state
- Supplier information

When a sale is recorded, available product batches are consumed chronologically. Expired and depleted batches are excluded from available inventory.

Low-stock conditions can also generate notifications.

### Customers & Suppliers

The application uses a shared `Agent` concept to represent business contacts.

Agents can be either:

- **Customers**
- **Suppliers**

They have contact information and maintain accumulated totals and payments, allowing the application to calculate outstanding balances.

### Payments & Financial Transactions

Financial activity is tracked independently from operations.

The system supports:

- Incoming transactions
- Outgoing transactions
- Payments associated with customers/suppliers
- Partial payments
- Initial cash balance when creating a shop
- Transaction history

A sale can therefore be recorded even when it has not been completely paid.

### Dashboard & Statistics

Shop owners have access to aggregated statistics for:

- Daily activity
- Weekly activity
- Monthly activity
- Annual activity

The frontend also uses Chart.js to visualize shop data.

### Real-Time Notifications

The application uses SignalR for real-time communication between users belonging to the same shop.

Connected users join a shop-specific SignalR group, allowing shop-level events and notifications to be propagated to other members in real time.

One example is a low-stock notification generated when a product falls below its configured minimum quantity.

### Temporary Orders

Orders that are still being prepared are stored separately from completed operations using Redis.

This allows the application to maintain transient order state before it becomes a finalized sale.

### Activity History

Important shop-level actions are recorded in a Redis-backed history cache.

History entries contain information such as:

- User
- Action
- Entity
- Entity ID
- Date

Supported actions include creation, updates, and deletion of entities such as products, customers/suppliers, operations, transactions, shops, and profiles.

History entries are cached with a 90-day expiration.

### Authentication & Authorization

Authentication is implemented using ASP.NET Core Identity and JWT bearer authentication.

The application supports:

- User registration
- Email confirmation
- Login
- JWT access tokens
- Refresh tokens
- Password changes
- Password reset
- Email changes
- User profiles
- Role-based authorization
- Shop-level authorization policies

JWT claims include the authenticated user's identity, email, roles, and associated shop.

## Architecture

The repository is organized as a full-stack application:

```text
CoffeeShops
├── API
│   ├── Controllers
│   ├── Data
│   ├── DTO
│   ├── Extensions
│   ├── Helpers
│   ├── Interfaces
│   ├── Middleware
│   ├── Models
│   ├── Security
│   └── Services
│
├── client
│   └── src
│       ├── app
│       │   ├── api
│       │   ├── data
│       │   ├── hooks
│       │   ├── layout
│       │   ├── models
│       │   ├── slices
│       │   ├── store
│       │   ├── utils
│       │   └── validation
│       ├── components
│       ├── errors
│       └── pages
│
└── CoffeeShops.sln
```

The backend exposes REST endpoints through ASP.NET Core controllers, while the React client communicates with the API through a centralized Axios-based API layer.

The client is ultimately built into `API/wwwroot`, allowing the ASP.NET Core application to serve the frontend as part of the same deployment.

## Technology Stack

### Backend

- C#
- ASP.NET Core 6
- Entity Framework Core
- PostgreSQL
- ASP.NET Core Identity
- JWT Bearer Authentication
- AutoMapper
- Redis
- SignalR
- Swagger / OpenAPI
- SendGrid
- Cloudinary

### Frontend

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- Yup
- Chart.js
- Framer Motion
- React Dropzone
- React Toastify
- Microsoft SignalR client

The backend dependencies and versions are defined in `API/API.csproj`, while the frontend dependencies and build configuration are defined in `client/package.json`.

## Data Model

At the core of the application are the following domain entities:

```text
Shop
├── Users
├── Products
│   └── Product Batches
├── Operations
│   └── Operation Elements
├── Transactions
└── Agents
    └── Operations / Payments
```

Users belong to shops and are governed by shop-level authorization policies.

Products belong to shops and can contain multiple purchase batches. Operations represent completed business activities and contain their individual product line items.

The Entity Framework model defines these relationships and uses cascading deletes for several shop-owned entities.

## Business Flow

A typical sale follows this general flow:

```text
User
  │
  ▼
Create Sale
  │
  ├── Select products
  ├── Specify quantities
  ├── Associate customer/table
  ├── Calculate total
  │
  ▼
Update Inventory
  │
  ├── Increase sold quantity
  ├── Consume available batches
  └── Detect low stock
          │
          ▼
      Notification
  │
  ▼
Record Payment
  │
  ▼
Create Financial Transaction
  │
  ▼
Update Customer Balance
  │
  ▼
Persist Operation
```

Purchases follow a corresponding flow, increasing inventory and creating new product batches with purchase cost and optional expiration information.

## API

The backend exposes endpoints covering the application's main business domains:

| Area | Responsibilities |
|---|---|
| Accounts | Authentication, registration, profiles, password/email management |
| Shops | Shop lifecycle, users, ownership, statistics |
| Products | Product CRUD, inventory, batches, showcase |
| Categories | Product categorization |
| Operations | Sales, purchases, inventory changes |
| Orders | Temporary/in-progress orders |
| Agents | Customers and suppliers |
| Payments | Agent payments |
| Transactions | Shop financial transactions |
| History | Activity history |
| Notifications | Notification delivery |

Swagger/OpenAPI is enabled in the development environment.

## Running the Project

### Prerequisites

The original application requires:

- .NET 6 SDK
- Node.js
- PostgreSQL
- Redis

External services may also be required depending on the configured functionality:

- SendGrid for email delivery
- Cloudinary for image storage

### Backend

From the repository root:

```bash
cd API
dotnet restore
dotnet run
```

The application performs database migration during startup.

Swagger is available when running in the development environment.

### Frontend

```bash
cd client
npm install
npm start
```

The development frontend runs on:

```text
http://localhost:3000
```

The frontend API URL is configured through the React environment configuration.

### Production Build

The frontend build is configured to output directly into the ASP.NET Core application's `wwwroot` directory:

```bash
npm run build
```

This allows the ASP.NET Core application to serve the compiled React application.

## Configuration

The application relies on environment/configuration values for services such as:

- PostgreSQL
- Redis
- JWT signing
- SendGrid
- Cloudinary
- Frontend API URL

Secrets should be supplied through environment variables or local development configuration rather than committed to the repository.

## Project Structure

### `API/Controllers`

REST API endpoints grouped by business domain.

### `API/Models`

Entity Framework domain models and supporting business objects such as products, batches, operations, transactions, shops, users, and agents.

### `API/DTO`

Request and response models used to keep API contracts separate from persistence entities.

### `API/Services`

Application services including:

- JWT token generation
- Email delivery
- Redis access
- Activity history
- Notifications
- SignalR
- Image management
- User access

### `API/Extensions`

Infrastructure and application configuration extensions for:

- Authentication
- Authorization
- Identity
- Database
- CORS
- Swagger
- Services
- Domain-specific queries and calculations

### `client/src/app`

The frontend application layer containing:

- API integration
- Redux state
- models
- hooks
- validation
- utilities
- application configuration

### `client/src/pages`

Feature-oriented pages covering:

- Account management
- Dashboard/home
- Shops
- Products
- Inventory
- Operations
- Orders
- Agents
- Management

## Notes

This repository represents an earlier generation of the application and uses versions of the .NET and JavaScript ecosystems that have since been superseded.

The project is retained as a complete example of a full-stack business application and is being revisited with the goal of modernizing the technology stack while preserving and improving the existing business domain.

## License

No explicit open-source license is currently included in the repository.
