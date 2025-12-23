import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Hello World App');
  });

  test('should display the hello world component', async ({ page }) => {
    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();
  });

  test('should display default greeting message', async ({ page }) => {
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should allow user to input name and see personalized greeting', async ({ page }) => {
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');

    // Type name
    await input.fill('Test User');

    // Verify greeting updates
    await expect(greeting).toHaveText('Hello, Test User!');
  });

  test('should maintain greeting update when typing slowly', async ({ page }) => {
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');

    // Type character by character
    await input.type('Jane', { delay: 100 });

    // Verify final greeting
    await expect(greeting).toHaveText('Hello, Jane!');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();

    const input = page.locator('.hello-world__input');
    await expect(input).toBeVisible();

    // Test interaction on mobile
    await input.fill('Mobile User');
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Mobile User!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();

    const input = page.locator('.hello-world__input');
    await input.fill('Tablet User');
    
    const greeting = page.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Tablet User!');
  });

  test('should handle special characters in input', async ({ page }) => {
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');

    await input.fill('José María');
    await expect(greeting).toHaveText('Hello, José María!');
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Check for proper semantic HTML
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();

    // Check for ARIA attributes
    const section = page.locator('section[role="region"]');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Check input accessibility
    const input = page.locator('input#name-input');
    await expect(input).toHaveAttribute('aria-label');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-description');

    // Check live region
    const greeting = page.locator('[role="status"]');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should handle rapid input changes', async ({ page }) => {
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');

    // Rapidly change input
    await input.fill('First');
    await input.fill('Second');
    await input.fill('Third');
    await input.fill('Final Name');

    // Verify final state
    await expect(greeting).toHaveText('Hello, Final Name!');
  });

  test('should clear greeting when input is emptied', async ({ page }) => {
    const input = page.locator('.hello-world__input');
    const greeting = page.locator('.hello-world__greeting');

    // Enter name
    await input.fill('Temporary');
    await expect(greeting).toHaveText('Hello, Temporary!');

    // Clear input
    await input.clear();
    await expect(greeting).toHaveText('Hello, World!');
  });
});