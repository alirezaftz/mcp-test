import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify component is visible
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify title is present
    await expect(component.locator('.hello-world__title')).toHaveText('Welcome');

    // Verify default greeting message
    await expect(component.locator('.hello-world__greeting')).toHaveText('Hello, World!');
  });

  test('should render with custom initial message', async ({ mount }) => {
    const customMessage = 'Welcome to our app!';
    const component = await mount(
      <HelloWorld initialMessage={customMessage} />
    );

    await expect(component.locator('.hello-world__greeting')).toHaveText(customMessage);
  });

  test('should have accessible section with proper ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify section has proper role and aria-label
    const section = component.locator('section.hello-world');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');
  });

  test('should render text input with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify input exists
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();

    // Verify input has proper attributes
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('id', 'name-input');
    await expect(input).toHaveAttribute('aria-label', 'Enter your name to personalize greeting');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should render input with custom placeholder', async ({ mount }) => {
    const customPlaceholder = 'Type your name here';
    const component = await mount(
      <HelloWorld inputPlaceholder={customPlaceholder} />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should have label associated with input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(label).toHaveText('Your Name:');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    // Initial state
    await expect(greeting).toHaveText('Hello, World!');

    // Type name
    await input.fill('Alice');

    // Greeting should update
    await expect(greeting).toHaveText('Hello, Alice!');
  });

  test('should update greeting with different names', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    // Test multiple names
    await input.fill('Bob');
    await expect(greeting).toHaveText('Hello, Bob!');

    await input.fill('Charlie');
    await expect(greeting).toHaveText('Hello, Charlie!');
  });

  test('should revert to default message when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    // Type name
    await input.fill('David');
    await expect(greeting).toHaveText('Hello, David!');

    // Clear input
    await input.clear();
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    // Type whitespace
    await input.fill('   ');
    
    // Should show default message (whitespace is trimmed)
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should have live region for greeting updates', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const greeting = component.locator('.hello-world__greeting');
    
    // Verify ARIA live region attributes
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
    await expect(greeting).toHaveAttribute('aria-atomic', 'true');
  });

  test('should have description for input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
    await expect(description).toHaveAttribute('id', 'greeting-description');

    // Verify input references description
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-description');
  });

  test('should apply custom className when provided', async ({ mount }) => {
    const customClass = 'custom-hello-world';
    const component = await mount(
      <HelloWorld className={customClass} />
    );

    const section = component.locator('section.hello-world');
    await expect(section).toHaveClass(new RegExp(customClass));
  });

  test('should follow BEM naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify BEM class structure exists
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Focus input using keyboard
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.press('H');
    await input.press('e');
    await input.press('l');
    await input.press('l');
    await input.press('o');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Hello!');
  });
});