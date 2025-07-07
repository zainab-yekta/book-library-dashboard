### Live Frontend Deployment (Vercel)

[![Frontend Deploy](https://vercel.com/button)](https://book-library-dashboard.vercel.app)

### Backend Deployment Status (Render)

[![Render](https://render.com/api/v1/badges/blue?service=book-library-dashboard&user=Zeinab-Yekta)](https://book-library-dashboard.onrender.com)

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
* Manage global visibility (public/private)
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

##  Features

###  Implemented Features

| Feature                          | Status  | Description                                                |
| -------------------------------- | ------- | ---------------------------------------------------------- |
| REST API Endpoints               |  Done  | Standard CRUD & filtered endpoints                         |
| Express.js Backend API           |  Done  | Secure, structured endpoints                               |
| Error Handling                   |  Basic | Alerts/messages on form submissions                        |
| Global Book Filter (Public)      |  Done  | View public books via toggle                               |
| Admin View User Submissions      |  Done  | Separate table with read-only user book data               |
| Dashboard Filtering (Admin/User) |  Done  | Admin sees public/private filters, users see all/my/global |
| Book Ownership Metadata          |  Done  | Track who added which books                                |

###  In Progress / To Add (Done)

| Feature                         | Status     | Notes                                                  |
| ------------------------------- | ---------- | ------------------------------------------------------ |
| Deployment (Frontend & Backend) |  Planned | Vercel (frontend), Render (backend) |
| GitHub Actions CI/CD            | Planned | Automate deployment/test runs                          


##  Folder Structure

```
book-library-dashboard/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── public/
```

##  Deployment Plan

###  Recommended Hosting

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

##  Roadmap / TODOs

  Add unit tests for backend API 

## 🧑‍💻 Author

Built by **Zeinab Ramezani Yekta** — Full-stack Developer and Researcher.


