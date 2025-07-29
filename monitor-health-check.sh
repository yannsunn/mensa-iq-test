#!/bin/bash

# Health Check Script for MENSA IQ Test Monitoring System
# This script performs a quick health check of all monitoring components

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/mnt/c/Users/march/MENSA攻略ツール"
MENSA_DIR="$PROJECT_DIR/mensa-iq-test"

echo -e "${GREEN}=== MENSA IQ Test Monitoring System Health Check ===${NC}"
echo -e "Timestamp: $(date)"
echo ""

# Check if monitoring scripts exist and are executable
echo -e "${BLUE}Checking monitoring scripts...${NC}"
scripts=(
    "monitor-test.sh"
    "auto-test-runner.sh"
    "test-report-generator.sh"
)

all_good=true
for script in "${scripts[@]}"; do
    if [ -f "$PROJECT_DIR/$script" ]; then
        if [ -x "$PROJECT_DIR/$script" ]; then
            echo -e "${GREEN}✓${NC} $script - Found and executable"
        else
            echo -e "${YELLOW}⚠${NC} $script - Found but not executable"
            all_good=false
        fi
    else
        echo -e "${RED}✗${NC} $script - Not found"
        all_good=false
    fi
done

# Check directories
echo -e "\n${BLUE}Checking directories...${NC}"
dirs=(
    "$PROJECT_DIR/logs"
    "$PROJECT_DIR/test-reports"
    "$MENSA_DIR/src"
    "$MENSA_DIR/src/components"
)

for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} ${dir#$PROJECT_DIR/} - Exists"
    else
        echo -e "${RED}✗${NC} ${dir#$PROJECT_DIR/} - Missing"
        all_good=false
    fi
done

# Check Node.js and npm
echo -e "\n${BLUE}Checking Node.js environment...${NC}"
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓${NC} Node.js $(node -v)"
else
    echo -e "${RED}✗${NC} Node.js not found"
    all_good=false
fi

if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} npm $(npm -v)"
else
    echo -e "${RED}✗${NC} npm not found"
    all_good=false
fi

# Check if package.json exists
if [ -f "$MENSA_DIR/package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json found"
else
    echo -e "${RED}✗${NC} package.json not found"
    all_good=false
fi

# Check if node_modules exists
if [ -d "$MENSA_DIR/node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
else
    echo -e "${YELLOW}⚠${NC} node_modules missing - run 'npm install'"
fi

# Quick TypeScript check
echo -e "\n${BLUE}Quick TypeScript check...${NC}"
cd "$MENSA_DIR"
if timeout 10 npx tsc --version &> /dev/null; then
    echo -e "${GREEN}✓${NC} TypeScript available"
else
    echo -e "${RED}✗${NC} TypeScript not available"
fi

# Check server status
echo -e "\n${BLUE}Checking production server...${NC}"
if timeout 5 curl -s https://mensa-iq-test.vercel.app > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Production server is accessible at https://mensa-iq-test.vercel.app"
else
    echo -e "${YELLOW}⚠${NC} Production server is not accessible"
    echo -e "    Check deployment status at Vercel dashboard"
fi

# Summary
echo -e "\n${BLUE}=== Summary ===${NC}"
if [ "$all_good" = true ]; then
    echo -e "${GREEN}✓ All core components are healthy!${NC}"
else
    echo -e "${YELLOW}⚠ Some issues detected. Please review above.${NC}"
fi

echo -e "\n${BLUE}Quick Commands:${NC}"
echo "  Run tests once:         ./monitor-test.sh once"
echo "  Start file watching:    ./auto-test-runner.sh watch"
echo "  Generate report:        ./test-report-generator.sh"
echo "  Check production:       https://mensa-iq-test.vercel.app"