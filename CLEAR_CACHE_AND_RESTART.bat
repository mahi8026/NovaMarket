@echo off
echo ========================================
echo  CLEARING NEXT.JS CACHE AND RESTARTING
echo ========================================
echo.

cd nova-market

echo [1/4] Stopping any running processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Deleting .next cache folder...
if exist .next (
    rmdir /s /q .next
    echo Cache folder deleted!
) else (
    echo No cache folder found.
)

echo [3/4] Clearing node_modules/.cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo Node cache cleared!
)

echo [4/4] Starting fresh development server...
echo.
echo ========================================
echo  IMPORTANT: After server starts:
echo  1. Open browser in INCOGNITO mode
echo  2. Or press Ctrl+Shift+R to hard refresh
echo ========================================
echo.

npm run dev
