import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should render with custom greeting text', async ({ mount }) => {
    const customGreeting = 'Welcome to React';
    const component = await mount(
      <HelloWorld initialGreeting={customGreeting} />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText(customGreeting);
  });

  test('should render with custom input placeholder', async ({ mount }) => {
    const customPlaceholder = 'Type your name here...';
    const component = await mount(
      <HelloWorld inputPlaceholder={customPlaceholder} />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should render with custom input label', async ({ mount }) => {
    const customLabel = 'Full Name';
    const component = await mount(
      <HelloWorld inputLabel={customLabel} />
    );

    await expect(component.locator('.hello-world__label')).toHaveText(customLabel);
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');

    await input.fill('John Doe');
    await expect(input).toHaveValue('John Doe');
  });

  test('should display personalized greeting when input has value', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');

    await input.fill('Alice');

    const output = component.locator('.hello-world__output');
    await expect(output).toBeVisible();
    await expect(output).toContainText('Hello, Alice!');
  });

  test('should not display output when input is empty', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const output = component.locator('.hello-world__output');
    await expect(output).not.toBeVisible();
  });

  test('should update output dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');
    const output = component.locator('.hello-world__output');

    await input.fill('B');
    await expect(output).toContainText('Hello, B!');

    await input.fill('Bob');
    await expect(output).toContainText('Hello, Bob!');
  });

  test('should hide output when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');
    const output = component.locator('.hello-world__output');

    await input.fill('Charlie');
    await expect(output).toBeVisible();

    await input.fill('');
    await expect(output).not.toBeVisible();
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello World greeting section"]')).toBeVisible();
    
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Your Name');
  });

  test('should have accessible label for input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');

    const input = component.locator('#name-input');
    await expect(input).toBeVisible();
  });

  test('should display output with proper ARIA live region', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');

    await input.fill('David');

    const output = component.locator('.hello-world__output');
    await expect(output).toHaveAttribute('role', 'status');
    await expect(output).toHaveAttribute('aria-live', 'polite');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');

    await input.fill('María José');
    await expect(component.locator('.hello-world__output')).toContainText('Hello, María José!');
  });

  test('should handle long names in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');

    const longName = 'Alexander Christopher Montgomery';
    await input.fill(longName);
    await expect(component.locator('.hello-world__output')).toContainText(`Hello, ${longName}!`);
  });

  test('should have proper BEM class structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);
    const input = component.locator('.hello-world__input');

    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    await page.keyboard.type('Keyboard User');
    await expect(input).toHaveValue('Keyboard User');
  });
});