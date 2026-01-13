import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('h1[align="center"]');
  }

  async navigateToHome(): Promise<void> {
    await this.navigate('/');
  }

  async getPageTitle(): Promise<string> {
    return await this.getElementText(this.pageTitle);
  }
}
