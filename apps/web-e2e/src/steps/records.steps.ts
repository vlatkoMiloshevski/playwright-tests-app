import { expect } from '@playwright/test';
import { createBdd, test } from 'playwright-bdd';
import { promises as fs } from 'fs';
import { join } from 'path';

const { Given, Then, When } = createBdd(test);

Given('the API request to {string} is mocked with fixture {string}', async ({ page }, requestUrl: string, fixtureName: string) => {
  const filePath = join(__dirname, '..', 'mocks', fixtureName);
  const body = JSON.stringify(JSON.parse(await fs.readFile(filePath, 'utf-8')));

  await page.route(`**${requestUrl}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body,
    });
  });
});

Given('I open the records landing page', async ({ page }) => {
  await page.goto('/');
});

Then('I should see the records table', async ({ page }) => {
  await expect(page.getByTestId('records-table')).toBeVisible();
  await expect(page.locator('[data-testid^="record-row-"]')).toHaveCount(3);
});

When('I click the record row with id {int}', async ({ page }, id: number) => {
  await page.getByTestId(`record-row-${id}`).click();
});

Then(
  'I should be navigated to the details page for id {int}',
  async ({ page }, id: number) => {
    await expect(page).toHaveURL(new RegExp(`/records/${id}$`));
    await expect(page.getByTestId('record-details')).toBeVisible();
  }
);

Then(
  'I should see selected record id {int} in the details view',
  async ({ page }, id: number) => {
    await expect(page.getByTestId('record-id')).toHaveText(String(id));
  }
);

When(
  'I open details page for invalid record id {int}',
  async ({ page }, id: number) => {
    await page.goto(`/records/${id}`);
  }
);

Then('I should see record not found page', async ({ page }) => {
  await expect(page).toHaveURL(/\/records\/\d+$/);
  await expect(page.getByText('Record not found')).toBeVisible();
  await expect(
    page.getByText('The requested record ID does not exist in test data.')
  ).toBeVisible();
});
