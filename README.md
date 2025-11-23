# Grafene - Open Source Collaboration Platform

Grafene is a student-driven community platform for open-source collaboration. Built with React, Node.js, Express, and MongoDB, it enables students to showcase projects, collaborate, and build together.

## 🚀 Features

- **Project Showcase** - Display and discover open-source projects
- **User Authentication** - Secure signup/login with JWT
- **Project Management** - Upload and manage projects
- **Real-time Data** - MongoDB integration for dynamic content
- **Responsive Design** - Beautiful UI with custom cursor effects
- **RESTful API** - Complete backend API for all operations

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- Styled Components
- Vite

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

**Note:** No local MongoDB installation needed! This app uses MongoDB Atlas (cloud database).

## ⚡ Quick Start

**Want to get started immediately?** See [QUICK_START.md](./QUICK_START.md) for a 5-minute setup guide!

## 🔧 Detailed Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Seed the Database

```bash
# Windows
seed-database.bat

# Mac/Linux
cd backend && npm run seed
```

This creates sample projects and an admin user:
- Mobile: `1234567890`
- Password: `admin123`

### 3. Start the Application

**Option A: Using batch files (Windows)**
```bash
# Terminal 1 - Start backend
start-backend.bat

# Terminal 2 - Start frontend
start-frontend.bat
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 4. Access the App

Open your browser and navigate to: **http://localhost:5173**

**Note:** The app connects to MongoDB Atlas (cloud database), so no local MongoDB setup is required!

## 📁 Project Structure

```
grafene/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── scripts/            # Database seeding
│   └── server.js           # Express server
├── src/                    # Frontend source
│   ├── assets/             # Components and styles
│   ├── page/               # Page components
│   ├── services/           # API service layer
│   └── App.jsx             # Main app component
└── public/                 # Static assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (admin only)

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup and troubleshooting
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design
- **[backend/API_REFERENCE.md](./backend/API_REFERENCE.md)** - Complete API documentation
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Deployment guide
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation index

## 🎯 Usage

1. **Browse Projects** - View all projects on the homepage
2. **Sign Up** - Create an account to upload projects
3. **Log In** - Access your account
4. **Upload Project** - Share your open-source projects
5. **View Details** - Click "Know More" on any project

## 🔐 Environment Variables

Backend `.env` file (already configured):
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/grafene
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👥 Team

Built with ❤️ by the Grafene community

## 🐛 Troubleshooting

**MongoDB Connection Error?**
- Ensure MongoDB is running
- Check the connection string in `backend/.env`

**Port Already in Use?**
- Change the port in `backend/.env`
- Or kill the process using the port

**Projects Not Loading?**
- Verify backend is running on port 3001
- Run the seed script again
- Check browser console for errors

For more help, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
