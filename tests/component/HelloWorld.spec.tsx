import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with title and input field', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Name"
      />
    );

    // Verify section with proper ARIA attributes
    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('[aria-label="Hello World section"]')).toBeVisible();

    // Verify title is displayed
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');

    // Verify input field exists and has correct attributes
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
    await expect(input).toHaveAttribute('aria-label', 'Name');
  });

  test('should display greeting when user types in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type something..."
        inputLabel="Name"
      />
    );

    // Initially, greeting should not be visible
    await expect(component.locator('.hello-world__greeting')).not.toBeVisible();

    // Type in the input field
    const input = component.locator('.hello-world__input');
    await input.fill('Alice');

    // Verify greeting appears with correct text
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Alice!');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Name"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    // Type first name
    await input.fill('Bob');
    await expect(greeting).toHaveText('Hello, Bob!');

    // Update to different name
    await input.fill('Charlie');
    await expect(greeting).toHaveText('Hello, Charlie!');

    // Clear input
    await input.fill('');
    await expect(greeting).not.toBeVisible();
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Name"
      />
    );

    // Verify BEM class structure
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-container')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should render label with correct text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Your Name"
      />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name');
    await expect(label).toHaveAttribute('for', 'hello-input');
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Name"
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type something...');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Name"
      />
    );

    const input = component.locator('.hello-world__input');
    
    // Focus the input using keyboard
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.type('KeyboardUser');
    
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, KeyboardUser!');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Name"
      />
    );

    // Verify semantic HTML elements
    await expect(component.locator('section')).toBeVisible();
    await expect(component.locator('h1')).toBeVisible();
    await expect(component.locator('label')).toBeVisible();
    await expect(component.locator('input[type="text"]')).toBeVisible();
  });
});