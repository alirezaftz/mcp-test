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

    const section = component.locator('role=region[name="Hello World section"]');
    await expect(section).toBeVisible();
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello World');
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
    
    // Wait for React state update to complete
    await component.page().waitForTimeout(50);

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    const greetingText = greeting.locator('.hello-world__greeting-text');
    await expect(greetingText).toBeVisible();
    await expect(greetingText).toContainText('Hello, Alice!');
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
    await expect(greeting).toHaveCount(0);
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

    // Initially button should not exist
    await expect(clearButton).toHaveCount(0);

    await input.fill('Bob');
    
    // Wait for React state update
    await component.page().waitForTimeout(50);
    
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

    // Wait for button to appear
    await component.page().waitForTimeout(50);

    const clearButton = component.locator('role=button[name="Clear input field"]');
    await clearButton.click();

    // Wait for state update
    await component.page().waitForTimeout(50);

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

    // Wait for elements to appear
    await component.page().waitForTimeout(50);

    const greeting = component.locator('.hello-world__greeting');
    const clearButton = component.locator('role=button[name="Clear input field"]');

    await expect(greeting).toBeVisible();
    await expect(clearButton).toBeVisible();

    await clearButton.click();

    // Wait for state update
    await component.page().waitForTimeout(50);

    await expect(greeting).toHaveCount(0);
    await expect(clearButton).toHaveCount(0);
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
    const greetingText = greeting.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText('Hello, Eve!');
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

    // Wait for greeting to appear
    await component.page().waitForTimeout(50);

    const greetingContainer = component.locator('.hello-world__greeting');
    await expect(greetingContainer).toBeVisible();
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
    
    // Wait for the animation class to be applied (useEffect with 10ms delay)
    await component.page().waitForTimeout(100);
    
    await expect(section).toHaveClass(/hello-world--visible/);
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

    // Wait for component to fully render
    await component.page().waitForTimeout(50);

    const clearButton = component.locator('role=button[name="Clear input field"]');
    await expect(clearButton).toBeVisible();
    await clearButton.focus();
    await page.keyboard.press('Enter');

    // Wait for state update
    await component.page().waitForTimeout(50);

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