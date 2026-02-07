@echo off
echo ========================================
echo Deploying to Vercel
echo ========================================
echo.

echo Installing dependencies...
call npm install

echo.
echo Building frontend...
call npm run build

echo.
echo Deploying to Vercel...
echo Make sure you have:
echo 1. Vercel CLI installed (npm i -g vercel)
echo 2. Environment variables set in Vercel dashboard
echo.

vercel --prod

echo.
echo ========================================
echo Deployment complete!
echo ========================================
pause
