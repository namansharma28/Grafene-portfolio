# Deploy to Vercel - Complete Guide

## What Was Done

Your project is now configured to deploy both React frontend and Express backend together on Vercel (like Next.js).

**Key Changes:**
- Created `api/index.js` - Serverless wrapper for Express backend
- Updated `vercel.json` - Routes `/api/*` to backend, everything else to frontend
- Merged backend dependencies into root `package.json`
- All API endpoints now work at `/api` instead of separate domain

## Deploy in 3 Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select your repository
4. Vercel will auto-detect the configuration

### Step 3: Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
MONGODB_URI = mongodb+srv://your-username:password@cluster.mongodb.net/dbname
JWT_SECRET = any-random-secret-string-here
NODE_ENV = production
```

Click **Deploy**!

## After Deployment

Your app will be at: `https://your-project-name.vercel.app`

Test the API: `https://your-project-name.vercel.app/api/health`

## Local Development (Unchanged)

```bash
# Terminal 1
start-backend.bat

# Terminal 2
start-frontend.bat
```

## Architecture

```
User Request
    ↓
Vercel
    ├─→ Static Files (React) - served from /dist
    └─→ API Routes (/api/*) - serverless function
    ↓
MongoDB Atlas
```

**Benefits:**
- ✅ One deployment (not two)
- ✅ Same domain (no CORS issues)
- ✅ Fast cold starts (1-2s vs 30s+ on Render)
- ✅ Always on (no sleep)
- ✅ Auto-deploy on git push

## Troubleshooting

### Build Fails
```bash
# Test locally first
npm run build
```

### API Returns 404
- Check environment variables are set in Vercel
- Check function logs in Vercel dashboard

### MongoDB Connection Error
- Verify `MONGODB_URI` in Vercel settings
- In MongoDB Atlas: Network Access → Add IP `0.0.0.0/0`
- Database Access → Verify user has read/write permissions

### Need to Rollback
Vercel Dashboard → Deployments → Previous deployment → Promote to Production

## File Structure

```
/
├── api/
│   └── index.js          # Backend serverless function
├── backend/              # Original backend code (used by api/index.js)
├── src/                  # React frontend
├── dist/                 # Built frontend (auto-generated)
├── vercel.json           # Vercel configuration
└── package.json          # Combined dependencies
```

## URLs

```
Frontend:  https://your-app.vercel.app
Backend:   https://your-app.vercel.app/api
Auth:      https://your-app.vercel.app/api/auth/login
Projects:  https://your-app.vercel.app/api/projects
```

## Deploy Updates

After making changes:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel auto-deploys! No manual steps needed.

---

**That's it!** Push to GitHub, connect to Vercel, add environment variables, and deploy.
