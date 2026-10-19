# Empacer AI - PowerShell Auto Setup & Launcher
Write-Host "========================================================" -ForegroundColor Green
Write-Host "   Empacer AI Assistant - PowerShell Setup Suite" -ForegroundColor Green
Write-Host "========================================================"

# Check Node.js
if (!(Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Node.js is missing. Installing via winget..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS -y --silent
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[X] Auto-install failed. Please install Node.js manually." -ForegroundColor Red
        Exit
    }
    Write-Host "[+] Node.js installed successfully." -ForegroundColor Green
} else {
    $nodeVer = node -v
    Write-Host "[+] Node.js detected: $nodeVer" -ForegroundColor Green
}

# Check Git (optional dependency check)
if (!(Get-Command "git" -ErrorAction SilentlyContinue)) {
    Write-Host "[i] Git not found. Installing via winget..." -ForegroundColor Cyan
    winget install Git.Git -y --silent
}

# Install Dependencies
if (!(Test-Path "node_modules")) {
    Write-Host "[i] Installing node modules..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "[+] node_modules found." -ForegroundColor Green
}

# Launch App
Write-Host "[+] Starting Vite Development Server..." -ForegroundColor Green
Start-Process "http://localhost:5173"
npm run dev
