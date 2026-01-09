A full-stack **MERN (MongoDB, Express, React, Node.js)** to-do application that allows users to securely register, log in, and manage tasks with persistent storage. The frontend is built with **React + TypeScript + Vite** and styled using **Tailwind CSS**, while the backend exposes RESTful APIs using **Express** and **MongoDB**.

🔗 **Live Demo:**
👉 [https://benel-mern-todo-list.vercel.app](https://benel-mern-todo-list.vercel.app)

---

## ✨ Features

* User authentication with **JWT (JSON Web Tokens)**
* Secure registration and login
* Create, update, complete, and delete tasks
* Persistent task storage using MongoDB
* Automatic logout on token expiration
* Responsive, modern UI with Tailwind CSS
* Environment-based configuration for local and production builds

---

## 🧱 Tech Stack

**Frontend**

* React + TypeScript
* Vite
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication

**Deployment**

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🚀 Using the App (No Setup Required)

You can use the app immediately by visiting the live link:

👉 **[https://benel-mern-todo-list.vercel.app/login](https://benel-mern-todo-list.vercel.app/login)**

1. Register a new account
2. Log in
3. Start creating and managing tasks

No installation or configuration required.

---

## 🖥️ Running the App Locally

Follow the steps below to run the project on your own machine.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-todo-list.git
cd mern-todo-list
```

---

### 2️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd backend
npm install
```

#### Create a `.env` file inside `backend/`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> You can create a free MongoDB cluster at [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)

Start the backend server:

```bash
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

Sensitive information such as database credentials and API URLs are **not committed to GitHub**.

Example environment files are provided to show required variables:

* `backend/.env.example`
* `frontend/.env.example`

---

## 📁 Project Structure

```
mern-todo-list/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.ts
│   │   └── App.tsx
│   └── vite.config.ts
```

---

## 📌 Notes

* JWT tokens are stored in `localStorage` and attached automatically to API requests.
* Expired or invalid tokens trigger an automatic logout.
* The frontend dynamically switches between local and production API URLs using environment variables.

---
This project is for educational and portfolio purposes.
