import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  pid: string;
}

export class RegisterPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly pidInput: Locator;
  private readonly registerButton: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByRole('textbox', { name: /Email \(6 - 32 characters\):/ });
    this.passwordInput = page.getByRole('textbox', { name: /Password \(8 - 64 characters\):/ });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password:' });
    this.pidInput = page.getByRole('textbox', { name: /PID\/Passport number \(8 - 20 characters\):/ });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.pageTitle = page.getByRole('heading', { name: 'Create account' });
  }

  async navigateToRegister(): Promise<void> {
    await this.navigateTo('/Account/Register.cshtml');
  }

  async getPageTitle(): Promise<string> {
    return await this.getElementText(this.pageTitle);
  }

  async fillRegistrationForm(data: RegisterData): Promise<void> {
    await this.fillInput(this.emailInput, data.email);
    await this.fillInput(this.passwordInput, data.password);
    await this.fillInput(this.confirmPasswordInput, data.confirmPassword);
    await this.fillInput(this.pidInput, data.pid);
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  async register(data: RegisterData): Promise<void> {
    await this.fillRegistrationForm(data);
    await this.clickRegisterButton();
  }

  async getEmailInput(): Promise<Locator> {
    return this.emailInput;
  }

  async getPasswordInput(): Promise<Locator> {
    return this.passwordInput;
  }

  async getConfirmPasswordInput(): Promise<Locator> {
    return this.confirmPasswordInput;
  }

  async getPidInput(): Promise<Locator> {
    return this.pidInput;
  }

  async getRegisterButton(): Promise<Locator> {
    return this.registerButton;
  }
}
