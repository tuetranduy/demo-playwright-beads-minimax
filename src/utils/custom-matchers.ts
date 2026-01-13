import { Locator, expect } from '@playwright/test';

/**
 * Custom Playwright matchers for enhanced assertions
 */
export class CustomMatchers {
  /**
   * Check if element contains specific text (case insensitive)
   */
  static async toContainTextCaseInsensitive(
    locator: Locator,
    expected: string | RegExp
  ): Promise<{ pass: boolean; message: () => string }> {
    const actualText = (await locator.textContent())?.toLowerCase() || '';
    const expectedText = (typeof expected === 'string' ? expected : expected.source).toLowerCase();

    const pass = actualText.includes(expectedText);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to contain text "${expected}"`
          : `Expected element to contain text "${expected}", but found "${actualText}"`,
    };
  }

  /**
   * Check if element has exact text
   */
  static async toHaveExactTextCaseInsensitive(
    locator: Locator,
    expected: string | RegExp
  ): Promise<{ pass: boolean; message: () => string }> {
    const actualText = (await locator.textContent())?.trim() || '';
    const expectedText = typeof expected === 'string' ? expected : expected.source;

    const pass = actualText.toLowerCase() === expectedText.toLowerCase();
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have exact text "${expected}"`
          : `Expected element to have exact text "${expected}", but found "${actualText}"`,
    };
  }

  /**
   * Check if element is enabled
   */
  static async toBeEnabled(
    locator: Locator
  ): Promise<{ pass: boolean; message: () => string }> {
    const isDisabled = await locator.evaluate((el) =>
      el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true'
    );

    const pass = !isDisabled;
    return {
      pass,
      message: () =>
        pass
          ? 'Expected element to not be enabled'
          : 'Expected element to be enabled',
    };
  }

  /**
   * Check if element has specific attribute
   */
  static async toHaveAttribute(
    locator: Locator,
    name: string,
    value?: string | RegExp
  ): Promise<{ pass: boolean; message: () => string }> {
    const actualValue = await locator.getAttribute(name);

    if (value === undefined) {
      const pass = actualValue !== null;
      return {
        pass,
        message: () =>
          pass
            ? `Expected element not to have attribute "${name}"`
            : `Expected element to have attribute "${name}"`,
      };
    }

    const pass =
      actualValue !== null &&
      (typeof value === 'string'
        ? actualValue === value
        : value.test(actualValue));
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have attribute "${name}" with value "${value}"`
          : `Expected element to have attribute "${name}" with value "${value}", but found "${actualValue}"`,
    };
  }

  /**
   * Check if element has specific CSS property
   */
  static async toHaveCSS(
    locator: Locator,
    name: string,
    value: string | RegExp
  ): Promise<{ pass: boolean; message: () => string }> {
    const actualValue = await locator.evaluate(
      (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
      name
    );

    const pass =
      typeof value === 'string'
        ? actualValue === value
        : value.test(actualValue);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have CSS property "${name}" with value "${value}"`
          : `Expected element to have CSS property "${name}" with value "${value}", but found "${actualValue}"`,
    };
  }

  /**
   * Check if URL matches pattern
   */
  static async toHaveURL(
    locator: Locator,
    pattern: string | RegExp
  ): Promise<{ pass: boolean; message: () => string }> {
    const url = locator.page().url();
    const pass =
      typeof pattern === 'string'
        ? url.includes(pattern)
        : pattern.test(url);
    return {
      pass,
      message: () =>
        pass
          ? `Expected URL not to match pattern "${pattern}"`
          : `Expected URL to match pattern "${pattern}", but found "${url}"`,
    };
  }
}

// Extend Playwright's expect with custom matchers
expect.extend({
  toContainTextCaseInsensitive: CustomMatchers.toContainTextCaseInsensitive,
  toHaveExactTextCaseInsensitive: CustomMatchers.toHaveExactTextCaseInsensitive,
  toBeEnabled: CustomMatchers.toBeEnabled,
  toHaveAttribute: CustomMatchers.toHaveAttribute,
  toHaveCSS: CustomMatchers.toHaveCSS,
  toHaveURL: CustomMatchers.toHaveURL,
});

// TypeScript type declarations for custom matchers
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toContainTextCaseInsensitive(expected: string | RegExp): Promise<R>;
      toHaveExactTextCaseInsensitive(expected: string | RegExp): Promise<R>;
      toBeEnabled(): Promise<R>;
      toHaveAttribute(name: string, value?: string | RegExp): Promise<R>;
      toHaveCSS(name: string, value: string | RegExp): Promise<R>;
      toHaveURL(pattern: string | RegExp): Promise<R>;
    }
  }
}
