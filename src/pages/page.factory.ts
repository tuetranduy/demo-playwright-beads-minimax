import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { RegisterPage } from './register.page';

/**
 * Page Factory - Centralized page object management
 */
export class PageFactory {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get Home Page instance
   */
  getHomePage(): HomePage {
    return new HomePage(this.page);
  }

  /**
   * Get Register Page instance
   */
  getRegisterPage(): RegisterPage {
    return new RegisterPage(this.page);
  }

  /**
   * Create page instance dynamically by class name
   */
  createPage<T>(pageClass: new (page: Page) => T): T {
    return new pageClass(this.page);
  }
}
