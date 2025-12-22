import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Hello World/);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello World');
  });

  test('should display text input on page load', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[type="text"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder');
  });

  test('should allow user to type in the input field', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[type="text"]');
    await input.fill('John Doe');
    
    await expect(input).toHaveValue('John Doe');
  });

  test('should display personalized greeting when user types their name', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[type="text"]');
    await input.fill('Alice');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Alice!');
  });

  test('should update greeting in real-time as user types', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[type="text"]');
    const greeting = page.locator('.hello-world__greeting');
    
    await input.type('Bob', { delay: 100 });
    await expect(greeting).toHaveText('Hello, Bob!');
    
    await input.fill('Bobby');
    await expect(greeting).toHaveText('Hello, Bobby!');
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab to the input field
    await page.keyboard.press('Tab');
    
    const input = page.locator('input[type="text"]');
    await expect(input).toBeFocused();
    
    // Type using keyboard
    await page.keyboard.type('Keyboard User');
    await expect(input).toHaveValue('Keyboard User');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Keyboard User!');
  });

  test('should have proper ARIA attributes for accessibility', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('section[role="region"]');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');
    
    const input = page.locator('input[type="text"]');
    await expect(input).toHaveAttribute('aria-label');
    
    await input.fill('Test');
    const greeting = page.locator('[role="status"]');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    await expect(section).toBeVisible();
    
    const input = page.locator('input[type="text"]');
    await expect(input).toBeVisible();
    
    await input.fill('Mobile User');
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Mobile User!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    await expect(section).toBeVisible();
    
    const input = page.locator('input[type="text"]');
    await input.fill('Tablet User');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Tablet User!');
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    await expect(section).toBeVisible();
    
    const input = page.locator('input[type="text"]');
    await input.fill('Desktop User');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Desktop User!');
  });

  test('should clear greeting when input is cleared', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[type="text"]');
    await input.fill('Temporary User');
    
    let greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    
    await input.clear();
    await expect(greeting).not.toBeVisible();
  });

  test('should handle special characters in input', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[type="text"]');
    await input.fill('José O\'Brien');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, José O\'Brien!');
  });

  test('should handle long names gracefully', async ({ page }) => {
    await page.goto('/');
    
    const longName = 'Alexander Christopher Montgomery Wellington-Smythe III';
    const input = page.locator('input[type="text"]');
    await input.fill(longName);
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText(`Hello, ${longName}!`);
  });
});