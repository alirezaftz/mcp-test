import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    // Verify the component is visible
    await expect(component).toBeVisible();

    // Verify the title is rendered
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render with all props provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Welcome"
        placeholder="Enter your name..."
        greeting="Hi"
      />
    );

    // Verify title is rendered
    await expect(component.locator('.hello-world__title')).toHaveText('Welcome');

    // Verify input has correct placeholder
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    // Verify section with proper ARIA attributes
    const section = component.locator('section.hello-world');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world section with text input');
  });

  test('should have accessible form elements', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    // Verify label is associated with input
    const label = component.locator('.hello-world__label');
    await expect(label).toHaveAttribute('for', 'name-input');

    // Verify input has proper attributes
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('id', 'name-input');
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('aria-label', 'Text input for name');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Type in the input
    await input.fill('John');

    // Verify input value is updated
    await expect(input).toHaveValue('John');
  });

  test('should display greeting when user enters text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        greeting="Welcome"
      />
    );

    const input = component.locator('.hello-world__input');
    
    // Initially, greeting should not be visible
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();

    // Type in the input
    await input.fill('Alice');

    // Verify greeting is now visible
    await expect(greeting).toBeVisible();

    // Verify greeting text contains the user's input
    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText('Welcome, Alice!');
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        greeting="Hello"
      />
    );

    const input = component.locator('.hello-world__input');
    
    // Type first name
    await input.fill('Bob');
    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText('Hello, Bob!');

    // Update to full name
    await input.fill('Bob Smith');
    await expect(greetingText).toContainText('Hello, Bob Smith!');
  });

  test('should hide greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');
    
    // Type in the input
    await input.fill('Charlie');
    await expect(greeting).toBeVisible();

    // Clear the input
    await input.fill('');
    await expect(greeting).not.toBeVisible();
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type something...');
  });

  test('should use default greeting when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Dave');

    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText('Hello, Dave!');
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    // Verify BEM class structure
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should have aria-live region for greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Emma');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('O\'Brien');

    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText("Hello, O'Brien!");
  });

  test('should handle long input values', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const longName = 'Alexander Christopher Benjamin Montgomery III';
    await input.fill(longName);

    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText(`Hello, ${longName}!`);
  });
});