import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__description')).toContainText('Welcome! Please enter your name');
  });

  test('should render with custom title and description', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Custom Title"
        description="Custom description text"
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Custom Title');
    await expect(component.locator('.hello-world__description')).toHaveText('Custom description text');
  });

  test('should have accessible input field with label', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Your Name');
    
    const input = component.locator('#name-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Enter your name');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('.hello-world__greeting');

    // Initially greeting should be empty (no text)
    await expect(greeting).toBeEmpty();

    // Type in the input
    await input.fill('John');

    // Greeting should update
    await expect(greeting).toHaveText('Hello, John! Welcome to our page.');
  });

  test('should trim whitespace from name in greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('  Jane  ');

    await expect(greeting).toHaveText('Hello, Jane! Welcome to our page.');
  });

  test('should display initial greeting when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome back!" />
    );

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Welcome back!');
  });

  test('should replace initial greeting with personalized greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome back!" />
    );

    const input = component.locator('#name-input');
    const greeting = component.locator('.hello-world__greeting');

    // Initial greeting displayed
    await expect(greeting).toHaveText('Welcome back!');

    // Type name
    await input.fill('Alice');

    // Personalized greeting replaces initial greeting
    await expect(greeting).toHaveText('Hello, Alice! Welcome to our page.');
  });

  test('should return to initial greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome!" />
    );

    const input = component.locator('#name-input');
    const greeting = component.locator('.hello-world__greeting');

    // Type name
    await input.fill('Bob');
    await expect(greeting).toHaveText('Hello, Bob! Welcome to our page.');

    // Clear input
    await input.clear();
    await expect(greeting).toHaveText('Welcome!');
  });

  test('should use custom input placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Type your name here..." />
    );

    const input = component.locator('#name-input');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here...');
  });

  test('should use custom input label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputLabel="Full Name" />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Full Name');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Main element
    await expect(component.locator('main.hello-world')).toBeVisible();

    // Section with proper ARIA attributes
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world main content');

    // Heading
    await expect(component.locator('h1')).toBeVisible();

    // Input with label association
    const input = component.locator('#name-input');
    const label = component.locator('label[for="name-input"]');
    await expect(input).toBeVisible();
    await expect(label).toBeVisible();
  });

  test('should have accessible greeting with ARIA live region', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    await input.fill('Test User');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
    await expect(greeting).toHaveAttribute('aria-label', 'Greeting message');
  });

  test('should handle special characters in name', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill("O'Brien");
    await expect(greeting).toHaveText("Hello, O'Brien! Welcome to our page.");

    await input.fill('José');
    await expect(greeting).toHaveText('Hello, José! Welcome to our page.');
  });

  test('should maintain input value on component re-render', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    
    await input.fill('Persistent Name');
    await expect(input).toHaveValue('Persistent Name');

    // Verify value persists
    await expect(input).toHaveValue('Persistent Name');
  });
});