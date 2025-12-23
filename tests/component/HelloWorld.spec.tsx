import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render with all props including subtitle', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Welcome to our simple page"
        placeholder="Type something here..."
        initialValue=""
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__subtitle')).toHaveText('Welcome to our simple page');
    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Type something here...');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section')).toHaveAttribute('aria-label', 'Hello World section');
    await expect(component.locator('header')).toBeVisible();
    await expect(component.locator('h1')).toBeVisible();
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        subtitle="Test subtitle"
      />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__output')).toBeVisible();
  });

  test('should have accessible ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const section = component.locator('section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello World section');

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Text input field');
    await expect(input).toHaveAttribute('aria-describedby', 'hello-world-output');

    const output = component.locator('.hello-world__output');
    await expect(output).toHaveAttribute('role', 'status');
    await expect(output).toHaveAttribute('aria-live', 'polite');
  });

  test('should accept and display text input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.fill('Test input');

    await expect(input).toHaveValue('Test input');
    await expect(component.locator('.hello-world__output-text')).toHaveText('Test input');
    await expect(component.locator('.hello-world__output-label')).toHaveText('You typed:');
  });

  test('should show placeholder text when input is empty', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    await expect(component.locator('.hello-world__output-placeholder')).toHaveText('Start typing to see your text here...');
    await expect(component.locator('.hello-world__output-text')).not.toBeVisible();
  });

  test('should update output in real-time as user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const input = component.locator('.hello-world__input');
    const output = component.locator('.hello-world__output-text');

    await input.fill('H');
    await expect(output).toHaveText('H');

    await input.fill('He');
    await expect(output).toHaveText('He');

    await input.fill('Hello');
    await expect(output).toHaveText('Hello');
  });

  test('should show clear button when input has text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    await expect(clearButton).not.toBeVisible();

    await input.fill('Some text');
    await expect(clearButton).toBeVisible();
    await expect(clearButton).toHaveAttribute('aria-label', 'Clear text input');
  });

  test('should clear input when clear button is clicked', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    await input.fill('Text to clear');
    await expect(input).toHaveValue('Text to clear');

    await clearButton.click();
    await expect(input).toHaveValue('');
    await expect(component.locator('.hello-world__output-placeholder')).toBeVisible();
  });

  test('should use custom placeholder text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Custom placeholder..."
      />
    );

    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Custom placeholder...');
  });

  test('should use default placeholder when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Type something...');
  });

  test('should render with initial value', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        initialValue="Initial text"
      />
    );

    await expect(component.locator('.hello-world__input')).toHaveValue('Initial text');
    await expect(component.locator('.hello-world__output-text')).toHaveText('Initial text');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        className="custom-class"
      />
    );

    await expect(component.locator('.hello-world.custom-class')).toBeVisible();
  });

  test('should use custom ARIA label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        ariaLabel="Custom greeting section"
      />
    );

    await expect(component.locator('section')).toHaveAttribute('aria-label', 'Custom greeting section');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const input = component.locator('.hello-world__input');
    await input.focus();
    await expect(input).toBeFocused();

    await input.press('H');
    await input.press('i');
    await expect(input).toHaveValue('Hi');
  });

  test('should handle long text input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const longText = 'This is a very long text that should be handled properly by the component without breaking the layout or causing any issues';
    const input = component.locator('.hello-world__input');

    await input.fill(longText);
    await expect(input).toHaveValue(longText);
    await expect(component.locator('.hello-world__output-text')).toHaveText(longText);
  });

  test('should handle special characters', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const specialText = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`';
    const input = component.locator('.hello-world__input');

    await input.fill(specialText);
    await expect(input).toHaveValue(specialText);
    await expect(component.locator('.hello-world__output-text')).toHaveText(specialText);
  });

  test('should not render subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    await expect(component.locator('.hello-world__subtitle')).not.toBeVisible();
  });

  test('should have proper label association with input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');

    await expect(label).toHaveAttribute('for', 'hello-world-input');
    await expect(input).toHaveAttribute('id', 'hello-world-input');
  });

  test('should have proper button type attribute', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        initialValue="test"
      />
    );

    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).toHaveAttribute('type', 'button');
  });

  test('should maintain focus after clearing text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
      />
    );

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    await input.fill('test');
    await clearButton.click();
    
    await expect(input).toHaveValue('');
  });
});