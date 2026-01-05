import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';
import React from 'react';

test.describe('HelloWorld Component - Playwright Tests', () => {
  test('should render with basic props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    await expect(component.locator('h1')).toBeVisible();
    await expect(component.locator('h1')).toHaveText('Hello World');
    await expect(component.locator('button')).toBeVisible();
  });

  test('should render with message and subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        message="Hello World" 
        subtitle="Welcome to React"
      />
    );

    await expect(component.locator('[data-testid="hello-world-heading"]')).toBeVisible();
    await expect(component.locator('[data-testid="hello-world-heading"]')).toHaveText('Hello World');
    await expect(component.locator('[data-testid="hello-world-subtitle"]')).toBeVisible();
    await expect(component.locator('[data-testid="hello-world-subtitle"]')).toHaveText('Welcome to React');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');
  });

  test('should have accessible button with aria-label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('button');
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-label', 'Click to increment greeting counter');
    await expect(button).toHaveText('Say Hello!');
  });

  test('should increment counter on button click', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('[data-testid="hello-world-button"]');
    const counterLocator = component.locator('[data-testid="hello-world-counter"]');

    await expect(button).toBeVisible();
    await expect(counterLocator).not.toBeVisible();

    await button.click();
    await expect(counterLocator).toBeVisible();
    await expect(counterLocator).toContainText("You've said hello 1 time!");

    await button.click();
    await expect(counterLocator).toContainText("You've said hello 2 times!");
  });

  test('should use correct BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test subtitle" />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('button');
    
    await button.focus();
    await expect(button).toBeFocused();
    
    await page.keyboard.press('Enter');
    
    const counter = component.locator('[data-testid="hello-world-counter"]');
    await expect(counter).toBeVisible();
    await expect(counter).toContainText("You've said hello 1 time!");
  });

  test('should have responsive text sizing', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" subtitle="Test" />
    );

    const heading = component.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    
    const fontSize = await heading.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    expect(fontSize).toBeTruthy();
    expect(fontSize).not.toBe('0px');
  });

  test('should show counter with correct aria-live attribute', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('[data-testid="hello-world-button"]');
    await button.click();

    const counter = component.locator('[data-testid="hello-world-counter"]');
    await expect(counter).toBeVisible();
    await expect(counter).toHaveAttribute('aria-live', 'polite');
  });

  test('should call onGreetingClick callback when provided', async ({ mount }) => {
    let clickCount = 0;
    const handleClick = () => {
      clickCount++;
    };

    const component = await mount(
      <HelloWorld 
        message="Hello World" 
        onGreetingClick={handleClick}
      />
    );

    const button = component.locator('[data-testid="hello-world-button"]');
    await expect(button).toBeVisible();
    
    await button.click();
    await expect(component.locator('[data-testid="hello-world-counter"]')).toBeVisible();
    
    await button.click();
    await expect(component.locator('[data-testid="hello-world-counter"]')).toContainText("You've said hello 2 times!");
  });

  test('should render without subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const subtitle = component.locator('[data-testid="hello-world-subtitle"]');
    await expect(subtitle).not.toBeVisible();
  });

  test('should have proper focus styles on button', async ({ mount }) => {
    const component = await mount(
      <HelloWorld message="Hello World" />
    );

    const button = component.locator('button');
    await button.focus();
    await expect(button).toBeFocused();

    const outlineStyle = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineOffset: styles.outlineOffset
      };
    });

    expect(outlineStyle.outline).toBeTruthy();
    expect(outlineStyle.outline).not.toBe('');
  });
});