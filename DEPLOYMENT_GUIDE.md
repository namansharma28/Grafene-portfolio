# Deployment Guide - Vercel + Render

## Overview
- **Frontend:** Vercel (React + Vite)
- **Backend:** Render (Node.js + Express)
- **Database:** MongoDB Atlas (already configured)

---

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Backend
Your backend is already configured for Render with `render.yaml`.

### Step 2: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name:** `grafene-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=mongodb+srv://naman:namanpassword@cluster0.6ncweyj.mongodb.net/grafene?retryWrites=true&w=majority
   JWT_SECRET=usdgfiesijfewfebijfejfew
   ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (2-3 minutes)

8. **Copy your backend URL** (e.g., `https://grafene-backend.onrender.com`)

### Step 3: Update CORS (Important!)

After deployment, update `backend/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update API URL

1. **In Vercel Dashboard**, add environment variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://grafene-backend.onrender.com/api`

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: grafene
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New" → "Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   
5. **Add Environment Variable:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://grafene-backend.onrender.com/api`

6. **Click "Deploy"**

7. **Wait for deployment** (1-2 minutes)

---

## ✅ Post-Deployment Checklist

### Backend (Render)
- [ ] Service is running (check Render dashboard)
- [ ] MongoDB Atlas connection working
- [ ] Environment variables set correctly
- [ ] Health check endpoint working: `https://your-backend.onrender.com/api/health`

### Frontend (Vercel)
- [ ] Site is live
- [ ] API calls working (check browser console)
- [ ] Login/Signup working
- [ ] Projects loading from database
- [ ] Upload project working

### MongoDB Atlas
- [ ] IP whitelist includes `0.0.0.0/0` (allow all)
- [ ] Database user credentials correct
- [ ] Database name is `grafene`

---

## 🔧 Testing Your Deployment

### Test Backend
```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Get projects
curl https://your-backend.onrender.com/api/projects
```

### Test Frontend
1. Visit your Vercel URL
2. Check browser console for errors
3. Try logging in
4. Try viewing projects
5. Try uploading a project

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** "Application failed to respond"
- Check Render logs
- Verify MongoDB connection string
- Check environment variables

**Problem:** CORS errors
- Update CORS configuration in `backend/server.js`
- Add your Vercel domain to allowed origins

**Problem:** MongoDB connection timeout
- Check MongoDB Atlas network access
- Ensure IP `0.0.0.0/0` is whitelisted

### Frontend Issues

**Problem:** API calls failing
- Check `VITE_API_URL` environment variable in Vercel
- Verify backend URL is correct
- Check browser console for errors

**Problem:** 404 on page refresh
- Vercel should handle this with `vercel.json`
- Check rewrites configuration

**Problem:** Environment variables not working
- Redeploy after adding environment variables
- Ensure variable name starts with `VITE_`

---

## 📝 Important Notes

### Render Free Tier
- **Spins down after 15 minutes of inactivity**
- **First request after spin-down takes 30-60 seconds**
- Consider upgrading to paid tier for production

### MongoDB Atlas
- **Free tier: 512MB storage**
- **Shared cluster**
- Upgrade if you need more storage

### Vercel Free Tier
- **100GB bandwidth/month**
- **Unlimited deployments**
- **Automatic HTTPS**

---

## 🔄 Updating Your Deployment

### Update Backend
```bash
# Push to GitHub
git add .
git commit -m "Update backend"
git push

# Render auto-deploys from GitHub
```

### Update Frontend
```bash
# Push to GitHub
git add .
git commit -m "Update frontend"
git push

# Vercel auto-deploys from GitHub
```

Or use Vercel CLI:
```bash
vercel --prod
```

---

## 🔐 Security Recommendations

Before going live:

1. **Change JWT_SECRET** to a strong random string
2. **Update MongoDB password** to something more secure
3. **Enable rate limiting** on backend
4. **Add input validation** on all endpoints
5. **Set up monitoring** (Sentry, LogRocket)
6. **Configure proper CORS** (specific domains only)
7. **Add HTTPS** (automatic on Vercel/Render)

---

## 📊 Monitoring

### Render
- View logs in Render dashboard
- Set up email alerts for downtime

### Vercel
- View deployment logs
- Analytics available in dashboard
- Set up Vercel Analytics (optional)

### MongoDB Atlas
- Monitor in Atlas dashboard
- Set up alerts for storage/connections

---

## 💰 Cost Estimate

**Free Tier (Current Setup):**
- Render: $0/month (with spin-down)
- Vercel: $0/month
- MongoDB Atlas: $0/month
- **Total: $0/month**

**Paid Tier (Recommended for Production):**
- Render: $7/month (no spin-down)
- Vercel: $20/month (Pro features)
- MongoDB Atlas: $9/month (M2 cluster)
- **Total: $36/month**

---

## 🎉 You're Done!

Your app is now live:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-backend.onrender.com
- **Database:** MongoDB Atlas (cloud)

Share your project with the world! 🚀
