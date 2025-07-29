#!/bin/bash

# Automatic Test Runner for MENSA IQ Test
# This script watches for file changes and automatically runs tests

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/mnt/c/Users/march/MENSA攻略ツール/mensa-iq-test"
LOG_DIR="/mnt/c/Users/march/MENSA攻略ツール/logs"
WATCH_LOG="$LOG_DIR/watch.log"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Function to log messages
log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$WATCH_LOG"
}

# Function to run quick tests
run_quick_tests() {
    log "${BLUE}Running quick tests...${NC}"
    
    # TypeScript check
    cd "$PROJECT_DIR"
    if timeout 60 npx tsc --noEmit 2>&1; then
        log "${GREEN}✓ TypeScript check passed${NC}"
    else
        log "${RED}✗ TypeScript check failed${NC}"
    fi
    
    # Lint check
    if npm run lint; then
        log "${GREEN}✓ Lint check passed${NC}"
    else
        log "${YELLOW}⚠ Lint warnings found${NC}"
    fi
}

# Function to watch for changes
watch_files() {
    log "${GREEN}Starting file watcher...${NC}"
    log "Watching: $PROJECT_DIR/src"
    
    # Use inotifywait if available, otherwise use a simple loop
    if command -v inotifywait &> /dev/null; then
        while true; do
            inotifywait -r -e modify,create,delete "$PROJECT_DIR/src" 2>/dev/null
            log "${YELLOW}File change detected!${NC}"
            run_quick_tests
        done
    else
        # Fallback: simple polling method
        log "${YELLOW}Using polling method (inotifywait not found)${NC}"
        
        # Store checksums of files
        declare -A checksums
        
        while true; do
            changed=false
            
            # Check all TypeScript/JavaScript files
            while IFS= read -r -d '' file; do
                current_checksum=$(md5sum "$file" 2>/dev/null | cut -d' ' -f1)
                
                if [ "${checksums[$file]}" != "$current_checksum" ]; then
                    if [ ! -z "${checksums[$file]}" ]; then
                        log "${YELLOW}Change detected: ${file#$PROJECT_DIR/}${NC}"
                        changed=true
                    fi
                    checksums[$file]=$current_checksum
                fi
            done < <(find "$PROJECT_DIR/src" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -print0 2>/dev/null)
            
            if [ "$changed" = true ]; then
                run_quick_tests
            fi
            
            sleep 5
        done
    fi
}

# Function to run continuous integration tests
run_ci_tests() {
    log "${GREEN}Running CI tests...${NC}"
    
    cd "$PROJECT_DIR"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        log "${BLUE}Installing dependencies...${NC}"
        npm install
    fi
    
    # Run all tests
    log "${BLUE}1. TypeScript compilation${NC}"
    npx tsc --noEmit
    
    log "${BLUE}2. Linting${NC}"
    npm run lint
    
    log "${BLUE}3. Building project${NC}"
    npm run build
    
    log "${GREEN}CI tests completed!${NC}"
}

# Handle script arguments
case "$1" in
    "watch")
        watch_files
        ;;
    "ci")
        run_ci_tests
        ;;
    "quick")
        run_quick_tests
        ;;
    *)
        echo "Usage: $0 {watch|ci|quick}"
        echo "  watch - Watch for file changes and run tests automatically"
        echo "  ci    - Run full CI test suite"
        echo "  quick - Run quick tests once"
        exit 1
        ;;
esac