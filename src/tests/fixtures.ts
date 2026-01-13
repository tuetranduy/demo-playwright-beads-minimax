import { test as base, APIRequestContext } from '@playwright/test';
import { PageFactory } from '../pages/page.factory';
import { APIHelper } from '../utils/api-helper';
import { TestDataGenerator } from '../utils/test-data.generator';

interface TestFixtures {
  homePage: ReturnType<PageFactory['getHomePage']>;
  pageFactory: PageFactory;

  apiContext: APIRequestContext;
  apiHelper: APIHelper;

  testUser: ReturnType<typeof TestDataGenerator.generateUser>;
  randomEmail: string;
  randomPassword: string;
}


export const test = base.extend<TestFixtures>({
  pageFactory: async ({ page }, use) => {
    const factory = new PageFactory(page);
    await use(factory);
  },

  homePage: async ({ pageFactory }, use) => {
    const homePage = pageFactory.getHomePage();
    await use(homePage);
  },

  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext();
    await use(context);
    await context.dispose();
  },

  apiHelper: async ({ }, use) => {
    const helper = new APIHelper();
    await helper.createContext();
    await use(helper);
    await helper.disposeContext();
  },

  testUser: async ({ }, use) => {
    const user = TestDataGenerator.generateUser();
    await use(user);
  },

  randomEmail: async ({ }, use) => {
    const email = TestDataGenerator.generateEmail();
    await use(email);
  },

  randomPassword: async ({ }, use) => {
    const password = TestDataGenerator.generatePassword();
    await use(password);
  },
});

export { expect } from '@playwright/test';
