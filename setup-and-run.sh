#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================================"
echo -e "   Empacer AI Assistant - UNIX Setup & Launcher"
echo -e "========================================================${NC}"

# 1. Detect OS & Package Manager
OS="$(uname -s)"
echo -e "${CYAN}[i] Detected Operating System: $OS${NC}"

# 2. Check and Install Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}[!] Node.js not found. Installing automatically...${NC}"
    if [ "$OS" = "Darwin" ]; then
        if ! command -v brew &> /dev/null; then
            echo -e "${CYAN}[i] Installing Homebrew...${NC}"
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install node
    elif [ "$OS" = "Linux" ]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y nodejs npm
        elif command -v pacman &> /dev/null; then
            sudo pacman -S --noconfirm nodejs npm
        else
            echo -e "${YELLOW}[X] Unsupported package manager. Please install Node.js manually.${NC}"
            exit 1
        fi
    fi
else
    echo -e "${GREEN}[+] Node.js is already installed ($(node -v)).${NC}"
fi

# 3. Install Dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${CYAN}[i] Installing project dependencies...${NC} "
    npm install
else
    echo -e "${GREEN}[+] Dependencies already up to date.${NC}"
fi

# 4. Launch App
echo -e "${GREEN}========================================================"
echo -e "   Launching Empacer AI Local Server..."
echo -e "========================================================${NC}"

# Open browser depending on OS background process
if [ "$OS" = "Darwin" ]; then
    open "http://localhost:5173" &
elif [ "$OS" = "Linux" ]; then
    xdg-open "http://localhost:5173" &
fi

npm run dev
