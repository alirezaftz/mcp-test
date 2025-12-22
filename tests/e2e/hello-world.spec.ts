import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle('Hello World');
    await expect(page.locator('.hello-world')).toBeVisible();
  });

  test('should display "Hello World" heading', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello World');
  });

  test('should have a visible text input field', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should allow typing in the input field', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    await input.fill('John Doe');
    await expect(input).toHaveValue('John Doe');
  });

  test('should display personalized greeting after typing', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    await input.fill('Alice');

    const output = page.locator('.hello-world__output');
    await expect(output).toBeVisible();
    await expect(output).toContainText('Hello, Alice!');
  });

  test('should clear greeting when input is emptied', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    await input.fill('Bob');
    
    const output = page.locator('.hello-world__output');
    await expect(output).toBeVisible();

    await input.fill('');
    await expect(output).not.toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('.hello-world')).toBeVisible();
    await expect(page.locator('.hello-world__input')).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('.hello-world')).toBeVisible();
    await expect(page.locator('.hello-world__input')).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    await expect(page.locator('.hello-world')).toBeVisible();
    await expect(page.locator('.hello-world__input')).toBeVisible();
  });

  test('should maintain accessibility standards', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('section[role="region"]')).toBeVisible();
    await expect(page.locator('input[aria-label="Your Name"]')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    const input = page.locator('.hello-world__input');
    await expect(input).toBeFocused();

    await page.keyboard.type('Keyboard Test');
    await expect(input).toHaveValue('Keyboard Test');
  });

  test('should update greeting in real-time', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    const output = page.locator('.hello-world__output');

    await input.fill('T');
    await expect(output).toContainText('Hello, T!');

    await input.fill('Test');
    await expect(output).toContainText('Hello, Test!');

    await input.fill('Test User');
    await expect(output).toContainText('Hello, Test User!');
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('main.app')).toBeVisible();
    await expect(page.locator('.hello-world__container')).toBeVisible();
    await expect(page.locator('.hello-world__input-group')).toBeVisible();
  });
});