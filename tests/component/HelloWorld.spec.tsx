import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render the hello world heading', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const heading = component.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello World');
  });

  test('should render with proper semantic HTML and ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify main element
    const mainElement = component.locator('main[role="main"]');
    await expect(mainElement).toBeVisible();

    // Verify section with proper ARIA attributes
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world content section');
  });

  test('should render text input field with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Type something...');
    await expect(input).toHaveAttribute('aria-label', 'Text input field for user message');
  });

  test('should have accessible label for input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter your message:');
    await expect(label).toHaveAttribute('for', 'user-input');

    const input = component.locator('#user-input');
    await expect(input).toBeVisible();
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await input.fill('Hello, Playwright!');

    await expect(input).toHaveValue('Hello, Playwright!');
  });

  test('should display output message when text is entered', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await input.fill('Test Message');

    const output = component.locator('.hello-world__output');
    await expect(output).toBeVisible();

    const outputText = component.locator('.hello-world__output-text');
    await expect(outputText).toContainText('You entered:');

    const outputValue = component.locator('.hello-world__output-value');
    await expect(outputValue).toHaveText('Test Message');
  });

  test('should not display output when input is empty', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const output = component.locator('.hello-world__output');
    await expect(output).not.toBeVisible();
  });

  test('should update output dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const outputValue = component.locator('.hello-world__output-value');

    // Type first word
    await input.fill('Hello');
    await expect(outputValue).toHaveText('Hello');

    // Type more text
    await input.fill('Hello World');
    await expect(outputValue).toHaveText('Hello World');

    // Clear input
    await input.fill('');
    const output = component.locator('.hello-world__output');
    await expect(output).not.toBeVisible();
  });

  test('should have proper BEM class naming structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify BEM block class
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify BEM element classes
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should have accessible live region for output', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await input.fill('Accessibility Test');

    const output = component.locator('.hello-world__output');
    await expect(output).toHaveAttribute('role', 'status');
    await expect(output).toHaveAttribute('aria-live', 'polite');
  });

  test('should handle keyboard navigation', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Focus the input using keyboard
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.press('H');
    await input.press('i');
    await expect(input).toHaveValue('Hi');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    await input.fill(specialText);
    
    const outputValue = component.locator('.hello-world__output-value');
    await expect(outputValue).toHaveText(specialText);
  });

  test('should handle long text input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const longText = 'This is a very long text message that should still be handled properly by the component without any issues or breaking the layout.';
    
    await input.fill(longText);
    
    const outputValue = component.locator('.hello-world__output-value');
    await expect(outputValue).toHaveText(longText);
  });
});