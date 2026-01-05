import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    await expect(component.locator('role=region[name="Hello world greeting section"]')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello World');
  });

  test('should render with message and subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        message="Hello World"
        subtitle="Welcome to your first React + TypeScript application"
      />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__subtitle')).toHaveText('Welcome to your first React + TypeScript application');
  });

  test('should not render subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    await expect(component.locator('.hello-world__subtitle')).not.toBeVisible();
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
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should have accessible button with aria-label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('role=button[name="Get started with the application"]');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Get Started');
    await expect(button).toHaveAttribute('aria-label', 'Get started with the application');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test subtitle" />
    );

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello world greeting section"]')).toBeVisible();
    await expect(component.locator('h1[role="heading"]')).toBeVisible();
  });

  test('should accept custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" className="custom-class" />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('.hello-world__button');
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const section = component.locator('section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    const heading = component.locator('h1');
    await expect(heading).toHaveAttribute('role', 'heading');
    await expect(heading).toHaveAttribute('aria-level', '1');
  });
});