import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the hello world page', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle('Hello World App');

    // Check main content is visible
    await expect(page.locator('main.hello-world')).toBeVisible();
  });

  test('should display default greeting on page load', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have functional text input', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__heading');

    // Input should be empty initially
    await expect(input).toHaveValue('');

    // Type in the input
    await input.fill('Emma');

    // Greeting should update
    await expect(heading).toHaveText('Hello, Emma!');
    await expect(input).toHaveValue('Emma');
  });

  test('should update greeting in real-time as user types', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__heading');

    // Type slowly, character by character
    await input.type('John', { delay: 100 });

    // Final greeting should be correct
    await expect(heading).toHaveText('Hello, John!');
  });

  test('should reset greeting when input is cleared', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__heading');

    // Type a name
    await input.fill('Sarah');
    await expect(heading).toHaveText('Hello, Sarah!');

    // Clear the input using keyboard
    await input.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    // Should reset to default greeting
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab to the input field
    await page.keyboard.press('Tab');

    const input = page.locator('.hello-world__input');
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Frank');

    const heading = page.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, Frank!');
  });

  test('should have proper ARIA attributes for accessibility', async ({ page }) => {
    await page.goto('/');

    // Check section has proper ARIA attributes
    const section = page.locator('section[role="region"]');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Check input has proper ARIA attributes
    const input = page.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should display helper text', async ({ page }) => {
    await page.goto('/');

    const description = page.locator('.hello-world__description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to personalize the greeting');
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.locator('.hello-world')).toBeVisible();
    await expect(page.locator('.hello-world__heading')).toBeVisible();
    await expect(page.locator('.hello-world__input')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.hello-world')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.hello-world')).toBeVisible();
  });

  test('should handle special characters in input', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__heading');

    // Type name with special characters
    await input.fill("O'Brien");
    await expect(heading).toHaveText("Hello, O'Brien!");

    await input.fill('José');
    await expect(heading).toHaveText('Hello, José!');
  });

  test('should handle long names gracefully', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('.hello-world__input');
    const heading = page.locator('.hello-world__heading');

    const longName = 'Christopher Alexander Montgomery';
    await input.fill(longName);
    await expect(heading).toHaveText(`Hello, ${longName}!`);
  });
});