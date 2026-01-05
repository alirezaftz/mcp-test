import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

/**
 * Test suite for HelloWorld component
 * 
 * This suite verifies:
 * - Component rendering with all props
 * - Text input functionality
 * - Dynamic greeting display
 * - Clear button functionality
 * - Accessibility attributes
 * - Optional props handling
 */
test.describe('HelloWorld Component Tests', () => {
  test('should render component with all required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Enter your name below"
        placeholder="Type your name here..."
      />
    );

    // Verify section with proper ARIA attributes
    const section = component.locator('section.hello-world');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world page section');

    // Verify title is displayed
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello World');

    // Verify subtitle is displayed
    const subtitle = component.locator('.hello-world__subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toHaveText('Enter your name below');

    // Verify input exists with correct placeholder
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type your name here...');
  });

  test('should render component without optional subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type here..."
      />
    );

    // Verify title is displayed
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello World');

    // Verify subtitle is not rendered
    const subtitle = component.locator('.hello-world__subtitle');
    await expect(subtitle).not.toBeAttached();

    // Verify input still exists
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
  });

  test('should handle text input and update value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();

    // Input should be empty initially
    await expect(input).toHaveValue('');

    // Type text into input
    await input.fill('John');

    // Verify input value updated
    await expect(input).toHaveValue('John');
  });

  test('should display greeting when text is entered', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    const greeting = component.locator('.hello-world__greeting');

    // Greeting should not be visible initially
    await expect(greeting).not.toBeAttached();

    // Type text into input
    await input.fill('Alice');

    // Greeting should now be visible with correct text
    await expect(greeting).toBeVisible();
    
    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toBeVisible();
    await expect(greetingText).toContainText('Hello,');
    
    const greetingName = component.locator('.hello-world__greeting-name');
    await expect(greetingName).toBeVisible();
    await expect(greetingName).toHaveText('Alice');
  });

  test('should show and hide greeting dynamically', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    const greeting = component.locator('.hello-world__greeting');

    // Type text
    await input.fill('Bob');
    await expect(greeting).toBeVisible();

    // Clear text
    await input.clear();
    await expect(greeting).not.toBeAttached();

    // Type again
    await input.fill('Charlie');
    await expect(greeting).toBeVisible();
    
    const greetingName = component.locator('.hello-world__greeting-name');
    await expect(greetingName).toBeVisible();
    await expect(greetingName).toHaveText('Charlie');
  });

  test('should display clear button when text is entered', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    const clearButton = component.locator('.hello-world__clear-button');

    // Clear button should not be visible initially
    await expect(clearButton).not.toBeAttached();

    // Type text into input
    await input.fill('David');

    // Clear button should now be visible
    await expect(clearButton).toBeVisible();
    await expect(clearButton).toHaveAttribute('aria-label', 'Clear input field');
  });

  test('should clear input when clear button is clicked', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    const clearButton = component.locator('.hello-world__clear-button');

    // Type text
    await input.fill('Eve');
    await expect(input).toHaveValue('Eve');
    await expect(clearButton).toBeVisible();

    // Click clear button
    await clearButton.click();

    // Input should be cleared
    await expect(input).toHaveValue('');

    // Clear button should be hidden
    await expect(clearButton).not.toBeAttached();

    // Greeting should be hidden
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeAttached();
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Enter your name"
        placeholder="Type here..."
      />
    );

    // Check section has role and aria-label
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world page section');

    // Check input has proper attributes
    const input = component.locator('input#hello-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Text input for your name');
    await expect(input).toHaveAttribute('type', 'text');

    // Check label is associated with input
    const label = component.locator('label[for="hello-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name:');

    // Type text to show greeting
    await input.fill('Test User');

    // Check greeting has proper ARIA attributes
    const greeting = component.locator('[role="status"]');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveAttribute('aria-live', 'polite');

    // Check clear button has aria-label
    const clearButton = component.locator('button[aria-label="Clear input field"]');
    await expect(clearButton).toBeVisible();
  });

  test('should apply custom className when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        className="custom-class"
      />
    );

    const section = component.locator('section.hello-world');
    await expect(section).toBeVisible();
    await expect(section).toHaveClass(/custom-class/);
    await expect(section).toHaveClass(/hello-world/);
  });

  test('should handle rapid input changes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    const greetingName = component.locator('.hello-world__greeting-name');

    // Rapidly change input values
    await input.fill('A');
    await expect(greetingName).toBeVisible();
    await expect(greetingName).toHaveText('A');

    await input.fill('AB');
    await expect(greetingName).toHaveText('AB');

    await input.fill('ABC');
    await expect(greetingName).toHaveText('ABC');

    await input.fill('ABCD');
    await expect(greetingName).toHaveText('ABCD');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    const greetingName = component.locator('.hello-world__greeting-name');

    // Test with special characters
    const testStrings = [
      'John Doe',
      "O'Brien",
      'José García',
      '李明',
      '123 Test',
      'test@example.com'
    ];

    for (const testString of testStrings) {
      await input.fill(testString);
      await expect(greetingName).toBeVisible();
      await expect(greetingName).toHaveText(testString);
    }
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter text...');
  });

  test('should have proper BEM class naming structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Test subtitle"
      />
    );

    // Verify BEM naming convention
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();

    // Type to show greeting elements
    await input.fill('Test');
    
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
    await expect(component.locator('.hello-world__greeting-text')).toBeVisible();
    await expect(component.locator('.hello-world__greeting-name')).toBeVisible();
    await expect(component.locator('.hello-world__clear-button')).toBeVisible();
  });
});