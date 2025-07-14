# 📘 Frontend (React) - Book Library Dashboard

## Overview

This is the **frontend** part of the Book Library Dashboard project built with **React.js** and styled using **Bootstrap 5**. It supports both **user** and **admin** roles with role-based views and interactions.

## 🌟 Features Implemented

### 🔐 Authentication

* Login and registration system using JWT
* Fake login for demo users
* Protected routes using `UserContext`

### 🧑‍💼 Role-Based UI

* Admin and user dashboards have different filters and views
* Admin can see and manage all books
* Users can only view/edit/delete their own books

### 📚 Book Management

* Add, edit, delete books (non-global)
* Toggle book visibility (public/private)
* Display global books read-only

### 📊 Filters

* Users: `All Books`, `My Books`, `Global Books`
* Admin: `Public Books`, `Private Books`

### 📅 Admin Dashboard

* View all submitted books (with user stats)
* Separate table for user submissions (read-only)
* Total user submission count

### 📦 UI & Styling

* Bootstrap 5-based responsive UI
* Conditional badge styles for public books
* Alert messages for feedback (add, edit, delete)

### 🔁 Reusable Components

* `BookForm.js`
* `BookList.js`
* `EditBookModal.js`
* `FilterBar` (inline or componentized)

### 🧠 React Features

* Hooks: `useState`, `useEffect`, `useContext`
* Routing with `react-router-dom`
* Auth state with `UserContext`

### 🔍 Search

* Real-time search by title or author (client-side)

## 📁 Folder Structure (Frontend)

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── BookForm.js
│   │   ├── BookList.js
│   │   └── BookList.css
│   │   ├── EditBookModal.js
│   │   └── AdminBookManager.js
│   │   └── AdminStats.js
│   │   └── Navebar.js
│   │   └── PrivateAdmnRoute.js
│   │   └── PrivateRoute.js
│   ├── context/
│   │   └── UserContext.js
│   ├── images/
│   ├── pages/
│   │   ├── DashboardPage.js
│   │   ├── AboutUs.js
│   │   ├── AdminDashboardPage.js
│   │   ├── HomePage.js
│   │   └── LoginPage.js
│   │   └── RegisterPage.js
│   │   └── UnauthorizedPage.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
```

## 🛠️ Technologies Used

* **React.js**
* **React Router**
* **Axios** for API calls
* **Bootstrap 5**
* **Context API** for auth
* **LocalStorage** for JWT storage


## 🔮 Future Features

* Loading spinners while fetching data (Done)
* Success/error toasts instead of alert boxes (Done)
* Deployment to Netlify/Vercel 
* GitHub CI/CD workflows (Done)
