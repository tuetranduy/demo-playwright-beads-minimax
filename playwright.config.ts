import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['list']
  ],

  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: !process.env.HEADED,
    locale: 'en-US',
    timezoneId: 'America/New_York',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  snapshotDir: './src/tests/snapshots',
  outputDir: './test-results/artifacts',

  globalSetup: path.resolve(__dirname, './src/config/global-setup.ts'),
  globalTeardown: path.resolve(__dirname, './src/config/global-teardown.ts'),
});
