# Deployment Checklist ✅

## Before Deployment

### Backend
- [ ] MongoDB Atlas URI is correct in `backend/.env`
- [ ] JWT_SECRET is set (change for production!)
- [ ] All dependencies installed: `cd backend && npm install`
- [ ] Backend runs locally: `npm run dev`
- [ ] Test API endpoints work

### Frontend
- [ ] All dependencies installed: `npm install`
- [ ] Frontend runs locally: `npm run dev`
- [ ] API calls work with local backend
- [ ] Build works: `npm run build`

### Database
- [ ] MongoDB Atlas cluster is active
- [ ] Network Access allows all IPs (0.0.0.0/0)
- [ ] Database user credentials are correct
- [ ] Database is seeded with sample data

---

## Render Deployment (Backend)

- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
- [ ] Deploy and wait for completion
- [ ] Copy backend URL
- [ ] Test health endpoint: `https://your-backend.onrender.com/api/health`
- [ ] Test projects endpoint: `https://your-backend.onrender.com/api/projects`

---

## Vercel Deployment (Frontend)

- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Import project
- [ ] Set Framework: Vite
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`
- [ ] Deploy and wait for completion
- [ ] Copy frontend URL

---

## Post-Deployment

### Update CORS
- [ ] Update `backend/server.js` with your Vercel URL
- [ ] Push changes to GitHub
- [ ] Wait for Render to redeploy

### Test Everything
- [ ] Visit your Vercel URL
- [ ] Homepage loads
- [ ] Projects display from database
- [ ] Sign up works
- [ ] Log in works
- [ ] Upload project works
- [ ] Project details page works
- [ ] Logout works
- [ ] No console errors

### MongoDB Atlas
- [ ] Check connections in Atlas dashboard
- [ ] Verify data is being saved
- [ ] Monitor for any errors

---

## Optional Improvements

- [ ] Add custom domain to Vercel
- [ ] Set up monitoring (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Set up error tracking
- [ ] Configure email notifications
- [ ] Add rate limiting
- [ ] Implement caching
- [ ] Set up CI/CD pipeline

---

## Troubleshooting

### If backend doesn't work:
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS settings

### If frontend doesn't work:
1. Check browser console
2. Verify VITE_API_URL is correct
3. Check network tab for API calls
4. Redeploy if needed

### If API calls fail:
1. Check CORS configuration
2. Verify backend URL in frontend
3. Check Render service is running
4. Test backend endpoints directly

---

## Success! 🎉

Your app is now live:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-backend.onrender.com
- **Database:** MongoDB Atlas

Share it with the world!
