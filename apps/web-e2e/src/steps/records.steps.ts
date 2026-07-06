import { expect } from '@playwright/test';
import { createBdd, test } from 'playwright-bdd';

const { Given, Then, When } = createBdd(test);

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
