# Express TypeScript MongoDB API

A complete, production-ready Express.js backend application built with TypeScript and MongoDB, featuring authentication, authorization, session management, and comprehensive API documentation.

## Features

- ✅ **User Authentication & Authorization**
  - User registration with email validation
  - JWT-based authentication
  - Password hashing with Argon2
  - Role-based access control (Admin, User)
  - Password reset functionality

- ✅ **Session Management**
  - Multiple active sessions per user
  - Session tracking with IP, user agent, and device info
  - Logout from specific session or all devices
  - Auto-cleanup of old sessions (30 days)

- ✅ **User Management**
  - CRUD operations for users
  - User profile management
  - Pagination, filtering, and sorting
  - Soft delete functionality

- ✅ **Product Management**
  - CRUD operations for products
  - Search functionality
  - Pagination, filtering, and sorting

- ✅ **Security**
  - Helmet for security headers
  - CORS configuration
  - Rate limiting (100 requests per 15 minutes)
  - Input validation with Joi
  - Password strength validation

- ✅ **API Documentation**
  - Swagger/OpenAPI documentation
  - Interactive API explorer

- ✅ **Logging**
  - Winston logger with file and console transports
  - HTTP request logging with Morgan

- ✅ **Testing**
  - Jest test framework
  - Unit and integration tests
  - Test coverage reporting

## Project Structure

```
tailwind-react-next-express-node-mongo/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts             # Server entry point
│   ├── config/               # Configuration files
│   ├── modules/              # Feature modules
│   │   ├── auth/             # Authentication module
│   │   ├── users/            # User management module
│   │   └── products/         # Product management module
│   ├── models/               # Mongoose models
│   ├── middlewares/          # Express middlewares
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript type definitions
│   ├── routes/               # Route definitions
│   ├── constants/            # Application constants
│   └── seeders/             # Database seeders
├── __tests__/               # Test files
├── logs/                    # Log files
└── docs/                    # Documentation
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tailwind-react-next-express-node-mongo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/express-ts-app
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
CLIENT_URL=http://localhost:3000
LOG_LEVEL=info
```

5. Start MongoDB (if running locally):
```bash
# Using MongoDB service
# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

6. Seed the database (optional):
```bash
npm run seed
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Documentation

Once the server is running, access the Swagger API documentation at:
```
http://localhost:5000/api-docs
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (protected)
- `POST /api/auth/logout-all` - Logout from all devices (protected)
- `GET /api/auth/sessions` - Get all active sessions (protected)
- `DELETE /api/auth/sessions/:sessionId` - Logout from specific session (protected)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Users
- `GET /api/users` - Get all users (protected, admin only)
- `GET /api/users/:id` - Get user by ID (protected)
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected, admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected, admin only)

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run seed` - Seed database with sample data

## Default Users

After running the seeder, you can use these default accounts:

**Admin:**
- Email: `admin@example.com`
- Password: `Admin123!`

**User:**
- Email: `user@example.com`
- Password: `User123!`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `SMTP_HOST` | SMTP server host | - |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username | - |
| `SMTP_PASS` | SMTP password | - |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |
| `LOG_LEVEL` | Logging level | `info` |

## Security Features

- Password hashing with Argon2
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet security headers
- CORS configuration
- Input validation and sanitization
- Password strength requirements

## Error Handling

The application uses a centralized error handling middleware that:
- Catches all errors
- Returns consistent error responses
- Logs errors appropriately
- Handles different error types (validation, authentication, etc.)

## Logging

Logs are written to:
- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs

Log levels: `error`, `warn`, `info`, `debug`

## License

ISC

## Author

technojerry
