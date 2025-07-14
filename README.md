### Live Frontend Deployment (Vercel)

[![Frontend Deploy](https://vercel.com/button)](https://book-library-dashboard.vercel.app)

### Backend Deployment Status (Render)

[![Render](https://render.com/api/v1/badges/blue?service=book-library-dashboard&user=Zeinab-Yekta)](https://book-library-dashboard.onrender.com)

### Live Demo Section

| Type                                  | URL                                                            |
| ------------------------------------- | -------------------------------------------------------------- |
|  **Frontend (Live Site)**            | `https://book-library-dashboard.vercel.app/`                   |
|  **Backend API (Testable Endpoint)** | `https://book-library-dashboard.onrender.com/api/books/public` |


# Book Library Dashboard

A full-stack book management dashboard built with **React**, **Node.js**, **Express**, and **MongoDB**, featuring role-based access (Admin & User), book inventory tracking, and dynamic filtering with public/private visibility.

##  Project Overview

This project allows users to:

* Register/Login (JWT-authenticated)
* Add their personal books
* See global (public) books
* Edit/delete their own books
* View published/unpublished book lists

Admins can:

* View all books (including user-submitted)
* Add books and publish it as public
* Manage global visibility (public/private)
* Edit/delete public books
* Track user-submitted books with metadata

##  Tech Stack Used

###  Frontend

* **React.js**
* **React Router DOM** – navigation
* **React Bootstrap** – UI styling
* **Axios** – API requests

###  Backend

* **Node.js** with **Express.js** – REST API
* **MongoDB + Mongoose** – Database & models
* **JWT (jsonwebtoken)** – Authentication
* **bcryptjs** – Password hashing

###  Dev Tools

* **Nodemon** – Auto restart backend
* **ESLint** – Linting
* **GitHub** – Version control

##  Authentication System

* JWT-based secure login/register
* Role-based access: `admin` vs `user`
* Auth token stored in `localStorage`
* Auth token saved in 'MangoDB' and cheked before login

##  Features

###  Implemented Features

| Feature                          | Status  | Description                                                |
| -------------------------------- | ------- | ---------------------------------------------------------- |
| REST API Endpoints               |  Done  | Standard CRUD & filtered endpoints                         |
| Express.js Backend API           |  Done  | Secure, structured endpoints                               |
| Error Handling                   |  Done | Alerts/messages on form submissions                        |
| Global Book Filter (Public)      |  Done  | View public books via toggle                               |
| Admin View User Submissions      |  Done  | Separate table with read-only user book data               |
| Dashboard Filtering (Admin/User) |  Done  | Admin sees public/private filters, users see all/my/global |
| Book Ownership Metadata          |  Done  | Track who added which books                                |

###  Deployment

| Feature                         | Status     | Notes                                                  |
| ------------------------------- | ---------- | ------------------------------------------------------ |
| Deployment (Frontend & Backend) |  Done | Vercel (frontend), Render (backend) |
| GitHub Actions CI/CD            | Done | Automate deployment/test runs                          

##  Folder Structure

```
book-library-dashboard/
├── .github/
│   ├── workflows/
│   │   ├── backend-ci.yml
│   │   ├── deploy-backend.yml
│   │   ├── frontend-ci.yml
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middlewere/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── tests/
│   ├── uploads/
│   ├── .env/
│   └── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── seed.js
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── images/
│   │   ├── utils/
│   │   └── App.js
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── pakage.json
│   ├── README.md
├── README.md
```

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
``bash
npm test

##  Deployment 

### Hosting

* **Frontend**: Vercel 

  * Easy GitHub integration
  * Auto-deploy from main branch
* **Backend**: Render 

  * MongoDB URI support
  * Free tier available

##  CI/CD with GitHub Actions

* Setup `.github/workflows/deploy.yml` file
* Configure:

  * Add GitHub Actions workflow
  * Linting
  * Test commands 
  * Auto-deploy to Vercel (frontend)
  * Both are connected via environment variables, and data is stored in MongoDB Atlas.

## How to Run the Project Locally

### 1. Clone the repository
git clone https://github.com/yourusername/book-library-dashboard.git
cd book-library-dashboard

### 2. Setup Backend
cd backend
npm install

### Create a .env file inside backend folder with:
### MONGO_URI=mongodb_uri
### JWT_SECRET=jwt_secret
### NODE_ENV=Production
### PORT=5000

npm run dev  # Or: npm start

### 3. Setup Frontend
cd ../frontend
npm install

### Create a .env file inside frontend folder with:
### REACT_APP_BACKEND_URL=http://localhost:5000

npm start

## Author

Built by **Zeinab Ramezani Yekta** — Full-stack Developer and Researcher.


