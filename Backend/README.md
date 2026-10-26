# The Master Academy — Backend API (MySQL)

Modern REST API built with Node.js and Express for **The Master Academy**, prepared for seamless MySQL integration.

---

## 🚀 Features

- **Express.js Architecture**: Clean separation of routes, controllers, configuration, and database layers.
- **Fail-Soft MySQL Connection**: Automatically verifies and connects to MySQL. If MySQL is not running or credentials are not yet configured, the server runs in safe standalone mode with an in-memory repository without crashing or breaking the website.
- **Auto-Database & Table Creation**: Automatically creates database `master_academy` and tables (`contacts`, `courses`, `enrollments`, `subscribers`) from `schema.sql` on boot.
- **CORS & Security**: Configured with `cors` and `helmet` headers for seamless integration with Vite frontend (`http://localhost:5173`).
- **REST Endpoints**:
  - `GET /api/health` — System status and MySQL connection state
  - `GET /api/courses` — Complete courses catalog (filterable by `?category=crash` or `?category=full`)
  - `GET /api/courses/:id` — Single course details
  - `POST /api/contact` — Submits student inquiries and contact forms
  - `GET /api/contact` — View contact form submissions
  - `POST /api/enrollments` — Course registration / enrollment requests
  - `POST /api/newsletter` — Newsletter subscriptions

---

## 📂 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── env.js                # Centralized environment variables
│   │   └── db.js                 # MySQL Pool & In-Memory fallback
│   ├── controllers/
│   │   ├── contactController.js  # Contact inquiry handlers
│   │   ├── courseController.js   # Courses catalog handlers
│   │   ├── enrollmentController.js# Student enrollment handlers
│   │   ├── healthController.js   # Health check handler
│   │   └── newsletterController.js# Newsletter handlers
│   ├── data/
│   │   └── initialCourses.js     # Master Academy seed course data
│   ├── db/
│   │   ├── schema.sql            # MySQL DDL table definitions
│   │   └── initDb.js             # Table creator and seed script
│   ├── middlewares/
│   │   └── errorHandler.js       # Centralized 404 & error handlers
│   ├── routes/
│   │   ├── contactRoutes.js      # /api/contact
│   │   ├── courseRoutes.js       # /api/courses
│   │   ├── enrollmentRoutes.js   # /api/enrollments
│   │   ├── healthRoutes.js       # /api/health
│   │   └── newsletterRoutes.js   # /api/newsletter
│   ├── app.js                    # Express app configuration & middlewares
│   └── server.js                 # Server entry point
├── .env                          # Local environment variables
├── .env.example                  # Template environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The server will start on: **`http://localhost:5000`**

---

## 🐬 Connecting to MySQL

Configure your MySQL database credentials in `Backend/.env`:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# MySQL Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=master_academy
```

When you start the server (`npm run dev`), it will automatically:
1. Ensure the `master_academy` database exists (runs `CREATE DATABASE IF NOT EXISTS master_academy`).
2. Run table migrations to create `contacts`, `courses`, `enrollments`, and `subscribers`.
3. Seed the courses catalog automatically if it's empty!

---

## 📡 API Reference

### 1. Health & Status
- **`GET /api/health`**
  ```json
  {
    "status": "ok",
    "service": "The Master Academy API",
    "database": {
      "provider": "MySQL",
      "status": "connected"
    }
  }
  ```

### 2. Courses
- **`GET /api/courses`** (Optional query: `?category=crash` or `?category=full`)
- **`GET /api/courses/:id`**

### 3. Contact Inquiries
- **`POST /api/contact`**
  ```json
  {
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "+91 9876543210",
    "course": "Python Programming with AI (Crash Course)",
    "message": "Interested in joining the next batch."
  }
  ```
- **`GET /api/contact`** — Returns list of submissions.

### 4. Enrollments
- **`POST /api/enrollments`**
  ```json
  {
    "course_id": "crash-python-ai",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "+91 9876543210"
  }
  ```

### 5. Newsletter
- **`POST /api/newsletter`**
  ```json
  {
    "email": "learner@example.com"
  }
  ```
