# Playwright Automation Framework

A production-ready automation framework using Playwright and TypeScript with Allure reporting to test http://railwayb1.somee.com/Page/HomePage.cshtml.

## Features

- **Page Object Model (POM)** - Clean, maintainable test structure
- **TypeScript Support** - Full type safety and IDE integration
- **Allure Reporting** - Rich, interactive test reports
- **Multi-browser Testing** - Chrome, Firefox, Safari, and mobile browsers
- **API Testing** - Built-in support for REST API testing
- **Custom Fixtures** - Reusable test fixtures for common operations
- **CI/CD Ready** - GitHub Actions workflow included
- **Custom Matchers** - Enhanced Playwright assertions
- **Test Data Generation** - Faker.js integration for realistic test data

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── config.ts     # App configuration
│   ├── global-setup.ts
│   └── global-teardown.ts
├── pages/            # Page Object Model
│   ├── base.page.ts  # Base page class
│   ├── home.page.ts  # Home page object
│   ├── login.page.ts # Login page object
│   └── page.factory.ts
├── tests/            # Test files
│   ├── fixtures.ts   # Custom test fixtures
│   ├── home.spec.ts  # Home page tests
│   ├── login.spec.ts # Login tests with API
│   └── example-with-fixtures.spec.ts
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
    ├── api-helper.ts       # API testing helpers
    ├── allure-utils.ts     # Allure reporting helpers
    ├── custom-matchers.ts  # Custom assertions
    └── test-data.generator.ts
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd playwright-automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment file
cp .env.example .env
```

## Configuration

Edit `.env` file to configure the framework:

```env
# Base Configuration
BASE_URL=https://example.com
HEADED=false

# Browser Configuration
BROWSER=chromium

# Test Configuration
TIMEOUT=30000
RETRIES=2

# API Configuration
API_BASE_URL=https://api.example.com
API_KEY=your-api-key
```

## Running Tests

```bash
# Run all tests
npm test

# Run in headed mode
HEADED=true npm test

# Run specific project
npm test -- --project=chromium

# Run with debug
npm run test:debug

# Run linting
npm run lint
```

## Generating Reports

```bash
# Generate Allure report
npm run report:allure

# Open Allure report
npm run report:allure:serve
```

## CI/CD

The framework includes a GitHub Actions workflow that:
1. Runs tests on multiple browsers
2. Generates Allure reports
3. Uploads artifacts
4. Deploys reports to GitHub Pages

## Writing Tests

### Using Page Objects

```typescript
import { test } from './fixtures';

test('example test', async ({ homePage }) => {
  await homePage.navigateToHome();
  await homePage.verifyPageElements();
});
```

### Using Custom Fixtures

```typescript
import { test } from './fixtures';

test('API test', async ({ apiHelper }) => {
  const response = await apiHelper.get('/api/health');
  expect(response.ok()).toBeTruthy();
});
```

### Adding Allure Annotations

```typescript
test('annotated test', async () => {
  test.info().annotations.push(
    { type: 'feature', description: 'Feature Name' },
    { type: 'story', description: 'Story Name' },
    { type: 'severity', description: 'critical' },
    { type: 'owner', description: 'QA Team' }
  );
});
```

## Best Practices

1. **Use Page Objects** - Encapsulate page interactions
2. **Follow AAA Pattern** - Arrange, Act, Assert
3. **Use Custom Fixtures** - Reuse common setup
4. **Add Allure Annotations** - Document tests properly
5. **Generate Realistic Data** - Use TestDataGenerator
6. **Handle Async Properly** - Await all async operations
7. **Clean Up Resources** - Use proper teardown

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License
