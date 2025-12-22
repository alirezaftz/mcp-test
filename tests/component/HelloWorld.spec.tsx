import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with all required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="What's your name?"
      />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="What's your name?"
      />
    );

    // Verify semantic section with proper ARIA attributes
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Verify form has proper ARIA label
    const form = component.locator('form');
    await expect(form).toHaveAttribute('aria-label', 'Greeting input form');
  });

  test('should render text input with correct attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Type your name');
    await expect(input).toHaveAttribute('aria-label', 'Your name');
  });

  test('should render label for text input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Enter your name"
      />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter your name');
    await expect(label).toHaveAttribute('for', 'name-input');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Alice');
    await expect(input).toHaveValue('Alice');
  });

  test('should display greeting when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Bob');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Bob!');
  });

  test('should not display greeting when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="Your name"
      />
    );

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('C');
    await expect(greeting).toHaveText('Hello, C!');

    await input.fill('Charlie');
    await expect(greeting).toHaveText('Hello, Charlie!');
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should use default label when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Your input');
  });

  test('should follow BEM naming convention for CSS classes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Your name"
      />
    );

    // Verify BEM block
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify BEM elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should have accessible greeting output with ARIA live region', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Diana');

    const greeting = component.locator('#greeting-output');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should accept custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Your name"
        className="custom-class"
      />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    
    // Focus the input using keyboard navigation
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.press('E');
    await input.press('v');
    await input.press('a');
    
    await expect(input).toHaveValue('Eva');
    
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Eva!');
  });

  test('should prevent default form submission', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        label="Your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Test User');
    
    // Press Enter to submit form
    await input.press('Enter');
    
    // Verify the greeting is still visible (form didn't reload page)
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Test User!');
  });
});