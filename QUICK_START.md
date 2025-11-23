# 🚀 Quick Start Guide

Get Grafene running in 5 minutes!

## Prerequisites Check

✅ Node.js installed? Run: `node --version`

**Note:** No MongoDB installation needed! This app uses MongoDB Atlas (cloud database).

If Node.js is not installed, see [SETUP_GUIDE.md](./SETUP_GUIDE.md) for installation instructions.

## 3-Step Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Seed Database (30 seconds)

**Windows:**
```bash
seed-database.bat
```

**Mac/Linux:**
```bash
cd backend && npm run seed && cd ..
```

You should see:
```
✓ Connected to MongoDB
✓ Sample data seeded successfully

Admin credentials:
Mobile: 1234567890
Password: admin123
```

### Step 3: Start Servers (30 seconds)

**Windows - Open 2 terminals:**

Terminal 1:
```bash
start-backend.bat
```

Terminal 2:
```bash
start-frontend.bat
```

**Mac/Linux - Open 2 terminals:**

Terminal 1:
```bash
cd backend && npm run dev
```

Terminal 2:
```bash
npm run dev
```

## ✅ You're Ready!

Open your browser: **http://localhost:5173**

## Test It Out

1. **View Projects** - See real data from MongoDB
2. **Sign Up** - Create account at `/signup`
3. **Log In** - Use your account or admin (1234567890 / admin123)
4. **Upload Project** - Go to `/uploadproject` (must be logged in)

## Troubleshooting

### MongoDB Connection Issues?

**This app uses MongoDB Atlas (cloud database), so check:**
1. Your internet connection is working
2. The MongoDB Atlas URI in `backend/.env` is correct
3. Your IP is whitelisted in MongoDB Atlas:
   - Go to MongoDB Atlas → Network Access
   - Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
4. Database credentials are correct

### Port 3001 already in use?

**Windows:**
```cmd
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3001 | xargs kill -9
```

### Still having issues?

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed troubleshooting.

## What's Running?

- **Frontend:** http://localhost:5173 (Vite dev server)
- **Backend:** http://localhost:3001 (Express API)
- **Database:** MongoDB Atlas (Cloud database)

## API Testing

Test the API directly:

```bash
# Get all projects
curl http://localhost:3001/api/projects

# Health check
curl http://localhost:3001/api/health
```

## Default Credentials

**Admin Account:**
- Mobile: `1234567890`
- Password: `admin123`

## Project Structure

```
grafene/
├── backend/           # Express + MongoDB backend
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Main server file
├── src/              # React frontend
│   ├── page/         # Page components
│   └── services/     # API calls
└── public/           # Static assets
```

## Next Steps

- 📖 Read [README.md](./README.md) for full documentation
- 🔧 Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- 📡 See [backend/API_REFERENCE.md](./backend/API_REFERENCE.md) for API docs
- 📝 Review [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for what was built

## Common Commands

```bash
# Seed database
cd backend && npm run seed

# Start backend (dev mode)
cd backend && npm run dev

# Start frontend
npm run dev

# Build frontend for production
npm run build

# Preview production build
npm run preview
```

## Need Help?

1. Check the console logs (both frontend and backend)
2. Verify MongoDB is running
3. Make sure ports 3001 and 5173 are available
4. See troubleshooting section above
5. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**Happy Coding! 🎉**

Built with ❤️ by the Grafene community
