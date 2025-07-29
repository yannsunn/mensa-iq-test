#!/bin/bash

# MENSA IQ Test Monitor Script
# This script monitors the Next.js application for changes and runs tests

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/mnt/c/Users/march/MENSA攻略ツール/mensa-iq-test"
LOG_DIR="/mnt/c/Users/march/MENSA攻略ツール/logs"
MONITOR_LOG="$LOG_DIR/monitor.log"
TEST_RESULTS_LOG="$LOG_DIR/test-results.log"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Function to log messages
log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$MONITOR_LOG"
}

# Function to check if the server is running
check_server() {
    if timeout 5 curl -s https://mensa-iq-test.vercel.app > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to check build status
check_build() {
    log "${BLUE}Checking build status...${NC}"
    cd "$PROJECT_DIR"
    if npm run build > "$LOG_DIR/build.log" 2>&1; then
        log "${GREEN}✓ Build successful${NC}"
        return 0
    else
        log "${RED}✗ Build failed${NC}"
        cat "$LOG_DIR/build.log" | tail -20 | tee -a "$MONITOR_LOG"
        return 1
    fi
}

# Function to check lint status
check_lint() {
    log "${BLUE}Running lint check...${NC}"
    cd "$PROJECT_DIR"
    if npm run lint > "$LOG_DIR/lint.log" 2>&1; then
        log "${GREEN}✓ Lint check passed${NC}"
        return 0
    else
        log "${YELLOW}⚠ Lint warnings/errors found${NC}"
        cat "$LOG_DIR/lint.log" | tail -20 | tee -a "$MONITOR_LOG"
        return 1
    fi
}

# Function to check TypeScript compilation
check_typescript() {
    log "${BLUE}Checking TypeScript compilation...${NC}"
    cd "$PROJECT_DIR"
    if npx tsc --noEmit > "$LOG_DIR/typescript.log" 2>&1; then
        log "${GREEN}✓ TypeScript compilation successful${NC}"
        return 0
    else
        log "${RED}✗ TypeScript errors found${NC}"
        cat "$LOG_DIR/typescript.log" | tail -20 | tee -a "$MONITOR_LOG"
        return 1
    fi
}

# Function to run API endpoint tests
test_api_endpoints() {
    log "${BLUE}Testing API endpoints...${NC}"
    
    if ! check_server; then
        log "${YELLOW}Production server not accessible. Please check https://mensa-iq-test.vercel.app${NC}"
        return 1
    fi
    
    # Test various API endpoints
    endpoints=(
        "/api/env-check"
        "/api/problems"
        "/api/test-svg"
        "/api/svg-diagram"
        "/api/images/generate"
    )
    
    for endpoint in "${endpoints[@]}"; do
        response=$(curl -s -o /dev/null -w "%{http_code}" "https://mensa-iq-test.vercel.app$endpoint" 2>/dev/null)
        if [ "$response" = "200" ] || [ "$response" = "405" ]; then
            log "${GREEN}✓ API endpoint $endpoint is accessible (HTTP $response)${NC}"
        elif [ -z "$response" ]; then
            log "${RED}✗ API endpoint $endpoint failed (Server not responding)${NC}"
        else
            log "${YELLOW}⚠ API endpoint $endpoint returned HTTP $response${NC}"
        fi
    done
    
    # No need to kill server for production URL
}

# Function to generate test report
generate_report() {
    log "${BLUE}Generating test report...${NC}"
    
    cat > "$TEST_RESULTS_LOG" << EOF
# MENSA IQ Test - Monitoring Report
Generated: $(date)

## Build Status
$(if check_build; then echo "✓ PASSED"; else echo "✗ FAILED"; fi)

## Lint Status
$(if check_lint; then echo "✓ PASSED"; else echo "⚠ WARNINGS"; fi)

## TypeScript Status
$(if check_typescript; then echo "✓ PASSED"; else echo "✗ FAILED"; fi)

## API Endpoints
$(test_api_endpoints 2>&1 | grep -E "✓|✗")

## Recent Logs
$(tail -20 "$MONITOR_LOG")
EOF
    
    log "${GREEN}Report generated at: $TEST_RESULTS_LOG${NC}"
}

# Main monitoring function
monitor() {
    log "${GREEN}Starting MENSA IQ Test Monitor${NC}"
    log "Project directory: $PROJECT_DIR"
    log "Log directory: $LOG_DIR"
    
    while true; do
        log "${BLUE}Running monitoring checks...${NC}"
        
        # Run all checks
        check_build
        check_lint
        check_typescript
        test_api_endpoints
        
        # Generate report
        generate_report
        
        # Sleep before next check
        log "${YELLOW}Next check in 5 minutes...${NC}"
        sleep 300
    done
}

# Handle script arguments
case "$1" in
    "once")
        log "${GREEN}Running single test check${NC}"
        check_build
        check_lint
        check_typescript
        test_api_endpoints
        generate_report
        ;;
    "report")
        generate_report
        ;;
    "continuous")
        monitor
        ;;
    *)
        echo "Usage: $0 {once|report|continuous}"
        echo "  once       - Run tests once and exit"
        echo "  report     - Generate report only"
        echo "  continuous - Run continuous monitoring"
        exit 1
        ;;
esac