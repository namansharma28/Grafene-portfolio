# Grafene - Complete Setup Guide

This guide will help you set up both the frontend and backend of the Grafene project.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Git** (optional, for cloning)

**Note:** MongoDB is NOT required locally! This app uses MongoDB Atlas (cloud database), so you can skip MongoDB installation.

## Project Setup

### Step 1: Install Dependencies

#### Backend
```cmd
cd backend
npm install
```

#### Frontend
```cmd
cd ..
npm install
```

### Step 2: Configure Backend

The backend `.env` file is already configured with MongoDB Atlas (cloud database):
- MongoDB URI: `mongodb+srv://...` (MongoDB Atlas)
- Port: `3001`
- JWT Secret: Already configured

**No local MongoDB installation needed!** The app connects to MongoDB Atlas in the cloud.

### Step 3: Seed the Database

This will populate your database with sample data:

```cmd
cd backend
npm run seed
```

You should see:
```
Connected to MongoDB
Cleared existing data
Sample data seeded successfully

Admin credentials:
Mobile: 1234567890
Password: admin123
```

### Step 4: Start the Backend Server

```cmd
npm run dev
```

You should see:
```
Server is running on port 3001
MongoDB Connected: localhost
```

Keep this terminal window open!

### Step 5: Start the Frontend

Open a NEW terminal window:

```cmd
npm run dev
```

You should see:
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 6: Access the Application

Open your browser and go to: **http://localhost:5173**

## Testing the Application

### 1. View Projects
- The homepage should now display real projects from the database
- Click "Know More" on any project to see details

### 2. Sign Up
- Click "SignUp" in the navigation
- Create a new account with:
  - Name: Your name
  - Mobile: Any 10-digit number
  - Password: Your password

### 3. Log In
- Use the credentials you just created
- Or use the admin account:
  - Mobile: `1234567890`
  - Password: `admin123`

### 4. Upload a Project
- After logging in, go to `/uploadproject`
- Fill in the project details
- Submit to create a new project

## API Endpoints

The backend provides these endpoints:

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (requires login)
- `PUT /api/projects/:id` - Update project (requires login)
- `DELETE /api/projects/:id` - Delete project (admin only)

## Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED` or timeout errors

**Solution:**
1. Check your internet connection (MongoDB Atlas is cloud-based)
2. Verify the MongoDB Atlas URI in `backend/.env` is correct
3. Ensure your IP address is whitelisted in MongoDB Atlas:
   - Go to MongoDB Atlas dashboard
   - Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
4. Check database user credentials are correct
5. Restart the backend server

### Port Already in Use
**Error:** `Port 3001 is already in use`

**Solution:**
1. Find and kill the process using port 3001:
   ```cmd
   netstat -ano | findstr :3001
   taskkill /PID <PID> /F
   ```
2. Or change the port in `backend/.env`

### CORS Error
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Make sure the backend is running on port 3001
- Check that the frontend API calls use `http://localhost:3001`

### Projects Not Loading
**Solution:**
1. Check backend is running
2. Check MongoDB is running
3. Run the seed script again: `npm run seed`
4. Check browser console for errors

## Project Structure

```
grafene/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Project.js           # Project schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── projects.js          # Project routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── scripts/
│   │   └── seedData.js          # Database seeding
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   └── package.json
├── src/
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── page/
│   │   ├── index.jsx            # Homepage
│   │   ├── signup.jsx           # Signup page
│   │   ├── LogIn.jsx            # Login page
│   │   ├── UploadProject.tsx    # Upload project page
│   │   └── ProjectDetail.jsx    # Project details page
│   └── ...
└── package.json
```

## Next Steps

1. **Customize the styling** - Edit CSS files in `src/assets/`
2. **Add more features** - Extend the API and frontend
3. **Deploy** - Use services like Heroku, Vercel, or AWS
4. **Add file uploads** - Implement image upload functionality
5. **Add search** - Implement project search and filtering

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs (both frontend and backend)
3. Make sure all dependencies are installed
4. Verify MongoDB is running

Happy coding! 🚀
