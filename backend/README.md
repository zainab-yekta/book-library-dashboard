# Backend (Node.js + Express) - Book Library Dashboard

## Overview

This is the **backend** for the Book Library Dashboard project, developed using **Node.js** and **Express.js**. It provides RESTful APIs for user authentication, book management, and role-based access.

## Features Implemented

### Authentication

* JWT-based authentication
* Middleware to protect private routes
* Role-based authorization for admin-only endpoints

### Book API

* CRUD operations for books
* Public/private flag for visibility
* Linking books with the user who created them

### Admin APIs

* View all books (global and user-submitted)
* Toggle a book's public/private visibility
* View global stats: total books, public books, user books, total users
* View user-submitted books with per-user counts

## Folder Structure (Backend)

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   └── adminController.js
├── data/
│   └── booksData.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Book.js
│   └── User.js
├── routes/
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   └── adminRoutes.js
├── tests/
│   ├── bookRoutes.test.js
│   └── userRoutes.test.js
├── uploads/
├── .env.example
├── index.js
└── seed.js
```

## Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** for authentication
* **CORS**, **dotenv**

## API Endpoints

### User Routes `/api/users`

* `POST /register`
* `POST /login`
* `GET /profile`

### Book Routes `/api/books`

* `GET /public` — Public books (no login required)
* `GET /` — All books visible to the current user
* `GET /user/:userId` — User's own books
* `POST /` — Add book
* `PUT /:id` — Update book
* `DELETE /:id` — Delete book

### Admin Routes `/api/admin`

* `GET /stats` — Book and user counts
* `GET /books` — All books, with owner info

## Middlewares

* `protect` — verifies JWT
* `adminOnly` — checks for admin role

## Dev Tools

* **nodemon** for auto-restart
* **eslint** for linting

## Additional Features Added

* Deploy to Render (backend)
* GitHub CI/CD with Actions

## CI/CD with GitHub Actions

The project uses GitHub Actions for Continuous Integration & Deployment:

Backend CI workflow runs tests on every commit.

Backend auto-deploys to Render via a deploy hook.

Frontend auto-deploys to Vercel on every push to main.

This ensures code is automatically tested and deployed after every update.

## Testing

This project includes both **manual and automated testing**:

### Postman API Testing

All backend routes (login, register, book CRUD) were manually tested using Postman to ensure proper functionality and error handling.

### Jest Unit Testing
Basic unit tests are written with **Jest** and **Supertest** for key routes:

- `/api/books/public` – ensure it returns public books
- `/api/users/login` – invalid login returns 401
- Protected routes – unauthenticated access is blocked

To run tests:
```bash
npm test
```
