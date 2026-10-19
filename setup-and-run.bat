@echo off
TITLE Empacer AI - Auto Setup & Launcher
COLOR 0A
CLS

echo ========================================================
echo   Empacer AI Assistant - Autonomous Environment Setup
echo ========================================================

REM 1. Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Node.js not detected on this system.
    echo [i] Automatically downloading and installing Node.js LTS via winget...
    winget install OpenJS.NodeJS.LTS -y --silent
    if %errorlevel% neq 0 (
        echo [X] Automated install failed. Please install Node.js manually from https://nodejs.org/
        pause
        exit /b 1
    )
    echo [+] Node.js successfully installed! Please restart your terminal if command fails.
) else (
    echo [+] Node.js is already installed.
)

REM 2. Check node version
for /f "tokens=5" %%i in ('node -v') do set NODE_VERSION=%%i
echo [+] Detected Node version: %NODE_VERSION%

REM 3. Install dependencies
if not exist "node_modules\" (
    echo [i] Installing project dependencies (npm install)...
    call npm install
) else (
    echo [+] Dependencies already installed.
)

REM 4. Launch Development Server
echo ========================================================
echo   Launching Empacer AI Platform Locally...
echo ========================================================
start http://localhost:5173
npm run dev
pause
