# Quick Deploy Guide

## 🚀 Deploy in 10 Minutes

### 1️⃣ Deploy Backend to Render (5 min)

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://naman:namanpassword@cluster0.6ncweyj.mongodb.net/grafene?retryWrites=true&w=majority
   JWT_SECRET=usdgfiesijfewfebijfejfew
   NODE_ENV=production
   ```
6. Click **"Create Web Service"**
7. **Copy your backend URL** (e.g., `https://grafene-backend.onrender.com`)

### 2️⃣ Deploy Frontend to Vercel (5 min)

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Settings:
   - **Framework:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://grafene-backend.onrender.com/api` (your Render URL + /api)
5. Click **"Deploy"**

### 3️⃣ Update CORS

After Vercel deployment, update `backend/server.js`:

```javascript
const corsOptions = {
  origin: ['https://your-vercel-url.vercel.app', 'http://localhost:5173'],
  credentials: true
};
```

Push to GitHub, Render will auto-redeploy.

### ✅ Done!

Test your app at your Vercel URL!

**Note:** Render free tier spins down after 15 min. First request takes 30-60 seconds.
