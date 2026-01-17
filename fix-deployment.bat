@echo off
echo ========================================
echo Fixing Nova Marketplace Deployment
echo ========================================
echo.

echo Step 1: Fixing Vercel configuration...
echo Updated vercel.json for proper Next.js routing

echo.
echo Step 2: Cleaning up dependencies...
cd nova-market
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)

if exist .next (
    echo Removing .next build cache...
    rmdir /s /q .next
)

echo.
echo Step 3: Installing clean dependencies...
npm install

echo.
echo Step 4: Testing local build...
npm run build

if %errorlevel% neq 0 (
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build successful! Deployment fixes applied
echo ========================================
echo.
echo Fixes applied:
echo 1. Updated vercel.json for proper Next.js routing
echo 2. Added nova-market/vercel.json for subdirectory deployment
echo 3. Cleaned and rebuilt dependencies
echo.
echo Next steps:
echo 1. Commit and push changes to GitHub:
echo    git add .
echo    git commit -m "Fix deployment routing issues"
echo    git push
echo.
echo 2. In Vercel Dashboard:
echo    - Set Root Directory to: nova-market
echo    - Framework should auto-detect as Next.js
echo    - Redeploy the project
echo.
echo 3. The routing issue should be resolved
echo.
pause