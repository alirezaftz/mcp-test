import { test, expect } from '@playwright/test';

test.describe('Hello World E2E Tests', () => {
  test('should load the hello world page', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('.hello-world')).toBeVisible();
  });

  test('should display the page title', async ({ page }) => {
    await page.goto('/');

    const title = page.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello World');
  });

  test('should have a text input field', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should update greeting when typing in input', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting-text');

    await expect(greeting).toHaveText('Hello, World!');

    await input.fill('Playwright');
    await expect(greeting).toHaveText('Hello, Playwright!');
  });

  test('should show and hide clear button appropriately', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const clearButton = page.locator('.hello-world__clear-button');

    await expect(clearButton).not.toBeVisible();

    await input.fill('Test User');
    await expect(clearButton).toBeVisible();

    await clearButton.click();
    await expect(clearButton).not.toBeVisible();
    await expect(input).toHaveValue('');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();

    const input = page.locator('.hello-world__input');
    await input.fill('Mobile Test');

    const greeting = page.locator('.hello-world__greeting-text');
    await expect(greeting).toHaveText('Hello, Mobile Test!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();

    const title = page.locator('.hello-world__title');
    await expect(title).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const input = page.locator('.hello-world__input');
    await expect(input).toBeFocused();

    await page.keyboard.type('Keyboard User');
    const greeting = page.locator('.hello-world__greeting-text');
    await expect(greeting).toHaveText('Hello, Keyboard User!');
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('section[role="region"]')).toBeVisible();
    await expect(page.locator('header.hello-world__header')).toBeVisible();
  });

  test('should maintain state during rapid input changes', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting-text');

    await input.fill('A');
    await input.fill('AB');
    await input.fill('ABC');
    await input.fill('ABCD');

    await expect(greeting).toHaveText('Hello, ABCD!');
  });

  test('should handle special characters in input', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting-text');

    await input.fill('John-Doe');
    await expect(greeting).toHaveText('Hello, John-Doe!');

    await input.fill('Mary O\'Brien');
    await expect(greeting).toHaveText('Hello, Mary O\'Brien!');
  });
});