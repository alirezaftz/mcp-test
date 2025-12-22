import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');

    // Page should have a title
    await expect(page).toHaveTitle(/Hello World App/);

    // Main content should be visible
    const mainSection = page.locator('section[role="region"]');
    await expect(mainSection).toBeVisible();
  });

  test('should display default greeting on load', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('.hello-world__title');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have a text input field', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should update greeting when user types their name', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__title');

    // Type a name
    await input.fill('John');

    // Greeting should update
    await expect(heading).toHaveText('Hello, John!');
  });

  test('should persist greeting changes across multiple inputs', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__title');

    // First name
    await input.fill('Alice');
    await expect(heading).toHaveText('Hello, Alice!');

    // Change to second name
    await input.clear();
    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');

    // Clear input
    await input.clear();
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const section = page.locator('.hello-world');
    const input = page.locator('.hello-world__input');

    // Elements should still be visible on mobile
    await expect(section).toBeVisible();
    await expect(input).toBeVisible();

    // Input should be functional
    await input.fill('Mobile User');
    const heading = page.locator('.hello-world__title');
    await expect(heading).toHaveText('Hello, Mobile User!');
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab to the input field
    await page.keyboard.press('Tab');
    
    const input = page.locator('.hello-world__input');
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Keyboard User');
    
    const heading = page.locator('.hello-world__title');
    await expect(heading).toHaveText('Hello, Keyboard User!');
  });

  test('should have proper ARIA attributes for accessibility', async ({ page }) => {
    await page.goto('/');

    // Section should have proper ARIA attributes
    const section = page.locator('section[role="region"][aria-label="Hello world greeting section"]');
    await expect(section).toBeVisible();

    // Input should have proper ARIA attributes
    const input = page.locator('input[aria-label="Enter your name"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-describedby', 'name-description');

    // Description should exist
    const description = page.locator('#name-description');
    await expect(description).toBeVisible();
  });

  test('should handle very long names without breaking layout', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__title');

    const longName = 'Extremely Long Name That Should Not Break The Layout Design';
    await input.fill(longName);

    await expect(heading).toHaveText(`Hello, ${longName}!`);
    await expect(heading).toBeVisible();

    // Container should not overflow
    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
  });

  test('should trim whitespace from user input', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__title');

    // Input with leading and trailing spaces
    await input.fill('   Trimmed Name   ');

    // Should display trimmed version
    await expect(heading).toHaveText('Hello, Trimmed Name!');
  });
});