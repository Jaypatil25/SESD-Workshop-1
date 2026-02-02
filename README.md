# Employee Management System

A full-fledged CRUD application backend for managing employees with complete OOP structure.

## Features

- **CRUD Operations**: Create, Read, Update, Delete employees
- **Search & Filter**: Search by name/email/role, filter by department/status
- **Sorting**: Sort by salary, name, or creation date
- **Pagination**: Efficient data loading with pagination
- **Validation**: Complete input validation and error handling
- **Statistics**: Employee statistics and analytics

## Entity: Employee

**Fields:**
- `name`: Employee name (required, min 2 characters)
- `email`: Unique email address (required, validated format)
- `department`: IT, HR, Finance, Marketing, Operations (required)
- `role`: Job role (required)
- `salary`: Salary amount (required, positive number)
- `status`: active/inactive (default: active)

## API Endpoints

### Base URL: `http://localhost:3000/api/employees`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new employee |
| GET | `/` | Get all employees (with filters) |
| GET | `/:id` | Get employee by ID |
| PUT | `/:id` | Update employee |
| DELETE | `/:id` | Delete employee |
| GET | `/stats` | Get employee statistics |

### Query Parameters for GET /

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `department`: Filter by department
- `status`: Filter by status (active/inactive)
- `search`: Search in name, email, role
- `sortBy`: Sort field (salary, name, createdAt)
- `sortOrder`: asc/desc (default: desc)

## Example Usage

```bash
# Create employee
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "department": "IT",
    "role": "Software Engineer",
    "salary": 75000
  }'

# Get employees with filters
curl "http://localhost:3000/api/employees?department=IT&sortBy=salary&sortOrder=desc&page=1&limit=5"

# Search employees
curl "http://localhost:3000/api/employees?search=john"
```

## Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── models/          # Database models
├── repositories/    # Data access layer
├── services/        # Business logic layer
├── controllers/     # HTTP request handlers
├── routes/          # API routes
├── utils/           # Utilities and helpers
└── app.ts          # Main application class
```