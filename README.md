# ProjectPad

ProjectPad is a full-stack web application for managing projects and tasks. It features user authentication, project creation, and task management, built with a React frontend and an Express/Prisma/PostgreSQL backend.

## Features

- User registration and login (JWT authentication)
- Create, update, and delete projects
- Add and manage tasks within projects
- Responsive UI with Material UI and Tailwind CSS

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Material UI
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL
- **Authentication:** JWT

## Folder Structure

```
backend/
  index.js
  package.json
  prisma/
    schema.prisma
  src/
    app.js
    controllers/
    libs/
    middleware/
    routes/
    utils/
frontend/
  package.json
  src/
    App.jsx
    main.jsx
    components/
    lib/
    pages/
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your `DATABASE_URL` and `JWT_SECRET`.

3. **Set up the database:**
   ```sh
   npx prisma generate
   npx prisma db push
   ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend runs on `http://localhost:5000` by default.

### Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

## Usage

- Register a new account or log in.
- Create projects and add tasks.
- Edit or delete projects and tasks as needed.

## Environment Variables

See `.env.example` in the root for required backend environment variables.

## License

MIT

---
