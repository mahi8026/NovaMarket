@echo off
echo ========================================
echo Nova Marketplace Server Deployment
echo ========================================
echo.

echo Checking if Vercel CLI is installed...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo Failed to install Vercel CLI. Please install manually:
        echo npm install -g vercel
        pause
        exit /b 1
    )
)

echo.
echo Navigating to server directory...
cd server

echo.
echo Starting deployment...
echo.
echo IMPORTANT: When prompted:
echo 1. Choose "Link to existing project" if you have one, or create new
echo 2. Set project name: nova-market-api
echo 3. Confirm deployment
echo.

vercel

echo.
echo ========================================
echo Deployment completed!
echo ========================================
echo.
echo Next steps:
echo 1. Set environment variables in Vercel dashboard
echo 2. Update frontend NEXT_PUBLIC_API_URL
echo 3. Test the API endpoints
echo.
echo Don't forget to configure these environment variables:
echo - MONGODB_URI
echo - NODE_ENV=production
echo - ALLOWED_ORIGINS
echo - STRIPE_SECRET_KEY
echo - FRONTEND_URL
echo.
pause