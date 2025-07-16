# Restaurant API

This is a RESTful API developed in Node.js to manage clients, dishes, and orders for a restaurant. The API uses Express.js for routing, Sequelize as ORM to interact with a PostgreSQL database, and implements various business rules and reports.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [API Documentation (Endpoints)](#api-documentation-endpoints)
   - [Clients](#clients)
   - [Dishes](#dishes)
   - [Orders](#orders)
5. [Business Rules](#business-rules)

## Technologies Used

- Backend: Node.js
- Framework: Express.js
- ORM: Sequelize
- Database: PostgreSQL
- Environment Variables: Dotenv
- Containerization: Docker & Docker Compose

## Prerequisites

### For local execution

- Node.js
- NPM or Yarn
- A running PostgreSQL instance

### For Docker execution

- Docker
- Docker Compose

### Ports and Access

- **API**: `http://localhost:3000`
- **PostgreSQL**: localhost:5434 (external)
- **Database**: restaurant_api
- **User**: postgres
- **Password**: 1994

### Environment Variables

Variables are configured in the `.env` file:

```env
PORT=3000
DB_NAME=restaurant_api
DB_USER=postgres
DB_PASSWORD=1994
DB_DIALECT=postgres
DB_HOST=postgres  # Docker service name
```

## Project Structure

The project follows a layered architecture to separate responsibilities:

```plaintext
/src
|-- /controllers/   # Controls request and response flow.
|-- /database/      # Database connection configuration.
|-- /errors/        # Custom error classes.
|-- /middlewares/   # Middleware functions (validation, error handling).
|-- /models/        # Sequelize model definitions and associations.
|-- /routes/        # API route definitions.
|-- /services/      # Contains application business logic.
`-- app.js          # Main Express application entry point.
```

## API Documentation (Endpoints)

### Health Check

GET /health : Returns API health status.

- Response (200 OK):

```json
{
  "status": "OK",
  "timestamp": "2025-01-15T12:00:00.000Z",
  "uptime": 3600
}
```

### Clients

Endpoints for managing clients.

**GET /clients** : Lists all clients. Supports filtering by status.

- Query Params:
  - active (boolean): Filters clients by status (true or false).
- Example Request: GET /clients?active=true
- Success Response (200 OK):

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "birthDate": "1990-01-15",
    "cpf": "39217029092",
    "active": true,
    "createdAt": "2025-06-20T10:00:00.000Z",
    "updatedAt": "2025-06-20T10:00:00.000Z"
  }
]
```

**POST /clients** : Creates a new client.

- Request Body:

```json
{
  "name": "Jane Doe",
  "birthDate": "1992-05-20",
  "cpf": "79235551846"
}
```

- Success Response (201 Created):

```json
{
  "message": "Client created successfully",
  "client": { "...client data..." }
}
```

**GET /clients/most-orders** : Lists clients with most orders, in descending order (default=5).

- Query Params:
  - quantity (number): Limits the number of clients returned.
- Example Request: GET /clients/most-orders?quantity=7
- Success Response (200 OK):

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "totalOrders": "15"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "totalOrders": "12"
  }
]
```

**GET /clients/most-spent** : Lists clients who spent the most, in descending order (default=5).

- Query Params:
  - quantity (number): Limits the number of clients returned.
- Example Request: GET /clients/most-spent?quantity=7
- Success Response (200 OK):

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "totalSpent": "150.00"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "totalSpent": "120.00"
  }
]
```

**GET /clients/:id** : Retrieves a specific client by ID.

**GET /clients/:id/details** : Retrieves a client and all associated orders.

**PUT /clients/:id** : Updates client data.

- Request Body (partial):

```json
{
  "name": "Johnathan Doe"
}
```

**DELETE /clients/:id** : Permanently removes a client from the database.

**POST /clients/active/:id** : Activates an inactive client.

**DELETE /clients/active/:id** : Deactivates a client (soft delete), keeping the record in the database.

### Dishes

Endpoints for managing menu dishes.

**GET /dishes** : Lists all dishes. Supports filtering by category.

- Query Params:
  - category (string): Filters dishes by category.
- Example Request: GET /dishes?category=Dessert

**POST /dishes** : Creates a new dish.

- Request Body:

```json
{
  "name": "Chocolate Cake",
  "description": "Chocolate cake with ganache topping",
  "price": 15.0,
  "category": "Dessert"
}
```

**GET /dishes/popularity** : Lists dishes ordered by number of times they were ordered.

**GET /dishes/:id** : Retrieves a specific dish by ID.

**GET /dishes/:id/details** : Retrieves a dish with additional details.

**PUT /dishes/:id** : Updates dish data.

- Request Body (partial):

```json
{
  "name": "Carrot Cake",
  "description": "Carrot cake with chocolate topping"
}
```

**DELETE /dishes/:id** : Removes a dish from the database.

### Orders

Endpoints for managing orders.

**GET /orders** : Lists all orders. Supports filtering by attendance status.

- Query Params:
  - attended (boolean): Filters orders by status (true or false).
- Example Request: GET /orders?attended=false

**POST /orders** : Creates a new order.

- Request Body:

```json
{
  "clientId": 1,
  "dishId": 2
}
```

**GET /orders/:id** : Retrieves a specific order by ID.

**GET /orders/:id/details** : Retrieves an order including client and dish details.

**PUT /orders/:id** : Updates an order (e.g., to change dish or client).

**DELETE /orders/:id** : Removes an order from the database.

**POST /orders/attended/:id** : Marks an order as "attended".

**DELETE /orders/attended/:id** : Marks an order as "not attended".

## Business Rules

The API implements the following validations:

- **Client CPF**: Validation is performed using the standard CPF algorithm, ensuring only mathematically valid CPFs are accepted.
- **Dish Name**: Must contain only letters and spaces, with a length between 3 and 50 characters.
- **Dish Price**: Must be a positive number.
- **Active Client**: An order can only be created for a client with active: true status.
