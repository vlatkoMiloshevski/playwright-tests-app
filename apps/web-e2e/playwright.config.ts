import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: 'src/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  fullyParallel: false,
  workers: 1,
  outputDir: 'apps/web-e2e/.playwright-output',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4300',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  webServer: {
    command: 'npx nx serve web --port=4300',
    url: 'http://localhost:4300',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
