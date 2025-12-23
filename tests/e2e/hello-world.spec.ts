import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Hello World Page');
    
    const main = page.locator('main.hello-world');
    await expect(main).toBeVisible();
  });

  test('should display all main elements', async ({ page }) => {
    await expect(page.locator('.hello-world__title')).toBeVisible();
    await expect(page.locator('.hello-world__description')).toBeVisible();
    await expect(page.locator('.hello-world__input')).toBeVisible();
  });

  test('should allow user to enter name and see greeting', async ({ page }) => {
    const input = page.locator('#name-input');
    const greeting = page.locator('.hello-world__greeting');

    await input.fill('John Doe');
    await expect(greeting).toHaveText('Hello, John Doe! Welcome to our page.');
  });

  test('should be keyboard accessible', async ({ page }) => {
    const input = page.locator('#name-input');

    // Tab to input
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Keyboard User');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Keyboard User! Welcome to our page.');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
    
    const input = page.locator('#name-input');
    await expect(input).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
    
    const title = page.locator('.hello-world__title');
    await expect(title).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const main = page.locator('main.hello-world');
    await expect(main).toBeVisible();
  });

  test('should handle rapid typing', async ({ page }) => {
    const input = page.locator('#name-input');
    const greeting = page.locator('.hello-world__greeting');

    await input.fill('Alice');
    await expect(greeting).toContainText('Alice');

    await input.fill('Bob');
    await expect(greeting).toContainText('Bob');

    await input.fill('Charlie');
    await expect(greeting).toContainText('Charlie');
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toHaveCount(1);

    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check input has associated label
    const label = page.locator('label[for="name-input"]');
    await expect(label).toBeVisible();

    // Check ARIA attributes
    const section = page.locator('section[role="region"]');
    await expect(section).toHaveAttribute('aria-label');
  });

  test('should clear greeting when input is cleared', async ({ page }) => {
    const input = page.locator('#name-input');
    const greeting = page.locator('.hello-world__greeting');

    await input.fill('Test User');
    await expect(greeting).toHaveText('Hello, Test User! Welcome to our page.');

    await input.clear();
    await expect(greeting).toBeEmpty();
  });
});