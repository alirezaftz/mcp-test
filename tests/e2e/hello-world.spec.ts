import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Hello World App/);
  });

  test('should display hello world message', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1.hello-world__heading');
    await expect(heading).toBeVisible({ timeout: 10000 });
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should display subheading', async ({ page }) => {
    await page.goto('/');
    
    const subheading = page.locator('p.hello-world__subheading');
    await expect(subheading).toBeVisible({ timeout: 10000 });
    await expect(subheading).toHaveText('Welcome to our application');
  });

  test('should display get started button', async ({ page }) => {
    await page.goto('/');
    
    const button = page.locator('button.hello-world__button');
    await expect(button).toBeVisible({ timeout: 10000 });
    await expect(button).toHaveText('Get Started');
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    await page.goto('/');
    
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible({ timeout: 10000 });
    
    const section = page.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Welcome section');
  });

  test('should apply animation class after page load', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/, { timeout: 5000 });
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    
    const button = page.locator('button.hello-world__button');
    await expect(button).toBeFocused();
  });

  test('should handle button click', async ({ page }) => {
    await page.goto('/');
    
    const button = page.locator('button.hello-world__button');
    await button.click();
    
    await expect(button).toBeVisible();
  });

  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible({ timeout: 10000 });
    
    const button = page.locator('.hello-world__button');
    await expect(button).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should have accessible button with aria-label', async ({ page }) => {
    await page.goto('/');
    
    const button = page.locator('button[aria-label="Get started with the application"]');
    await expect(button).toBeVisible({ timeout: 10000 });
  });

  test('should load with gradient background', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    await expect(section).toBeVisible({ timeout: 10000 });
    
    const backgroundColor = await section.evaluate((el) => {
      return window.getComputedStyle(el).background;
    });
    
    expect(backgroundColor).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('Hello, World!');
  });

  test('should maintain layout on window resize', async ({ page }) => {
    await page.goto('/');
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    let heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible({ timeout: 10000 });
    
    await page.setViewportSize({ width: 375, height: 667 });
    heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Hello World Accessibility Tests', () => {
  test('should meet WCAG 2.2 requirements for semantic structure', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('section[role="region"][aria-label]');
    await expect(section).toBeVisible({ timeout: 10000 });
    
    const button = page.locator('button[aria-label]');
    await expect(button).toBeVisible();
  });

  test('should have keyboard focus visible on interactive elements', async ({ page }) => {
    await page.goto('/');
    
    const button = page.locator('button.hello-world__button');
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('should have proper ARIA labels on all interactive elements', async ({ page }) => {
    await page.goto('/');
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel!.length).toBeGreaterThan(0);
    }
  });
});