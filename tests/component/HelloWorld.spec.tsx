import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check main container is visible
    await expect(component.locator('main.hello-world')).toBeVisible();
    
    // Check section has proper ARIA attributes
    const section = component.locator('section.hello-world__container');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello World greeting section');
    
    // Check default greeting
    const title = component.locator('.hello-world__title');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should render with custom initial message', async ({ mount }) => {
    const customMessage = 'Welcome to our app!';
    const component = await mount(
      <HelloWorld initialMessage={customMessage} />
    );

    const title = component.locator('.hello-world__title');
    await expect(title).toHaveText(customMessage);
  });

  test('should have accessible input field with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input#name-input');
    
    // Check input is visible and has proper ARIA label
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('type', 'text');
    
    // Check label is associated with input
    const label = component.locator('label.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input#name-input');
    const title = component.locator('.hello-world__title');

    // Initial state
    await expect(title).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');
    await expect(title).toHaveText('Hello, Alice!');

    // Type another name
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');
  });

  test('should reset to default message when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input#name-input');
    const title = component.locator('.hello-world__title');

    // Type a name
    await input.fill('Charlie');
    await expect(title).toHaveText('Hello, Charlie!');

    // Clear the input
    await input.fill('');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle custom placeholder text', async ({ mount }) => {
    const customPlaceholder = 'Type your name here...';
    const component = await mount(
      <HelloWorld placeholderText={customPlaceholder} />
    );

    const input = component.locator('input#name-input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should apply custom className', async ({ mount }) => {
    const customClass = 'custom-theme';
    const component = await mount(
      <HelloWorld className={customClass} />
    );

    const main = component.locator('main.hello-world');
    await expect(main).toHaveClass(new RegExp(customClass));
  });

  test('should follow BEM naming convention for all elements', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check all BEM class names exist
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should handle whitespace-only input gracefully', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input#name-input');
    const title = component.locator('.hello-world__title');

    // Type whitespace
    await input.fill('   ');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should update greeting in real-time as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input#name-input');
    const title = component.locator('.hello-world__title');

    // Type character by character
    await input.type('Test');
    
    // Should show the complete typed text
    await expect(title).toHaveText('Hello, Test!');
  });
});