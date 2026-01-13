import { FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function globalSetup(config: FullConfig): Promise<void> {
  // Load environment variables
  const envPath = path.resolve(__dirname, '../../.env');
  dotenv.config({ path: envPath });

  console.log('Global setup completed');
  console.log(`Base URL: ${process.env.BASE_URL}`);
  console.log(`Running on projects: ${config.projects.map(p => p.name).join(', ')}`);
}

export default globalSetup;
