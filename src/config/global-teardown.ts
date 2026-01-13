import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('Global teardown completed');
  console.log(`Test run finished at: ${new Date().toISOString()}`);
}

export default globalTeardown;
