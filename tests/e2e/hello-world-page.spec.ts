import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Verify page title
    await expect(page).toHaveTitle('Hello World');
    
    // Verify main content is visible
    await expect(page.locator('main.app')).toBeVisible();
  });

  test('should display Hello World component', async ({ page }) => {
    await page.goto('/');
    
    // Verify section is present
    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();
    
    // Verify title
    await expect(page.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should allow user to type and see greeting', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');
    
    // Input should be visible
    await expect(input).toBeVisible();
    
    // Greeting should not be visible initially
    await expect(greeting).not.toBeVisible();
    
    // Type in input
    await input.fill('Integration Test User');
    
    // Greeting should appear
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Integration Test User!');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();
    
    const input = page.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    // Test input functionality on mobile
    await input.fill('Mobile User');
    await expect(page.locator('.hello-world__greeting')).toHaveText('Hello, Mobile User!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();
    
    const input = page.locator('.hello-world__input');
    await input.fill('Tablet User');
    await expect(page.locator('.hello-world__greeting')).toHaveText('Hello, Tablet User!');
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();
    
    const input = page.locator('.hello-world__input');
    await input.fill('Desktop User');
    await expect(page.locator('.hello-world__greeting')).toHaveText('Hello, Desktop User!');
  });

  test('should have accessible form elements', async ({ page }) => {
    await page.goto('/');
    
    // Verify ARIA attributes
    await expect(page.locator('section[role="region"]')).toBeVisible();
    await expect(page.locator('[aria-label="Hello World section"]')).toBeVisible();
    
    // Verify input has label
    const label = page.locator('label[for="hello-input"]');
    await expect(label).toBeVisible();
    
    const input = page.locator('#hello-input');
    await expect(input).toHaveAttribute('aria-label', 'Name');
  });

  test('should clear greeting when input is cleared', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');
    
    // Type and verify greeting
    await input.fill('Test User');
    await expect(greeting).toBeVisible();
    
    // Clear input
    await input.clear();
    
    // Greeting should disappear
    await expect(greeting).not.toBeVisible();
  });
});