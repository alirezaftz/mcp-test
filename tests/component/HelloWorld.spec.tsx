import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toHaveText('Hello World');
  });

  test('should render with message and subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        message="Hello World"
        subtitle="Welcome to your first React + TypeScript application"
      />
    );

    await expect(component.getByTestId('hello-world-heading')).toHaveText('Hello World');
    await expect(component.getByTestId('hello-world-subtitle')).toHaveText('Welcome to your first React + TypeScript application');
  });

  test('should not render subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const subtitle = component.locator('[data-testid="hello-world-subtitle"]');
    await expect(subtitle).not.toBeVisible();
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test subtitle" />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });

  test('should apply visibility class after mount', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const section = component.locator('.hello-world');
    
    // Wait for animation to trigger
    await component.page().waitForTimeout(50);
    
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should have accessible button with aria-label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.getByRole('button', { name: 'Get started with the application' });
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Get Started');
    await expect(button).toHaveAttribute('aria-label', 'Get started with the application');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test subtitle" />
    );

    await expect(component.getByRole('region', { name: 'Hello world greeting section' })).toBeVisible();
    await expect(component.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should accept custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" className="custom-class" />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.getByTestId('hello-world-button');
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const section = component.getByTestId('hello-world-section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    const heading = component.getByTestId('hello-world-heading');
    await expect(heading).toHaveAttribute('role', 'heading');
    await expect(heading).toHaveAttribute('aria-level', '1');
  });

  test('should render at mobile viewport 320px', async ({ mount, page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toBeVisible();
  });

  test('should render at mobile viewport 375px', async ({ mount, page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toBeVisible();
  });

  test('should render at tablet viewport 768px', async ({ mount, page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toBeVisible();
  });

  test('should render at desktop viewport 1024px', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toBeVisible();
  });

  test('should render at desktop viewport 1440px', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toBeVisible();
  });

  test('should render at desktop viewport 1920px', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    await expect(component.getByTestId('hello-world-section')).toBeVisible();
    await expect(component.getByTestId('hello-world-heading')).toBeVisible();
  });
});