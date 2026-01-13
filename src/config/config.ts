export interface Config {
  baseURL: string;
  headless: boolean;
  timeout: number;
  retries: number;
  browser: string;
  projectName: string;
}

export const config: Config = {
  baseURL: process.env.BASE_URL || 'https://example.com',
  headless: process.env.HEADED !== 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  retries: parseInt(process.env.RETRIES || '0', 10),
  browser: process.env.BROWSER || 'chromium',
  projectName: process.env.PROJECT_NAME || 'default',
};

export const apiConfig = {
  baseURL: process.env.API_BASE_URL || 'https://api.example.com',
  apiKey: process.env.API_KEY || '',
  timeout: 30000,
};

export const databaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'test_db',
  user: process.env.DB_USER || 'test_user',
  password: process.env.DB_PASSWORD || 'test_password',
};
