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

* View all books (global and user-added)
* Toggle book visibility (public/private)
* View user submissions with counts
* Separate admin routes using `adminRoutes.js`
* Allow admin users to manage global books
* Displaying global stats / controls for admin 
* Admin only: change the filters to (Public Books, Private Books)

## 📁 Folder Structure (Backend)

```
backend/
├── config/
│   ├── db.js
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   └── adminController.js
├── data/
├    └── BooksData.js
├── middleware/
│   ├── authMiddleware.js
├── models/
│   ├── Book.js
│   └── User.js
├── node_modules/
├── routes/
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   └── adminRoutes.js
├── .env
├── index.js
├── seed.js
```

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** for authentication
* **CORS**, **dotenv**, **morgan**

## 📡 API Endpoints

### Auth Routes `/api/auth`

* `POST /register`
* `POST /login`

### Book Routes `/api/books`

* `GET /` — All books
* `GET /user/:userId` — User's own books
* `POST /` — Add book
* `PUT /:bookId` — Update book
* `DELETE /:bookId` — Delete book

### Admin Routes `/api/admin`

* `GET /books` — All books
* `GET /submissions` — User submission stats

## 🔒 Middlewares

* `authMiddleware` — verifies JWT
* `adminMiddleware` — checks for admin role
* `errorHandler` — centralized error handling

## 📦 Dev Tools

* **nodemon** for auto-restart
* **eslint** for linting
* **concurrently** for combined frontend/backend dev

## 🔮 Future Features

* Add loading spinner and toast feedback
* Deploy to Render (backend)
* GitHub CI/CD with Actions
