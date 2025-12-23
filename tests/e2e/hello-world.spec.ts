import { test, expect } from '@playwright/test';

test.describe('HelloWorld Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle('Hello World App');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display default greeting message', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have visible and functional text input', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
  });

  test('should update greeting when user types in input', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input.hello-world__input');
    const heading = page.locator('h1.hello-world__heading');
    
    await input.fill('E2E Test User');
    await expect(heading).toHaveText('Hello, E2E Test User!');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input.hello-world__input');
    
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();
    
    await page.keyboard.type('Keyboard User');
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Keyboard User!');
  });

  test('should have proper page structure and accessibility', async ({ page }) => {
    await page.goto('/');
    
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible();
    
    const section = page.locator('section[role="region"]');
    await expect(section).toBeVisible();
    
    const label = page.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
  });

  test('should handle rapid input changes', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input.hello-world__input');
    const heading = page.locator('h1.hello-world__heading');
    
    await input.fill('A');
    await expect(heading).toHaveText('Hello, A!');
    
    await input.fill('AB');
    await expect(heading).toHaveText('Hello, AB!');
    
    await input.fill('ABC');
    await expect(heading).toHaveText('Hello, ABC!');
  });

  test('should reset to default when input is cleared', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input.hello-world__input');
    const heading = page.locator('h1.hello-world__heading');
    
    await input.fill('Test User');
    await expect(heading).toHaveText('Hello, Test User!');
    
    await input.clear();
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
    
    const input = page.locator('input.hello-world__input');
    await expect(input).toBeVisible();
    
    await input.fill('Mobile User');
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Mobile User!');
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
    
    const input = page.locator('input.hello-world__input');
    await input.fill('Tablet User');
    
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Tablet User!');
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const container = page.locator('.hello-world__container');
    await expect(container).toBeVisible();
    
    const input = page.locator('input.hello-world__input');
    await input.fill('Desktop User');
    
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toHaveText('Hello, Desktop User!');
  });
});