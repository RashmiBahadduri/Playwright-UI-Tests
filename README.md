# Playwright-UI-Tests
## Overview
This project uses Playwright for end-to-end web UI and API test automation with TypeScript. 

## Prerequisites Running Tests
- Node.js 14+
- npm or yarn

## Installation
```bash
npm install
npm init playwright@latest

## Running Tests
```bash
Run all tests: npx playwright test
Run tests in UI mode: npx playwright test --ui
Run a specific file: npx playwright test tests/example.spec.ts
Run in headed mode: npx playwright test --headed
Run in debug mde: npx playwright test --debug
```

## Project Structure
```
├── tests/  -- Test Specs (UI and API)
├── pages/. --Page Object Model classes (locators + reusable actions)
├── utils/ -- global setup for login
├── playwright.config.ts -- global test configuration (browsers, retries, trace, reporters, projects)
└── README.md
```



