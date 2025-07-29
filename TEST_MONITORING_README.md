# MENSA IQ Test - Test Monitoring System

## Overview
This test monitoring system provides comprehensive testing and monitoring capabilities for the MENSA IQ Test application.

## Components

### 1. Monitor Test Script (`monitor-test.sh`)
Main monitoring script that checks build status, linting, TypeScript compilation, and API endpoints.

**Usage:**
```bash
# Run tests once
./monitor-test.sh once

# Generate report only
./monitor-test.sh report

# Run continuous monitoring (checks every 5 minutes)
./monitor-test.sh continuous
```

### 2. Auto Test Runner (`auto-test-runner.sh`)
Watches for file changes and automatically runs tests during development.

**Usage:**
```bash
# Watch files and run tests on changes
./auto-test-runner.sh watch

# Run full CI test suite
./auto-test-runner.sh ci

# Run quick tests once
./auto-test-runner.sh quick
```

### 3. Test Report Generator (`test-report-generator.sh`)
Generates comprehensive test reports in HTML, Markdown, and JSON formats.

**Usage:**
```bash
# Generate all report formats
./test-report-generator.sh
```

## Directory Structure
```
/mnt/c/Users/march/MENSA攻略ツール/
├── monitor-test.sh          # Main monitoring script
├── auto-test-runner.sh      # Automatic test runner
├── test-report-generator.sh # Report generator
├── logs/                    # Log files
│   ├── monitor.log         # Monitoring logs
│   ├── build.log          # Build logs
│   ├── lint.log           # Lint logs
│   └── typescript.log     # TypeScript logs
└── test-reports/          # Generated reports
    ├── test-report-*.html # HTML reports
    ├── test-report-*.md   # Markdown reports
    ├── test-report-*.json # JSON reports
    └── latest-report.*    # Symlinks to latest reports
```

## Features

### Build Monitoring
- TypeScript compilation checks
- ESLint code quality checks
- Next.js build verification

### API Endpoint Testing
Tests are performed against the production Vercel deployment:
- Base URL: `https://mensa-iq-test.vercel.app`
- `/api/env-check` - Environment validation
- `/api/problems` - Problem data endpoint
- `/api/images/generate` - Image generation
- `/api/svg-diagram` - SVG diagram generation

### Component Health Checks
- Validates all React components
- Checks for TypeScript errors
- Reports missing components

### Reporting
- **HTML Reports**: Interactive web-based reports with charts and tables
- **Markdown Reports**: Documentation-friendly format for Git repositories
- **JSON Reports**: Machine-readable format for CI/CD integration

## Quick Start

1. **Initial Setup**
   ```bash
   cd /mnt/c/Users/march/MENSA攻略ツール
   ./monitor-test.sh once
   ```

2. **Development Mode**
   ```bash
   # In one terminal
   cd mensa-iq-test
   npm run dev
   
   # In another terminal
   ./auto-test-runner.sh watch
   ```

3. **Generate Reports**
   ```bash
   ./test-report-generator.sh
   # View reports in test-reports/latest-report.html
   ```

4. **Continuous Monitoring**
   ```bash
   ./monitor-test.sh continuous
   ```

## Integration with CI/CD

Add to your CI pipeline:
```yaml
# Example GitHub Actions
- name: Run Tests
  run: |
    ./auto-test-runner.sh ci
    ./test-report-generator.sh
```

## Troubleshooting

### Server Not Running
If API tests fail, ensure the development server is running:
```bash
cd mensa-iq-test
npm run dev
```

### Permission Denied
Make scripts executable:
```bash
chmod +x monitor-test.sh auto-test-runner.sh test-report-generator.sh
```

### Missing Dependencies
Install required dependencies:
```bash
cd mensa-iq-test
npm install
```

## Best Practices

1. **Before Commits**: Run `./monitor-test.sh once`
2. **During Development**: Use `./auto-test-runner.sh watch`
3. **Before Deployment**: Run `./auto-test-runner.sh ci`
4. **Regular Monitoring**: Use `./monitor-test.sh continuous` in production

## Support
For issues or questions, check the logs in the `logs/` directory or generate a detailed report using `./test-report-generator.sh`.