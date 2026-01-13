import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { TestDataGenerator } from '../utils/test-data.generator';
import { AllureUtils } from '../utils/allure-utils';

test.describe('Register Page', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigateToRegister();
  });

  test('should display the register page with correct title', async () => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Page Title' },
      { type: 'severity', description: 'normal' }
    );

    await AllureUtils.addStep('Verify page title is displayed', async () => {
      const title = await registerPage.getPageTitle();
      expect(title).toContain('Create account');
    });
  });

  test('should register a new user successfully', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Successful Registration' },
      { type: 'severity', description: 'critical' }
    );

    const email = TestDataGenerator.generateEmail();
    const password = TestDataGenerator.generatePassword(12);
    const pid = TestDataGenerator.generatePid();

    await AllureUtils.addStep('Fill registration form with valid data', async () => {
      await registerPage.register({
        email,
        password,
        confirmPassword: password,
        pid,
      });
    });

    await AllureUtils.addStep('Verify registration redirects to confirm page', async () => {
      await expect(page).toHaveURL(/Confirm/);
    });
  });

  test('should show error when email is empty', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Email Validation' },
      { type: 'severity', description: 'normal' }
    );

    const password = TestDataGenerator.generatePassword(12);
    const pid = TestDataGenerator.generatePid();

    await AllureUtils.addStep('Submit form without email', async () => {
      await registerPage.register({
        email: '',
        password,
        confirmPassword: password,
        pid,
      });
    });

    await AllureUtils.addStep('Verify email field has error class', async () => {
      const emailInput = await registerPage.getEmailInput();
      await expect(emailInput).toHaveClass(/error-field/);
    });
  });

  test('should show error when password is too short', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Password Validation' },
      { type: 'severity', description: 'normal' }
    );

    const email = TestDataGenerator.generateEmail();
    const pid = TestDataGenerator.generatePid();

    await AllureUtils.addStep('Fill form with short password', async () => {
      await registerPage.register({
        email,
        password: 'short',
        confirmPassword: 'short',
        pid,
      });
    });

    await AllureUtils.addStep('Verify password field has error class', async () => {
      const passwordInput = await registerPage.getPasswordInput();
      await expect(passwordInput).toHaveClass(/error-field/);
    });
  });

  test('should show error when passwords do not match', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Confirm Password Validation' },
      { type: 'severity', description: 'normal' }
    );

    const email = TestDataGenerator.generateEmail();
    const password = TestDataGenerator.generatePassword(12);
    const pid = TestDataGenerator.generatePid();

    await AllureUtils.addStep('Fill form with mismatched passwords', async () => {
      await registerPage.register({
        email,
        password,
        confirmPassword: 'differentpassword',
        pid,
      });
    });

    await AllureUtils.addStep('Verify confirm password field has error class', async () => {
      const confirmPasswordInput = await registerPage.getConfirmPasswordInput();
      await expect(confirmPasswordInput).toHaveClass(/error-field/);
    });
  });

  test('should show error when PID is too short', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'PID Validation' },
      { type: 'severity', description: 'normal' }
    );

    const email = TestDataGenerator.generateEmail();
    const password = TestDataGenerator.generatePassword(12);

    await AllureUtils.addStep('Fill form with short PID', async () => {
      await registerPage.register({
        email,
        password,
        confirmPassword: password,
        pid: '12345',
      });
    });

    await AllureUtils.addStep('Verify PID field has error class', async () => {
      const pidInput = await registerPage.getPidInput();
      await expect(pidInput).toHaveClass(/error-field/);
    });
  });

  test('should show error when all fields are empty', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Empty Form Validation' },
      { type: 'severity', description: 'normal' }
    );

    await AllureUtils.addStep('Submit empty form', async () => {
      await registerPage.clickRegisterButton();
    });

    await AllureUtils.addStep('Verify email field has error class', async () => {
      const emailInput = await registerPage.getEmailInput();
      await expect(emailInput).toHaveClass(/error-field/);
    });
  });

  test('should navigate to login page when clicking login link', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Navigation' },
      { type: 'severity', description: 'minor' }
    );

    await AllureUtils.addStep('Click login link', async () => {
      await page.getByRole('link', { name: 'login', exact: true }).click();
    });

    await AllureUtils.addStep('Verify navigation to login page', async () => {
      await expect(page).toHaveURL(/Login/);
    });
  });

  test('should navigate to confirm page when clicking here link', async ({ page }) => {
    test.info().annotations.push(
      { type: 'feature', description: 'Register Page' },
      { type: 'story', description: 'Navigation' },
      { type: 'severity', description: 'minor' }
    );

    await AllureUtils.addStep('Click here link', async () => {
      await page.getByText('here').click();
    });

    await AllureUtils.addStep('Verify navigation to confirm page', async () => {
      await expect(page).toHaveURL(/Confirm/);
    });
  });
});
