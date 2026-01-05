import { test, expect } from '@playwright/test';

test.describe('E2E Smoke Test', () => {
  test('server is running and accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hello World App/);
  });
});