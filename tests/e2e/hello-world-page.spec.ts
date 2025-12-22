import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle('Hello World');

    // Check main container is visible
    await expect(page.locator('main.hello-world')).toBeVisible();
  });

  test('should display default greeting', async ({ page }) => {
    await page.goto('/');

    const title = page.locator('.hello-world__title');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should have functional input field', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('input#name-input');
    
    // Check input is accessible
    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
  });

  test('should update greeting when typing in input field', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('input#name-input');
    const title = page.locator('.hello-world__title');

    // Interact with the input
    await input.click();
    await input.fill('John Doe');

    // Verify greeting updated
    await expect(title).toHaveText('Hello, John Doe!');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab to the input field
    await page.keyboard.press('Tab');

    const input = page.locator('input#name-input');
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Keyboard User');

    const title = page.locator('.hello-world__title');
    await expect(title).toHaveText('Hello, Keyboard User!');
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    await page.goto('/');

    // Check semantic elements
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('section[role="region"]')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('label[for="name-input"]')).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();

    // Component should still be functional
    const input = page.locator('input#name-input');
    await input.fill('Mobile User');

    const title = page.locator('.hello-world__title');
    await expect(title).toHaveText('Hello, Mobile User!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
  });

  test('should maintain state when input is cleared and refilled', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('input#name-input');
    const title = page.locator('.hello-world__title');

    // Fill input
    await input.fill('First Name');
    await expect(title).toHaveText('Hello, First Name!');

    // Clear input
    await input.fill('');
    await expect(title).toHaveText('Hello, World!');

    // Refill input
    await input.fill('Second Name');
    await expect(title).toHaveText('Hello, Second Name!');
  });
});