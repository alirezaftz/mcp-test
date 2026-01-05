import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle('Hello World');
    await expect(page.locator('role=main[name="Main application"]')).toBeVisible();
  });

  test('should display hello world message', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello World');
  });

  test('should display subtitle', async ({ page }) => {
    await page.goto('/');
    
    const subtitle = page.locator('.hello-world__subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('Welcome to your first React + TypeScript application');
  });

  test('should have interactive button', async ({ page }) => {
    await page.goto('/');
    
    const button = page.locator('role=button[name="Get started with the application"]');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Get Started');
  });

  test('should show alert when button is clicked', async ({ page }) => {
    await page.goto('/');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Welcome! This is your Hello World page.');
      await dialog.accept();
    });

    const button = page.locator('.hello-world__button');
    await button.click();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('main.app')).toBeVisible();
    await expect(page.locator('section.hello-world')).toBeVisible();
    await expect(page.locator('.hello-world__content')).toBeVisible();
  });

  test('should apply animation class after load', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    const button = page.locator('.hello-world__button');
    await expect(button).toBeFocused();
    
    await page.keyboard.press('Enter');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    
    const content = page.locator('.hello-world__content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    
    const content = page.locator('.hello-world__content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    const heading = page.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    
    const content = page.locator('.hello-world__content');
    await expect(content).toBeVisible();
  });

  test('should meet accessibility standards', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label');
    
    const button = page.locator('button');
    await expect(button).toHaveAttribute('aria-label');
    
    const main = page.locator('main');
    await expect(main).toHaveAttribute('role', 'main');
  });
});