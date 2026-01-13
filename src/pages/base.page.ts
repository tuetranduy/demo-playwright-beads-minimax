import { Locator, Page, expect } from '@playwright/test';
import { config } from '../config/config';

/**
 * Base Page class that all page objects should extend
 * Provides common functionality for page interactions
 */
export abstract class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = config.baseURL;
  }

  /**
   * Navigate to a specific page using the relative path
   */
  async navigate(path: string): Promise<void> {
    await this.page.goto(`${this.baseURL}${path}`, {
      waitUntil: 'networkidle',
      timeout: config.timeout,
    });
  }

  /**
   * Navigate to the full URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'networkidle',
      timeout: config.timeout,
    });
  }

  /**
   * Get the current page URL
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * Get the page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for a locator to be visible
   */
  async waitForLocator(locator: Locator, timeout = config.timeout): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Wait for a locator to be hidden
   */
  async waitForLocatorHidden(locator: Locator, timeout = config.timeout): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }

  /**
   * Wait for a locator to contain specific text
   */
  async waitForText(locator: Locator, text: string, timeout = config.timeout): Promise<void> {
    await expect(locator).toContainText(text, { timeout });
  }

  /**
   * Click on a locator and wait for navigation
   */
  async clickAndWaitForNavigation(locator: Locator, timeout = config.timeout): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout }),
      locator.click(),
    ]);
  }

  /**
   * Scroll element into view
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Take a screenshot of a specific element
   */
  async takeElementScreenshot(locator: Locator, name: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.screenshot({ path: `test-results/screenshots/${name}.png` });
  }

  /**
   * Take a full page screenshot
   */
  async takePageScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Get element text content
   */
  async getElementText(locator: Locator): Promise<string> {
    await expect(locator).toBeVisible();
    return await locator.textContent() || '';
  }

  /**
   * Fill input field
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  /**
   * Clear and fill input field
   */
  async clearAndFillInput(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string | string[]): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.selectOption(value);
  }

  /**
   * Hover over an element
   */
  async hover(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.hover();
  }

  /**
   * Right-click on an element
   */
  async rightClick(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.click({ button: 'right' });
  }

  /**
   * Double-click on an element
   */
  async doubleClick(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.dblclick();
  }

  /**
   * Press a key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Wait for specific time (use sparingly)
   */
  async waitForTime(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Wait for API response
   */
  async waitForResponse(urlPattern: string | RegExp, timeout = config.timeout): Promise<void> {
    await this.page.waitForResponse(urlPattern, { timeout });
  }

  /**
   * Get page source
   */
  async getPageContent(): Promise<string> {
    return await this.page.content();
  }
}
