import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with title prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render with custom title', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Welcome to React" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome to React');
  });

  test('should have semantic section element with ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Test" />
    );

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world section');
    await expect(section).toHaveClass(/hello-world/);
  });

  test('should render text input with correct attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        placeholder="Enter your name..."
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have accessible label associated with input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(label).toHaveText('Enter your name:');
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type something...');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('John');
    await expect(input).toHaveValue('John');
  });

  test('should display greeting when user enters name', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        greeting="Hello"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Alice');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toContainText('Hello, Alice!');
  });

  test('should display custom greeting prefix', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Hello World"
        greeting="Welcome"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Bob');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toContainText('Welcome, Bob!');
  });

  test('should use default greeting when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Charlie');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toContainText('Hello, Charlie!');
  });

  test('should highlight user name in greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Diana');

    const greetingName = component.locator('.hello-world__greeting-name');
    await expect(greetingName).toBeVisible();
    await expect(greetingName).toHaveText('Diana');
  });

  test('should show hint text when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const hint = component.locator('.hello-world__hint');
    await expect(hint).toBeVisible();
    await expect(hint).toHaveText('Type your name above to see a personalized greeting');
  });

  test('should hide hint text when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Eve');

    const hint = component.locator('.hello-world__hint');
    await expect(hint).not.toBeVisible();
  });

  test('should render clear button when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Frank');

    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).toBeVisible();
    await expect(clearButton).toHaveText('Clear');
    await expect(clearButton).toHaveAttribute('aria-label', 'Clear input field');
  });

  test('should not render clear button when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).not.toBeVisible();
  });

  test('should clear input when clear button is clicked', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Grace');
    await expect(input).toHaveValue('Grace');

    const clearButton = component.locator('.hello-world__clear-button');
    await clearButton.click();

    await expect(input).toHaveValue('');
    await expect(clearButton).not.toBeVisible();
  });

  test('should apply visibility animation class', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should apply custom className when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" className="custom-class" />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should handle multiple input changes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('Henry');
    await expect(greeting).toContainText('Hello, Henry!');

    await input.fill('Isabel');
    await expect(greeting).toContainText('Hello, Isabel!');

    await input.fill('Jack');
    await expect(greeting).toContainText('Hello, Jack!');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();
    
    await page.keyboard.type('Keyboard');
    await expect(input).toHaveValue('Keyboard');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toContainText('Hello, Keyboard!');
  });

  test('should follow BEM naming convention for all classes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__hint')).toBeVisible();
  });
});