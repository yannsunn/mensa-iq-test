#!/bin/bash

# Test Report Generator for MENSA IQ Test
# Generates comprehensive test reports in multiple formats

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

PROJECT_DIR="/mnt/c/Users/march/MENSA攻略ツール/mensa-iq-test"
REPORT_DIR="/mnt/c/Users/march/MENSA攻略ツール/test-reports"
LOG_DIR="/mnt/c/Users/march/MENSA攻略ツール/logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create directories if they don't exist
mkdir -p "$REPORT_DIR" "$LOG_DIR"

# Function to check component health
check_component_health() {
    local component=$1
    local path=$2
    
    if [ -f "$path" ]; then
        # Check for TypeScript errors in the file
        cd "$PROJECT_DIR"
        if npx tsc --noEmit --skipLibCheck "$path" 2>/dev/null; then
            echo "PASS"
        else
            echo "FAIL"
        fi
    else
        echo "NOT_FOUND"
    fi
}

# Function to count lines of code
count_lines() {
    local dir=$1
    local pattern=$2
    find "$dir" -name "$pattern" -type f -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}'
}

# Function to generate HTML report
generate_html_report() {
    local report_file="$REPORT_DIR/test-report-${TIMESTAMP}.html"
    
    cat > "$report_file" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>MENSA IQ Test - Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        h2 { color: #555; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
        .status-pass { color: #28a745; font-weight: bold; }
        .status-fail { color: #dc3545; font-weight: bold; }
        .status-warning { color: #ffc107; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #007bff; color: white; }
        tr:hover { background-color: #f5f5f5; }
        .metric { display: inline-block; margin: 10px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #007bff; }
        .chart { margin: 20px 0; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>MENSA IQ Test - Test Report</h1>
        <p>Generated on: <strong>{{TIMESTAMP}}</strong></p>
        
        <h2>Project Overview</h2>
        <div>
            <div class="metric">
                <div>Total Components</div>
                <div class="metric-value">{{TOTAL_COMPONENTS}}</div>
            </div>
            <div class="metric">
                <div>Total Lines of Code</div>
                <div class="metric-value">{{TOTAL_LOC}}</div>
            </div>
            <div class="metric">
                <div>TypeScript Files</div>
                <div class="metric-value">{{TS_FILES}}</div>
            </div>
        </div>
        
        <h2>Build Status</h2>
        <table>
            <tr>
                <th>Check</th>
                <th>Status</th>
                <th>Details</th>
            </tr>
            <tr>
                <td>TypeScript Compilation</td>
                <td class="{{TS_STATUS_CLASS}}">{{TS_STATUS}}</td>
                <td>{{TS_DETAILS}}</td>
            </tr>
            <tr>
                <td>ESLint</td>
                <td class="{{LINT_STATUS_CLASS}}">{{LINT_STATUS}}</td>
                <td>{{LINT_DETAILS}}</td>
            </tr>
            <tr>
                <td>Build Process</td>
                <td class="{{BUILD_STATUS_CLASS}}">{{BUILD_STATUS}}</td>
                <td>{{BUILD_DETAILS}}</td>
            </tr>
        </table>
        
        <h2>Component Health</h2>
        <table>
            <tr>
                <th>Component</th>
                <th>Status</th>
                <th>Location</th>
            </tr>
            {{COMPONENT_ROWS}}
        </table>
        
        <h2>API Endpoints</h2>
        <table>
            <tr>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Response Time</th>
            </tr>
            {{API_ROWS}}
        </table>
        
        <h2>Recent Issues</h2>
        <pre>{{RECENT_ISSUES}}</pre>
        
        <h2>Recommendations</h2>
        <ul>
            {{RECOMMENDATIONS}}
        </ul>
    </div>
</body>
</html>
EOF
    
    echo "$report_file"
}

# Function to generate markdown report
generate_markdown_report() {
    local report_file="$REPORT_DIR/test-report-${TIMESTAMP}.md"
    
    cat > "$report_file" << EOF
# MENSA IQ Test - Test Report

**Generated on:** $(date)

## Executive Summary

This report provides a comprehensive overview of the MENSA IQ Test application's current state, including build status, component health, and recommendations for improvement.

## Project Metrics

| Metric | Value |
|--------|--------|
| Total Components | $(find "$PROJECT_DIR/src/components" -name "*.tsx" -type f | wc -l) |
| Total Lines of Code | $(count_lines "$PROJECT_DIR/src" "*.ts*") |
| TypeScript Files | $(find "$PROJECT_DIR/src" -name "*.ts*" -type f | wc -l) |
| API Routes | $(find "$PROJECT_DIR/src/app/api" -name "route.ts" -type f | wc -l) |

## Build Status

### TypeScript Compilation
$(cd "$PROJECT_DIR" && npx tsc --noEmit 2>&1 > "$LOG_DIR/ts-check.log" && echo "✅ **PASSED**" || echo "❌ **FAILED**")

### ESLint Check
$(cd "$PROJECT_DIR" && npm run lint 2>&1 > "$LOG_DIR/lint-check.log" && echo "✅ **PASSED**" || echo "⚠️ **WARNINGS**")

### Build Process
$(cd "$PROJECT_DIR" && npm run build 2>&1 > "$LOG_DIR/build-check.log" && echo "✅ **PASSED**" || echo "❌ **FAILED**")

## Component Analysis

### Core Components
EOF

    # Check each component
    components=(
        "BaseTest.tsx"
        "ExamTest.tsx"
        "PracticeTest.tsx"
        "ModeSelection.tsx"
        "AnalyticsDashboard.tsx"
        "ProblemBrowser.tsx"
        "DynamicProblemDisplay.tsx"
        "CubeQuestion.tsx"
        "ErrorBoundary.tsx"
        "ExamResults.tsx"
        "GeometricShapes.tsx"
        "PracticeFeedback.tsx"
        "RavenMatrix.tsx"
    )
    
    for component in "${components[@]}"; do
        status=$(check_component_health "$component" "$PROJECT_DIR/src/components/$component")
        case $status in
            "PASS") echo "- ✅ $component" >> "$report_file" ;;
            "FAIL") echo "- ❌ $component (TypeScript errors)" >> "$report_file" ;;
            "NOT_FOUND") echo "- ⚠️ $component (Not found)" >> "$report_file" ;;
        esac
    done
    
    cat >> "$report_file" << EOF

## API Health Check

$(if timeout 5 curl -s https://mensa-iq-test.vercel.app > /dev/null 2>&1; then
    echo "**Server Status:** ✅ Running on https://mensa-iq-test.vercel.app"
else
    echo "**Server Status:** ❌ Not accessible (Check deployment status)"
fi)

| Endpoint | Status | Notes |
|----------|--------|-------|
| /api/env-check | $(curl -s -o /dev/null -w "%{http_code}" https://mensa-iq-test.vercel.app/api/env-check 2>/dev/null || echo "Server down") | Environment validation |
| /api/problems | $(curl -s -o /dev/null -w "%{http_code}" https://mensa-iq-test.vercel.app/api/problems 2>/dev/null || echo "Server down") | Problem data endpoint |
| /api/images/generate | $(curl -s -o /dev/null -w "%{http_code}" https://mensa-iq-test.vercel.app/api/images/generate 2>/dev/null || echo "Server down") | Image generation |
| /api/svg-diagram | $(curl -s -o /dev/null -w "%{http_code}" https://mensa-iq-test.vercel.app/api/svg-diagram 2>/dev/null || echo "Server down") | SVG diagram generation |

## Code Quality Metrics

### Complexity Analysis
\`\`\`
Total Functions: $(grep -r "function\|=>" "$PROJECT_DIR/src" | wc -l)
React Components: $(find "$PROJECT_DIR/src/components" -name "*.tsx" -type f | wc -l)
Custom Hooks: $(find "$PROJECT_DIR/src/hooks" -name "*.ts" | wc -l)
\`\`\`

## Recent Errors and Warnings

### TypeScript Errors
\`\`\`
$(tail -20 "$LOG_DIR/ts-check.log" 2>/dev/null || echo "No recent TypeScript errors")
\`\`\`

### Lint Warnings
\`\`\`
$(tail -20 "$LOG_DIR/lint-check.log" 2>/dev/null || echo "No recent lint warnings")
\`\`\`

## Recommendations

1. **Regular Testing**: Run \`./monitor-test.sh once\` before each deployment
2. **Continuous Monitoring**: Use \`./monitor-test.sh continuous\` for ongoing monitoring
3. **File Watching**: Run \`./auto-test-runner.sh watch\` during development
4. **CI Integration**: Use \`./auto-test-runner.sh ci\` in your CI/CD pipeline

## Next Steps

- [ ] Address any TypeScript compilation errors
- [ ] Fix ESLint warnings to improve code quality
- [ ] Ensure all API endpoints are responding correctly
- [ ] Review and update component dependencies
- [ ] Run performance profiling on critical paths

---
*This report was automatically generated by the MENSA IQ Test monitoring system.*
EOF
    
    echo "$report_file"
}

# Function to generate JSON report
generate_json_report() {
    local report_file="$REPORT_DIR/test-report-${TIMESTAMP}.json"
    
    # Gather data
    total_components=$(find "$PROJECT_DIR/src/components" -name "*.tsx" -type f | wc -l)
    total_loc=$(count_lines "$PROJECT_DIR/src" "*.ts*")
    ts_files=$(find "$PROJECT_DIR/src" -name "*.ts*" -type f | wc -l)
    
    # Check statuses
    ts_status="PASS"
    cd "$PROJECT_DIR" && npx tsc --noEmit 2>/dev/null || ts_status="FAIL"
    
    lint_status="PASS"
    cd "$PROJECT_DIR" && npm run lint 2>/dev/null || lint_status="WARNING"
    
    build_status="PASS"
    cd "$PROJECT_DIR" && npm run build 2>/dev/null || build_status="FAIL"
    
    cat > "$report_file" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "project": {
    "name": "MENSA IQ Test",
    "path": "$PROJECT_DIR",
    "metrics": {
      "totalComponents": $total_components,
      "totalLinesOfCode": $total_loc,
      "typeScriptFiles": $ts_files
    }
  },
  "buildStatus": {
    "typeScript": "$ts_status",
    "lint": "$lint_status",
    "build": "$build_status"
  },
  "components": [
EOF
    
    # Add component data
    first=true
    for component in "${components[@]}"; do
        status=$(check_component_health "$component" "$PROJECT_DIR/src/components/$component")
        if [ "$first" = false ]; then echo "," >> "$report_file"; fi
        echo -n "    {\"name\": \"$component\", \"status\": \"$status\"}" >> "$report_file"
        first=false
    done
    
    cat >> "$report_file" << EOF

  ],
  "recommendations": [
    "Run regular tests before deployment",
    "Use continuous monitoring for production",
    "Enable file watching during development",
    "Integrate with CI/CD pipeline"
  ]
}
EOF
    
    echo "$report_file"
}

# Main function
main() {
    echo -e "${GREEN}MENSA IQ Test - Test Report Generator${NC}"
    echo -e "${BLUE}Generating reports...${NC}"
    
    # Generate all report formats
    html_report=$(generate_html_report)
    md_report=$(generate_markdown_report)
    json_report=$(generate_json_report)
    
    # Process HTML report with actual data
    cd "$PROJECT_DIR"
    
    # Gather metrics
    total_components=$(find "$PROJECT_DIR/src/components" -name "*.tsx" -type f | wc -l)
    total_loc=$(count_lines "$PROJECT_DIR/src" "*.ts*")
    ts_files=$(find "$PROJECT_DIR/src" -name "*.ts*" -type f | wc -l)
    
    # Check statuses
    if npx tsc --noEmit 2>/dev/null; then
        ts_status="PASS"
        ts_status_class="status-pass"
        ts_details="All TypeScript files compiled successfully"
    else
        ts_status="FAIL"
        ts_status_class="status-fail"
        ts_details="TypeScript compilation errors found"
    fi
    
    # Update HTML report with actual data
    sed -i "s/{{TIMESTAMP}}/$(date)/g" "$html_report"
    sed -i "s/{{TOTAL_COMPONENTS}}/$total_components/g" "$html_report"
    sed -i "s/{{TOTAL_LOC}}/$total_loc/g" "$html_report"
    sed -i "s/{{TS_FILES}}/$ts_files/g" "$html_report"
    sed -i "s/{{TS_STATUS}}/$ts_status/g" "$html_report"
    sed -i "s/{{TS_STATUS_CLASS}}/$ts_status_class/g" "$html_report"
    sed -i "s/{{TS_DETAILS}}/$ts_details/g" "$html_report"
    
    echo -e "${GREEN}✓ Reports generated successfully!${NC}"
    echo -e "${BLUE}HTML Report:${NC} $html_report"
    echo -e "${BLUE}Markdown Report:${NC} $md_report"
    echo -e "${BLUE}JSON Report:${NC} $json_report"
    
    # Create a symlink to the latest report
    ln -sf "$html_report" "$REPORT_DIR/latest-report.html"
    ln -sf "$md_report" "$REPORT_DIR/latest-report.md"
    ln -sf "$json_report" "$REPORT_DIR/latest-report.json"
    
    echo -e "${YELLOW}Latest reports available at:${NC}"
    echo "  $REPORT_DIR/latest-report.html"
    echo "  $REPORT_DIR/latest-report.md"
    echo "  $REPORT_DIR/latest-report.json"
}

# Run main function
main