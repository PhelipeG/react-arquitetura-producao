import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

const project = process.argv
  .slice(2)
  .find((arg) => arg.startsWith('--project='))
  ?.replace('--project=', '');

const integrationPort = 4173;
const integrationOrigin = `http://localhost:${integrationPort}`;

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'integration',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: integrationOrigin,
      },
      testDir: '.',
      testMatch: '**/*.integration.test.ts',
    },
    {
      name: 'e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173',
      },
      testDir: './testing/e2e',
    },
  ],

  webServer:
    project === 'e2e'
      ? [
          {
            command: 'npm run build && npm run start',
            url: 'http://localhost:9999',
            cwd: './backend',
            reuseExistingServer: !process.env.CI,
            timeout: 180_000,
          },
          {
            command: 'npm run dev',
            url: 'http://localhost:5173',
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
          },
        ]
      : {
          // Do not reuse a normal Vite/dev server on 5173 — Mocky needs its own
          // process so the WebSocket mock server (58152) is available.
          command: `ENABLE_MOCKS=true npm run build && mocky-balboa-react-router -p ${integrationPort}`,
          url: integrationOrigin,
          reuseExistingServer: false,
          timeout: 180_000,
        },
});
