# Grafene Backend

Backend API for the Grafene project management platform.

## Setup Instructions

### 1. MongoDB Setup

**No local installation needed!** This app uses MongoDB Atlas (cloud database).

The `.env` file is already configured with the MongoDB Atlas connection string.

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment

The `.env` file is already configured with:
- `MONGODB_URI`: MongoDB Atlas connection string (cloud database)
- `JWT_SECRET`: Already set (change in production)
- `PORT`: Server port (default: 3001)

**Note:** The app connects to MongoDB Atlas, so no local MongoDB setup is required!

### 4. Seed Database

Run this command to populate the database with sample data:

```bash
npm run seed
```

This will create:
- Admin user (mobile: 1234567890, password: admin123)
- Sample projects (Gravitas and PageByPage)

### 5. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Health Check
- `GET /api/health` - Server health status

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Database Schema

### User
- name: String
- mobile: String (unique)
- password: String (hashed)
- role: String (user/admin)

### Project
- id: String (unique slug)
- title: String
- description: String
- fullDescription: String
- image: String
- features: Array of Strings
- technologies: Array of Strings
- contributors: Array of Objects
- repoLink: String
- demoLink: String
- createdBy: User reference
