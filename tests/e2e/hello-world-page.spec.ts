import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Hello World Page
 * 
 * Tests cover:
 * - Page loading
 * - Full user interaction flow
 * - Responsive behavior
 * - Keyboard navigation
 */
test.describe('Hello World Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load page successfully', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Hello World Page/);

    // Verify main content is visible
    const section = page.locator('section[role="region"]');
    await expect(section).toBeVisible();
  });

  test('should display default greeting on page load', async ({ page }) => {
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have functional text input', async ({ page }) => {
    const input = page.locator('input#name-input');
    
    // Verify input is visible and empty
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('');

    // Type in input
    await input.fill('Test User');
    await expect(input).toHaveValue('Test User');
  });

  test('should update greeting when user types name', async ({ page }) => {
    const input = page.locator('input#name-input');
    const heading = page.locator('h1.hello-world__heading');

    // Initial state
    await expect(heading).toHaveText('Hello, World!');

    // Type name
    await input.fill('John');

    // Greeting should update
    await expect(heading).toHaveText('Hello, John!');
  });

  test('should support keyboard navigation', async ({ page }) => {
    const input = page.locator('input#name-input');

    // Tab to input
    await page.keyboard.press('Tab');

    // Verify input is focused
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Keyboard User');

    // Verify text was entered
    await expect(input).toHaveValue('Keyboard User');

    // Verify greeting updated
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Keyboard User!');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify content is still visible and accessible
    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();

    const input = page.locator('input#name-input');
    await expect(input).toBeVisible();

    // Verify input still works on mobile
    await input.fill('Mobile User');
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Mobile User!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    const section = page.locator('section.hello-world');
    await expect(section).toBeVisible();

    const input = page.locator('input#name-input');
    await input.fill('Tablet User');

    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Tablet User!');
  });

  test('should clear input and revert to default greeting', async ({ page }) => {
    const input = page.locator('input#name-input');
    const heading = page.locator('h1.hello-world__heading');

    // Type name
    await input.fill('Temporary Name');
    await expect(heading).toHaveText('Hello, Temporary Name!');

    // Clear input
    await input.fill('');

    // Should revert to default
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have accessible label and description', async ({ page }) => {
    const label = page.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name');

    const description = page.locator('#name-input-description');
    await expect(description).toBeVisible();
    await expect(description).toContainText('Type your name');
  });

  test('should handle rapid input changes', async ({ page }) => {
    const input = page.locator('input#name-input');
    const heading = page.locator('h1.hello-world__heading');

    // Rapidly change input values
    await input.fill('A');
    await input.fill('Al');
    await input.fill('Ali');
    await input.fill('Alic');
    await input.fill('Alice');

    // Final greeting should match final input
    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should maintain focus on input after typing', async ({ page }) => {
    const input = page.locator('input#name-input');

    await input.click();
    await input.fill('Focus Test');

    // Input should still be focused
    await expect(input).toBeFocused();
  });
});