
# BioHarvest Platform

A platform for managing bio-waste collection, processing, and selling reclaimed products.

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login and get JWT token
- `GET /api/users/me` - Get user profile (protected)
- `PUT /api/users/me` - Update user profile (protected)
- `GET /api/users` - Get all users (protected)
- `DELETE /api/users/:id` - Delete a user (protected)

### Transactions
- `GET /api/transactions` - Get all user transactions (protected)
- `POST /api/transactions` - Create a new transaction (protected)
- `GET /api/transactions/:id` - Get transaction by ID (protected)
- `PUT /api/transactions/:id` - Update a transaction (protected)
- `DELETE /api/transactions/:id` - Delete a transaction (protected)

### Marketplace
- `GET /api/marketplace` - Get all marketplace items (protected)
- `POST /api/marketplace` - Create a new marketplace item (protected)
- `GET /api/marketplace/me` - Get user's marketplace items (protected)
- `GET /api/marketplace/:id` - Get marketplace item by ID (protected)
- `PUT /api/marketplace/:id` - Update a marketplace item (protected)
- `DELETE /api/marketplace/:id` - Delete a marketplace item (protected)
- `POST /api/marketplace/:id/purchase` - Purchase a marketplace item (protected)

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file based on `.env.example`
4. Run the development server with `npm run dev`

## Environment Variables

Make sure to set up the following variables in your `.env` file:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/bioharvest
JWT_SECRET=yoursecretkey
```

Simply visit the [Lovable Project](https://lovable.dev/projects/5678499e-a2ef-43da-ba76-96b325c7bfdf) and start prompting.
