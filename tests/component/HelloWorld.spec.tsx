import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify main element with proper role
    await expect(component.locator('main[role="main"]')).toBeVisible();

    // Verify section with proper ARIA attributes
    const section = component.locator('section.hello-world__container');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Verify default greeting text
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should render with custom greeting message', async ({ mount }) => {
    const customGreeting = 'Welcome to our app!';
    const component = await mount(
      <HelloWorld greeting={customGreeting} />
    );

    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText(customGreeting);
  });

  test('should render text input with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify input field exists with proper attributes
    const input = component.locator('input.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('id', 'name-input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
    
    // Verify ARIA attributes
    await expect(input).toHaveAttribute('aria-label', 'Your Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should render input with custom placeholder', async ({ mount }) => {
    const customPlaceholder = 'Type your name here...';
    const component = await mount(
      <HelloWorld placeholder={customPlaceholder} />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should render label with default text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('label.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name');
    await expect(label).toHaveAttribute('for', 'name-input');
  });

  test('should render label with custom text', async ({ mount }) => {
    const customLabel = 'Full Name';
    const component = await mount(
      <HelloWorld inputLabel={customLabel} />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText(customLabel);
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Initial state
    await expect(heading).toHaveText('Hello, World!');

    // Type in the input
    await input.fill('Alice');

    // Verify greeting updates
    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should revert to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type in the input
    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');

    // Clear the input
    await input.fill('');

    // Verify greeting reverts to default
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type only spaces
    await input.fill('   ');

    // Verify greeting stays as default
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type character by character
    await input.pressSequentially('John');

    // Verify final greeting
    await expect(heading).toHaveText('Hello, John!');
  });

  test('should have proper form structure with ARIA label', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const form = component.locator('form.hello-world__form');
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute('aria-label', 'Greeting input form');
  });

  test('should have accessible description for input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('#input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to personalize the greeting');
  });

  test('should have aria-live region for dynamic greeting updates', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveAttribute('aria-live', 'polite');
  });

  test('should prevent default form submission', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const form = component.locator('form.hello-world__form');
    const input = component.locator('.hello-world__input');

    // Fill input
    await input.fill('Test User');

    // Press Enter to submit form (should not navigate or reload)
    await input.press('Enter');

    // Verify form is still visible and greeting is updated
    await expect(form).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, Test User!');
  });

  test('should use BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify BEM block
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify BEM elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__form-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Tab to input (should be focusable)
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.press('H');
    await input.press('i');

    // Verify greeting updates
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, Hi!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type special characters
    await input.fill('José María');

    // Verify greeting handles special characters
    await expect(heading).toHaveText('Hello, José María!');
  });

  test('should handle long input text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    const longName = 'Alexander Christopher Montgomery Wellington III';
    await input.fill(longName);

    await expect(heading).toHaveText(`Hello, ${longName}!`);
  });

  test('should maintain input value after blur and focus', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Type and blur
    await input.fill('Sarah');
    await input.blur();

    // Focus again and verify value persists
    await input.focus();
    await expect(input).toHaveValue('Sarah');
  });
});