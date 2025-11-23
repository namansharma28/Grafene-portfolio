# Grafene Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Frontend (Vite)                  │    │
│  │              http://localhost:5173                  │    │
│  │                                                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │    │
│  │  │  Pages   │  │Components│  │  API Service │    │    │
│  │  │          │  │          │  │   (Axios)    │    │    │
│  │  │ - Home   │  │ - Navbar │  │              │    │    │
│  │  │ - Login  │  │ - Cards  │  │ - authAPI    │    │    │
│  │  │ - Signup │  │ - Cursor │  │ - projectAPI │    │    │
│  │  │ - Upload │  │          │  │              │    │    │
│  │  │ - Detail │  │          │  │              │    │    │
│  │  └──────────┘  └──────────┘  └──────────────┘    │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         SERVER SIDE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Express.js Backend Server                 │    │
│  │           http://localhost:3001/api                 │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │           Middleware Layer               │     │    │
│  │  │  - CORS                                  │     │    │
│  │  │  - JSON Parser                           │     │    │
│  │  │  - JWT Authentication                    │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │  ┌──────────────┐  ┌──────────────────────┐      │    │
│  │  │   Routes     │  │    Controllers        │      │    │
│  │  │              │  │                       │      │    │
│  │  │ /auth/*      │──│ - signup()           │      │    │
│  │  │ /projects/*  │──│ - login()            │      │    │
│  │  │              │  │ - getProjects()      │      │    │
│  │  │              │  │ - createProject()    │      │    │
│  │  │              │  │ - updateProject()    │      │    │
│  │  │              │  │ - deleteProject()    │      │    │
│  │  └──────────────┘  └──────────────────────┘      │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │           Models (Mongoose)              │     │    │
│  │  │  - User Model                            │     │    │
│  │  │  - Project Model                         │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ MongoDB Driver
                            │ (Mongoose ODM)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              MongoDB Database                       │    │
│  │         mongodb://localhost:27017/grafene           │    │
│  │                                                     │    │
│  │  ┌──────────────────┐  ┌──────────────────┐       │    │
│  │  │  users           │  │  projects         │       │    │
│  │  │  Collection      │  │  Collection       │       │    │
│  │  │                  │  │                   │       │    │
│  │  │ - _id            │  │ - _id             │       │    │
│  │  │ - name           │  │ - id (slug)       │       │    │
│  │  │ - mobile         │  │ - title           │       │    │
│  │  │ - password       │  │ - description     │       │    │
│  │  │ - role           │  │ - features[]      │       │    │
│  │  │ - createdAt      │  │ - technologies[]  │       │    │
│  │  │                  │  │ - contributors[]  │       │    │
│  │  │                  │  │ - repoLink        │       │    │
│  │  │                  │  │ - createdBy       │       │    │
│  │  │                  │  │ - createdAt       │       │    │
│  │  └──────────────────┘  └──────────────────┘       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. User Authentication Flow

```
User Browser
    │
    │ 1. POST /api/auth/signup
    │    { name, mobile, password }
    ▼
Express Server
    │
    │ 2. Hash password (bcryptjs)
    ▼
MongoDB
    │
    │ 3. Save user document
    ▼
Express Server
    │
    │ 4. Return success
    ▼
User Browser
    │
    │ 5. POST /api/auth/login
    │    { mobile, password }
    ▼
Express Server
    │
    │ 6. Verify password
    │ 7. Generate JWT token
    ▼
User Browser
    │
    │ 8. Store token in localStorage
    └─── Ready for authenticated requests
```

### 2. Project Creation Flow

```
User Browser (Logged In)
    │
    │ 1. POST /api/projects
    │    Authorization: Bearer <token>
    │    { project data }
    ▼
Express Server
    │
    │ 2. Verify JWT token
    │ 3. Extract user ID
    ▼
MongoDB
    │
    │ 4. Create project document
    │    with createdBy = user ID
    ▼
Express Server
    │
    │ 5. Return created project
    ▼
User Browser
    │
    │ 6. Redirect to homepage
    │ 7. Fetch updated project list
    ▼
Display new project
```

### 3. Project Viewing Flow

```
User Browser
    │
    │ 1. GET /api/projects
    ▼
Express Server
    │
    │ 2. Query all projects
    │    (sorted by createdAt DESC)
    ▼
MongoDB
    │
    │ 3. Return project documents
    ▼
Express Server
    │
    │ 4. Send JSON response
    ▼
User Browser
    │
    │ 5. Render ProjectCard components
    └─── Display projects on page
```

## Authentication & Authorization

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "507f1f77bcf86cd799439011",
    "role": "user",
    "iat": 1516239022,
    "exp": 1516843822
  },
  "signature": "..."
}
```

### Authorization Levels

```
┌─────────────────────────────────────────────┐
│              Public Routes                   │
│  - GET /api/projects                        │
│  - GET /api/projects/:id                    │
│  - POST /api/auth/signup                    │
│  - POST /api/auth/login                     │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│          Authenticated Routes                │
│  (Requires valid JWT token)                 │
│  - GET /api/auth/me                         │
│  - POST /api/projects                       │
│  - PUT /api/projects/:id (own projects)     │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│             Admin Only Routes                │
│  (Requires role: "admin")                   │
│  - DELETE /api/projects/:id                 │
│  - PUT /api/projects/:id (any project)      │
└─────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────┐
│  User    │
│  Action  │
└────┬─────┘
     │
     ▼
┌──────────────────┐
│  React Component │
│  (UI Layer)      │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│  API Service     │
│  (axios)         │
└────┬─────────────┘
     │
     │ HTTP Request
     │ + JWT Token
     ▼
┌──────────────────┐
│  Express Route   │
│  Handler         │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│  Auth Middleware │
│  (if protected)  │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│  Controller      │
│  Logic           │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│  Mongoose Model  │
│  (ORM)           │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│  MongoDB         │
│  Database        │
└────┬─────────────┘
     │
     │ Response flows back up
     ▼
┌──────────────────┐
│  User sees       │
│  updated UI      │
└──────────────────┘
```

## Technology Stack Details

### Frontend Stack
```
React 19
├── React Router DOM 7 (Routing)
├── Axios (HTTP Client)
├── Styled Components (CSS-in-JS)
└── Vite (Build Tool)
```

### Backend Stack
```
Node.js + Express 4
├── Mongoose 8 (MongoDB ODM)
├── JWT (Authentication)
├── bcryptjs (Password Hashing)
├── CORS (Cross-Origin Requests)
├── dotenv (Environment Variables)
└── Nodemon (Development)
```

### Database
```
MongoDB
└── Collections
    ├── users
    └── projects
```

## Security Architecture

### Password Security
```
User Password
    │
    ▼
bcryptjs.hash(password, 10)
    │
    ▼
Hashed Password (stored in DB)
    │
    ▼
Login: bcryptjs.compare(input, hash)
    │
    ▼
Boolean (match/no match)
```

### Token Security
```
Login Success
    │
    ▼
Generate JWT
    │
    ├── Payload: { userId, role }
    ├── Secret: JWT_SECRET
    └── Expiry: 7 days
    │
    ▼
Send to Client
    │
    ▼
Store in localStorage
    │
    ▼
Include in Authorization header
    │
    ▼
Server verifies signature
    │
    ▼
Grant/Deny Access
```

## File Structure

```
grafene/
│
├── Frontend (React)
│   ├── src/
│   │   ├── page/              # Page components
│   │   ├── assets/            # Styles & components
│   │   ├── services/          # API layer
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   └── public/                # Static assets
│
├── Backend (Express)
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Project.js         # Project schema
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   └── projects.js        # Project endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── scripts/
│   │   └── seedData.js        # Database seeding
│   ├── .env                   # Environment config
│   └── server.js              # Express app
│
└── Documentation
    ├── README.md              # Main documentation
    ├── QUICK_START.md         # Quick setup guide
    ├── SETUP_GUIDE.md         # Detailed setup
    ├── ARCHITECTURE.md        # This file
    └── IMPLEMENTATION_SUMMARY.md
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────┐
│              Production Setup                │
│                                             │
│  Frontend (Vercel/Netlify)                  │
│  https://grafene.com                        │
│         │                                   │
│         │ HTTPS                             │
│         ▼                                   │
│  Backend (Heroku/Railway/Render)            │
│  https://api.grafene.com                    │
│         │                                   │
│         │ MongoDB Driver                    │
│         ▼                                   │
│  MongoDB Atlas (Cloud)                      │
│  mongodb+srv://cluster.mongodb.net          │
│                                             │
│  + CDN for static assets                    │
│  + Environment variables                    │
│  + SSL/TLS certificates                     │
│  + Rate limiting                            │
│  + Logging & monitoring                     │
└─────────────────────────────────────────────┘
```

## Performance Considerations

### Current Implementation
- Direct MongoDB queries (no caching)
- Single server instance
- No pagination
- No rate limiting

### Future Optimizations
- Redis caching for frequently accessed data
- Database indexing on commonly queried fields
- Pagination for project lists
- CDN for static assets
- Load balancing for multiple server instances
- Connection pooling
- Query optimization

## Scalability Path

```
Current: Single Server + Single DB
    │
    ▼
Add: Redis Cache Layer
    │
    ▼
Add: Database Indexing
    │
    ▼
Add: Load Balancer + Multiple Servers
    │
    ▼
Add: Database Replication
    │
    ▼
Add: Microservices Architecture
```

---

This architecture provides a solid foundation for a full-stack application with room for growth and optimization as the user base expands.
