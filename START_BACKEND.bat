@echo off
echo Starting Nova Marketplace Backend with MongoDB Atlas...
echo.
cd /d "%~dp0express-server"
if not exist "package.json" (
    echo ERROR: Cannot find package.json in express-server folder
    pause
    exit /b 1
)
if not exist ".env" (
    echo ERROR: .env file not found!
    echo.
    echo Please follow these steps:
    echo 1. Copy .env.example to .env
    echo 2. Update MONGODB_URI with your MongoDB Atlas connection string
    echo 3. See MONGODB_SETUP_GUIDE.md for detailed instructions
    echo.
    pause
    exit /b 1
)
echo Starting Express server with MongoDB Atlas...
echo.
npm start
pause
