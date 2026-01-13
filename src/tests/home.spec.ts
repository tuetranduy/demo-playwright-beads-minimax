import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { AllureUtils } from '../utils/allure-utils';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should display the home page with correct title', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Home Page' },
      { type: 'story', description: 'Page Title' },
      { type: 'severity', description: 'normal' },
      { type: 'owner', description: 'QA Team' }
    );

    await AllureUtils.addStep('Verify page title is displayed', async () => {
      const title = await homePage.getPageTitle();
      expect(title).toContain('Welcome to Safe Railway');
    });
  });
});
