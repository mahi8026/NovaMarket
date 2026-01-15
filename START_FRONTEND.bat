@echo off
echo Starting Nova Marketplace Frontend...
echo.
cd /d "%~dp0nova-market"
if not exist "package.json" (
    echo ERROR: Cannot find package.json in nova-market folder
    echo Please make sure you're running this from the project root
    pause
    exit /b 1
)
echo Starting Next.js development server...
echo.
npm run dev
pause
