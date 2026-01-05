import { test, expect } from '@playwright/test';

test.describe('Hello World Page E2E Tests', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle('Hello World');
    await expect(page.getByRole('main', { name: 'Main application' })).toBeVisible();
  });

  test('should display hello world message', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello World');
  });

  test('should display subtitle', async ({ page }) => {
    await page.goto('/');
    
    const subtitle = page.getByTestId('hello-world-subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('Welcome to your first React + TypeScript application');
  });

  test('should have interactive button', async ({ page }) => {
    await page.goto('/');
    
    const button = page.getByRole('button', { name: 'Get started with the application' });
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

    const button = page.getByTestId('hello-world-button');
    await button.click();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('main.app')).toBeVisible();
    await expect(page.locator('section.hello-world')).toBeVisible();
    await expect(page.getByTestId('hello-world-content')).toBeVisible();
  });

  test('should apply animation class after load', async ({ page }) => {
    await page.goto('/');
    
    const section = page.locator('.hello-world');
    
    // Wait for animation to trigger
    await page.waitForTimeout(50);
    
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    const button = page.getByTestId('hello-world-button');
    await expect(button).toBeFocused();
    
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await page.keyboard.press('Enter');
  });

  test('should be responsive on mobile viewport 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    
    const content = page.getByTestId('hello-world-content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on mobile viewport 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    
    const content = page.getByTestId('hello-world-content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on tablet viewport 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    
    const content = page.getByTestId('hello-world-content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on desktop viewport 1024px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    
    const content = page.getByTestId('hello-world-content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on desktop viewport 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    
    const content = page.getByTestId('hello-world-content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on desktop viewport 1920px', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const heading = page.getByTestId('hello-world-heading');
    await expect(heading).toBeVisible();
    
    const content = page.getByTestId('hello-world-content');
    await expect(content).toBeVisible();
  });

  test('should meet accessibility standards', async ({ page }) => {
    await page.goto('/');
    
    const section = page.getByTestId('hello-world-section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label');
    
    const button = page.getByTestId('hello-world-button');
    await expect(button).toHaveAttribute('aria-label');
    await expect(button).toHaveAttribute('role', 'button');
    
    const main = page.getByRole('main');
    await expect(main).toHaveAttribute('role', 'main');
  });
});