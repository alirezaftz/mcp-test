import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the hello world page successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('section[role="region"]')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Hello, World!');
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Hello World');
  });

  test('should display input field and allow user interaction', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('#name-input');
    await expect(input).toBeVisible();

    await input.fill('Integration Test User');
    await expect(page.locator('h1')).toHaveText('Hello, Integration Test User!');
  });

  test('should show personalized message after typing name', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('#name-input');
    await input.fill('E2E Test');

    const message = page.locator('.hello-world__greeting-text');
    await expect(message).toBeVisible();
    await expect(message).toHaveText('Nice to meet you, E2E Test! 👋');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();

    const input = page.locator('#name-input');
    await expect(input).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
  });

  test('should handle rapid input changes', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('#name-input');
    const title = page.locator('h1');

    await input.fill('A');
    await expect(title).toHaveText('Hello, A!');

    await input.fill('AB');
    await expect(title).toHaveText('Hello, AB!');

    await input.fill('ABC');
    await expect(title).toHaveText('Hello, ABC!');
  });

  test('should clear greeting when input is emptied', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('#name-input');
    const title = page.locator('h1');

    await input.fill('Test User');
    await expect(title).toHaveText('Hello, Test User!');

    await input.clear();
    await expect(title).toHaveText('Hello, World!');
  });

  test('should have accessible navigation using keyboard', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const input = page.locator('#name-input');
    await expect(input).toBeFocused();

    await page.keyboard.type('Keyboard User');
    await expect(page.locator('h1')).toHaveText('Hello, Keyboard User!');
  });
});