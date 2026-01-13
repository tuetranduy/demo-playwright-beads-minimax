# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright automation framework with TypeScript and Allure reporting. Uses Page Object Model (POM) architecture with custom fixtures for reusable test setup.

## Common Commands

```bash
# Run all tests
npm test

# Run in headed mode
HEADED=true npm test

# Run with Playwright's debug mode
npm run test:debug

# Run with line reporter (CI mode)
npm run test:ci

# Generate Allure report
npm run report:allure

# Open Allure report in browser
npm run report:allure:serve

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Clean test artifacts
npm run clean
```

## Architecture

### Test Organization
- **Tests location**: `src/tests/` - Test files use custom `test` fixture from `fixtures.ts`
- **Page Objects**: `src/pages/` - All pages extend `BasePage` and are accessed via `PageFactory`
- **Configuration**: `src/config/` - Contains `config.ts` with env vars, global setup/teardown

### Key Patterns

**Page Object Model**: All page classes extend `BasePage` which provides common navigation and interaction methods. Use `PageFactory` to create page instances:

```typescript
// In fixtures, pages are injected via pageFactory
test('example', async ({ pageFactory }) => {
  const homePage = pageFactory.getHomePage();
  await homePage.navigate('/');
});
```

**Custom Fixtures**: `src/tests/fixtures.ts` extends Playwright's `test` with reusable fixtures:
- `homePage` - Pre-initialized HomePage instance
- `pageFactory` - For creating page objects on demand
- `apiContext` / `apiHelper` - For API testing
- `testUser`, `randomEmail`, `randomPassword` - Generated test data

**Configuration**: Uses `.env` file. Key variables:
- `BASE_URL` - Application URL
- `HEADED` - Run browser in headed mode
- `BROWSER` - chromium/firefox/webkit
- `API_BASE_URL` / `API_KEY` - API testing config

## Allure Reporting

Tests use Allure annotations via `test.info().annotations.push()` for documenting features, stories, and severity. Generate reports with `npm run report:allure`.

## Linting

ESLint is configured with TypeScript support. Run `npm run lint` to check code quality.

### IMPORTANT NOTES FOR CREATING/UPDATING/FIXING TEST CASE
- Always read from .env file to find correct environment to create / run tests
- Tests should created without adding any comments
- Always use playwright mcp to take page snapshot before capture any locators - DO NOT CREATE / CAPTURE LOCATORS BY ASSUMPTION
- Always re-run test after made any changes to make sure nothing broken