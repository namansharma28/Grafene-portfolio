# Grafene API Reference

Base URL: `http://localhost:3001/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Sign Up
**POST** `/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "mobile": "9876543210",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "mobile": "9876543210"
  }
}
```

### Log In
**POST** `/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "mobile": "9876543210",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "mobile": "9876543210",
    "role": "user"
  }
}
```

### Get Current User
**GET** `/auth/me` 🔒

Get the currently authenticated user's information.

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "mobile": "9876543210",
    "role": "user"
  }
}
```

## Projects

### Get All Projects
**GET** `/projects`

Retrieve all projects, sorted by creation date (newest first).

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": "gravitas",
    "title": "GRAVITAS",
    "description": "An Event Management Software...",
    "fullDescription": "Gravitas is a comprehensive...",
    "image": "/projects/gravitas.gif",
    "features": [
      "Real-time collaboration tools",
      "Project submission system"
    ],
    "technologies": ["React", "Node.js", "MongoDB"],
    "contributors": [
      {
        "name": "Naman Sharma",
        "image": "/contributors/naman.jpg",
        "role": "Lead Developer"
      }
    ],
    "repoLink": "https://github.com/example/gravitas",
    "demoLink": "https://example.com/gravitas",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Get Single Project
**GET** `/projects/:id`

Retrieve a specific project by its ID.

**Parameters:**
- `id` (string) - Project ID (e.g., "gravitas")

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": "gravitas",
  "title": "GRAVITAS",
  "description": "An Event Management Software...",
  "fullDescription": "Gravitas is a comprehensive...",
  "image": "/projects/gravitas.gif",
  "features": ["Real-time collaboration tools"],
  "technologies": ["React", "Node.js"],
  "contributors": [
    {
      "name": "Naman Sharma",
      "image": "/contributors/naman.jpg",
      "role": "Lead Developer"
    }
  ],
  "repoLink": "https://github.com/example/gravitas",
  "demoLink": "https://example.com/gravitas",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (404):**
```json
{
  "message": "Project not found"
}
```

### Create Project
**POST** `/projects` 🔒

Create a new project. Requires authentication.

**Request Body:**
```json
{
  "id": "my-awesome-project",
  "title": "My Awesome Project",
  "description": "A short description of the project",
  "fullDescription": "A detailed description explaining what the project does...",
  "image": "/projects/my-project.gif",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "technologies": ["React", "Node.js", "MongoDB"],
  "contributors": [
    {
      "name": "Your Name",
      "image": "/contributors/you.jpg",
      "role": "Full Stack Developer"
    }
  ],
  "repoLink": "https://github.com/yourusername/project",
  "demoLink": "https://yourproject.com",
  "moreInfoLink": "https://yourproject.com/about"
}
```

**Response (201):**
```json
{
  "message": "Project created successfully",
  "project": {
    "_id": "507f1f77bcf86cd799439011",
    "id": "my-awesome-project",
    "title": "My Awesome Project",
    ...
  }
}
```

### Update Project
**PUT** `/projects/:id` 🔒

Update an existing project. Only the creator or admin can update.

**Parameters:**
- `id` (string) - Project ID

**Request Body:** (same as Create Project, all fields optional)

**Response (200):**
```json
{
  "message": "Project updated successfully",
  "project": {
    "_id": "507f1f77bcf86cd799439011",
    "id": "my-awesome-project",
    ...
  }
}
```

**Response (403):**
```json
{
  "message": "Not authorized to update this project"
}
```

### Delete Project
**DELETE** `/projects/:id` 🔒 (Admin Only)

Delete a project. Only admins can delete projects.

**Parameters:**
- `id` (string) - Project ID

**Response (200):**
```json
{
  "message": "Project deleted successfully"
}
```

**Response (403):**
```json
{
  "message": "Admin access required"
}
```

## Error Responses

All endpoints may return these error responses:

**400 Bad Request:**
```json
{
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "message": "Access denied"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","mobile":"1111111111","password":"test123"}'
```

### Log In
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"mobile":"1111111111","password":"test123"}'
```

### Get All Projects
```bash
curl http://localhost:3001/api/projects
```

### Create Project (with auth)
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"id":"test-project","title":"Test Project",...}'
```

## Testing with Postman

1. Import the base URL: `http://localhost:3001/api`
2. For authenticated requests:
   - Go to Authorization tab
   - Select "Bearer Token"
   - Paste your JWT token
3. Set Content-Type header to `application/json`

## Rate Limiting

Currently, there are no rate limits. Consider implementing rate limiting in production.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

🔒 = Requires Authentication
👑 = Requires Admin Role
