import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__label')).toHaveText('Enter your name');
  });

  test('should render with all props including optional subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Welcome to our app"
        inputLabel="Enter your name"
        inputPlaceholder="Type here..."
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__subtitle')).toHaveText('Welcome to our app');
    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should not render subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    await expect(component.locator('.hello-world__subtitle')).not.toBeVisible();
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello World page section');
  });

  test('should have accessible input field', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('#hello-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Enter your name');
    await expect(input).toHaveAttribute('aria-describedby', 'hello-input-description');
    
    const label = component.locator('label[for="hello-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter your name');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('John Doe');
    
    await expect(input).toHaveValue('John Doe');
  });

  test('should show greeting message when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Alice');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    
    const greetingText = component.locator('.hello-world__greeting-text');
    await expect(greetingText).toContainText('Hello, Alice! Nice to meet you!');
  });

  test('should not show greeting message when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();
  });

  test('should have clear button with proper ARIA label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Bob');

    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).toBeVisible();
    await expect(clearButton).toHaveAttribute('aria-label', 'Clear input field');
    await expect(clearButton).toHaveText('Clear');
  });

  test('should clear input when clear button is clicked', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Charlie');
    await expect(input).toHaveValue('Charlie');

    const clearButton = component.locator('.hello-world__clear-button');
    await clearButton.click();

    await expect(input).toHaveValue('');
  });

  test('should hide greeting after clearing input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('David');

    let greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();

    const clearButton = component.locator('.hello-world__clear-button');
    await clearButton.click();

    greeting = component.locator('.hello-world__greeting');
    await expect(greeting).not.toBeVisible();
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should support custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
        className="custom-class"
      />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should have accessible live region for greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Emma');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    
    await input.focus();
    await page.keyboard.type('Frank');
    await expect(input).toHaveValue('Frank');

    await page.keyboard.press('Tab');
    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('');
  });

  test('should handle multiple input changes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    
    await input.fill('Grace');
    await expect(component.locator('.hello-world__greeting-text')).toContainText('Hello, Grace!');

    await input.fill('Henry');
    await expect(component.locator('.hello-world__greeting-text')).toContainText('Hello, Henry!');

    await input.fill('Iris');
    await expect(component.locator('.hello-world__greeting-text')).toContainText('Hello, Iris!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    const specialName = "O'Brien-Smith 123!";
    
    await input.fill(specialName);
    await expect(input).toHaveValue(specialName);
    await expect(component.locator('.hello-world__greeting-text')).toContainText(`Hello, ${specialName}!`);
  });

  test('should render description text for input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        inputLabel="Enter your name"
      />
    );

    const description = component.locator('#hello-input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });
});