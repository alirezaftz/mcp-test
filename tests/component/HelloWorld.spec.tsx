import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render with all props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Welcome"
        placeholder="Enter your name"
        greeting="Hi"
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome');
    
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello World greeting section"]')).toBeVisible();
  });

  test('should have accessible input field with label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Enter your name:');

    const input = component.locator('input#name-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should accept text input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('John');
    
    await expect(input).toHaveValue('John');
  });

  test('should display greeting when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        greeting="Welcome"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Alice');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Welcome, Alice!');
  });

  test('should not display greeting when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        greeting="Hi"
      />
    );

    const input = component.locator('.hello-world__input');
    
    await input.fill('Bob');
    let greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hi, Bob!');

    await input.fill('Robert');
    await expect(greeting).toHaveText('Hi, Robert!');
  });

  test('should clear greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Charlie');

    let greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();

    await input.clear();
    await expect(greeting).not.toBeVisible();
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should use custom placeholder when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        placeholder="What's your name?"
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', "What's your name?");
  });

  test('should use default greeting text when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('David');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, David!');
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-container')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should have ARIA live region for greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Emily');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    await input.focus();
    await expect(input).toBeFocused();

    await page.keyboard.type('Frank');
    await expect(input).toHaveValue('Frank');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Frank!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('José García-López');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, José García-López!');
  });

  test('should handle very long input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const longName = 'A'.repeat(100);
    const input = component.locator('.hello-world__input');
    await input.fill(longName);

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText(`Hello, ${longName}!`);
  });
});