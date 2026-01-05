import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render the component with title', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    await expect(component.locator('role=region[name="Hello World section"]')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render text input with correct attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name here..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here...');
    await expect(input).toHaveAttribute('aria-label', 'Text input field for name');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await input.fill('John Doe');
    await expect(input).toHaveValue('John Doe');
  });

  test('should display greeting when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await input.fill('Alice');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting.locator('.hello-world__greeting-text')).toContainText('Hello, Alice!');
  });

  test('should not display greeting when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();
  });

  test('should display clear button when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    const clearButton = component.locator('role=button[name="Clear input field"]');

    await expect(clearButton).not.toBeVisible();

    await input.fill('Bob');
    await expect(clearButton).toBeVisible();
  });

  test('should clear input when clear button is clicked', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await input.fill('Charlie');
    await expect(input).toHaveValue('Charlie');

    const clearButton = component.locator('role=button[name="Clear input field"]');
    await clearButton.click();

    await expect(input).toHaveValue('');
  });

  test('should hide greeting and clear button after clearing input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await input.fill('Diana');

    const greeting = component.locator('.hello-world__greeting');
    const clearButton = component.locator('role=button[name="Clear input field"]');

    await expect(greeting).toBeVisible();
    await expect(clearButton).toBeVisible();

    await clearButton.click();

    await expect(greeting).not.toBeVisible();
    await expect(clearButton).not.toBeVisible();
  });

  test('should render with initial value prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue="Eve"
      />
    );

    const input = component.locator('#name-input');
    await expect(input).toHaveValue('Eve');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting.locator('.hello-world__greeting-text')).toContainText('Hello, Eve!');
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const section = component.locator('section.hello-world');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello World section');

    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter your name:');

    const input = component.locator('#name-input');
    await expect(input).toHaveAttribute('aria-label', 'Text input field for name');
  });

  test('should display live region for greeting with aria-live', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await input.fill('Frank');

    const greetingContainer = component.locator('.hello-world__greeting');
    await expect(greetingContainer).toHaveAttribute('role', 'status');
    await expect(greetingContainer).toHaveAttribute('aria-live', 'polite');
  });

  test('should apply visibility class after mount', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const section = component.locator('section.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/, { timeout: 1000 });
  });

  test('should handle keyboard navigation for input', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    );

    const input = component.locator('#name-input');
    await input.focus();
    await page.keyboard.type('Grace');
    await expect(input).toHaveValue('Grace');
  });

  test('should handle keyboard interaction for clear button', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue="Henry"
      />
    );

    const clearButton = component.locator('role=button[name="Clear input field"]');
    await clearButton.focus();
    await page.keyboard.press('Enter');

    const input = component.locator('#name-input');
    await expect(input).toHaveValue('');
  });

  test('should apply custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
        className="custom-class"
      />
    );

    const section = component.locator('section.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });
});