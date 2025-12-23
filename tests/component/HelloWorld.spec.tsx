import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__title')).toHaveText('Hello, World!');
    await expect(component.locator('.hello-world__title')).toBeVisible();
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome, Guest!" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome, Guest!');
  });

  test('should have accessible form structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check for semantic HTML and ARIA attributes
    await expect(component.locator('main.hello-world')).toBeVisible();
    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello world greeting section"]')).toBeVisible();
    await expect(component.locator('form[aria-label="Greeting customization form"]')).toBeVisible();
  });

  test('should have text input with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
    await expect(input).toHaveAttribute('aria-label', 'Name input field for personalized greeting');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have label associated with input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(label).toHaveText('Personalize your greeting:');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Initially shows default greeting
    await expect(title).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');
    await expect(title).toHaveText('Hello, Alice!');

    // Type a different name
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');
  });

  test('should revert to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type a name
    await input.fill('Charlie');
    await expect(title).toHaveText('Hello, Charlie!');

    // Clear the input
    await input.fill('');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type whitespace
    await input.fill('   ');
    await expect(title).toHaveText('Hello, World!');

    // Type name with leading/trailing whitespace
    await input.fill('  Diana  ');
    await expect(title).toHaveText('Hello, Diana!');
  });

  test('should use custom placeholder when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="What's your name?" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', "What's your name?");
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <HelloWorld className="custom-class" />
    );

    await expect(component.locator('.hello-world.custom-class')).toBeVisible();
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check BEM class structure
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should prevent default form submission', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const form = component.locator('.hello-world__form');
    const input = component.locator('.hello-world__input');

    await input.fill('Test User');
    
    // Press Enter to submit form
    await input.press('Enter');

    // Component should still be visible (form didn't navigate away)
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, Test User!');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Tab to input
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.type('Eve');
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, Eve!');
  });

  test('should have descriptive text for users', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__description');
    
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
    await expect(description).toHaveAttribute('id', 'input-description');
  });

  test('should maintain input value state', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    await input.fill('Frank');
    await expect(input).toHaveValue('Frank');

    await input.fill('Grace');
    await expect(input).toHaveValue('Grace');
  });
});