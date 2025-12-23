import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render title and subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Enter your name below"
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__subtitle')).toHaveText('Enter your name below');
  });

  test('should not render subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('.hello-world__subtitle')).not.toBeVisible();
  });

  test('should render input field with placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholderText="Type your name"
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type your name');
  });

  test('should display default greeting message', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Hello"
      />
    );

    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hello, World!');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Hello"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Alice');

    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hello, Alice!');
  });

  test('should trim whitespace from input value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Hello"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('  Bob  ');

    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hello, Bob!');
  });

  test('should show clear button when input has value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    await expect(clearButton).not.toBeVisible();

    await input.fill('Test');
    await expect(clearButton).toBeVisible();
  });

  test('should clear input when clear button is clicked', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Hello"
      />
    );

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    await input.fill('Charlie');
    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hello, Charlie!');

    await clearButton.click();
    await expect(input).toHaveValue('');
    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hello, World!');
  });

  test('should hide clear button after clearing input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    await input.fill('Test');
    await clearButton.click();

    await expect(clearButton).not.toBeVisible();
  });

  test('should use custom greeting prefix', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Welcome"
      />
    );

    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Welcome, World!');

    const input = component.locator('.hello-world__input');
    await input.fill('Diana');

    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Welcome, Diana!');
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello world greeting section"]')).toBeVisible();

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');

    const greetingDisplay = component.locator('.hello-world__greeting-display');
    await expect(greetingDisplay).toHaveAttribute('aria-live', 'polite');
    await expect(greetingDisplay).toHaveAttribute('aria-atomic', 'true');

    const clearButton = component.locator('.hello-world__clear-button');
    await input.fill('Test');
    await expect(clearButton).toHaveAttribute('aria-label', 'Clear input field');
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" subtitle="Test subtitle" />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__greeting-display')).toBeVisible();
    await expect(component.locator('.hello-world__greeting-text')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__input-description')).toBeVisible();
  });

  test('should apply visibility modifier class on mount', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    await expect(component.locator('.hello-world--visible')).toBeVisible({ timeout: 1000 });
  });

  test('should accept custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" className="custom-class" />
    );

    await expect(component.locator('.hello-world.custom-class')).toBeVisible();
  });

  test('should have keyboard accessible input field', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    await input.focus();
    await expect(input).toBeFocused();

    await input.press('T');
    await input.press('e');
    await input.press('s');
    await input.press('t');

    await expect(input).toHaveValue('Test');
  });

  test('should handle empty input gracefully', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Hi"
      />
    );

    const input = component.locator('.hello-world__input');
    
    await input.fill('Eve');
    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hi, Eve!');

    await input.fill('');
    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Hi, World!');
  });

  test('should handle input with only whitespace', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        greetingPrefix="Greetings"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('   ');

    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Greetings, World!');
  });
});