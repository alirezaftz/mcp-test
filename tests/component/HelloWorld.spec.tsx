import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with all required elements', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    // Verify section with proper ARIA attributes
    const section = component.locator('section.hello-world[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello World page section');

    // Verify title is rendered
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello World');

    // Verify form exists with ARIA label
    const form = component.locator('.hello-world__form');
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute('aria-label', 'Greeting form');

    // Verify input field exists with label
    const label = component.locator('label.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name:');

    const input = component.locator('input.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');

    // Verify button exists with ARIA label
    const button = component.locator('button.hello-world__button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Greet');
    await expect(button).toHaveAttribute('aria-label', 'Submit greeting button');
  });

  test('should use default placeholder and button text when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Test Title" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Enter text...');

    const button = component.locator('.hello-world__button');
    await expect(button).toHaveText('Submit');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    const input = component.locator('.hello-world__input');
    
    await input.fill('Alice');
    await expect(input).toHaveValue('Alice');

    await input.fill('Bob Smith');
    await expect(input).toHaveValue('Bob Smith');
  });

  test('should display greeting when form is submitted with a name', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');

    // Initially, greeting should not be visible
    let greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();

    // Fill input and submit
    await input.fill('Alice');
    await button.click();

    // Greeting should now be visible with correct text
    greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Alice!');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should display default greeting when form is submitted with empty input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    const button = component.locator('.hello-world__button');

    // Submit form with empty input
    await button.click();

    // Should display default greeting
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should display default greeting when form is submitted with whitespace only', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');

    // Fill with whitespace and submit
    await input.fill('   ');
    await button.click();

    // Should display default greeting
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should update greeting when submitted multiple times', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const greeting = component.locator('.hello-world__greeting');

    // First submission
    await input.fill('Alice');
    await button.click();
    await expect(greeting).toHaveText('Hello, Alice!');

    // Second submission with different name
    await input.fill('Bob');
    await button.click();
    await expect(greeting).toHaveText('Hello, Bob!');

    // Third submission with empty input
    await input.fill('');
    await button.click();
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');

    // Tab to input field
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Type in input
    await page.keyboard.type('Charlie');
    await expect(input).toHaveValue('Charlie');

    // Tab to button
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();

    // Press Enter to submit
    await page.keyboard.press('Enter');

    // Verify greeting appears
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, Charlie!');
  });

  test('should have proper BEM class naming structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    // Verify BEM block
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify BEM elements
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });

  test('should have accessible form structure with label-input association', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        buttonText="Greet"
      />
    );

    // Verify label is associated with input via 'for' attribute
    const label = component.locator('label.hello-world__label');
    await expect(label).toHaveAttribute('for', 'name-input');

    const input = component.locator('input#name-input');
    await expect(input).toBeVisible();
  });
});