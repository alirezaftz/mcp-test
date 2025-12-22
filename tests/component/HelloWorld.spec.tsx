import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify component is visible
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Verify default greeting message
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, World!');
  });

  test('should render with custom initial message', async ({ mount }) => {
    const customMessage = 'Welcome to our app!';
    const component = await mount(
      <HelloWorld initialMessage={customMessage} />
    );

    await expect(component.locator('.hello-world__title')).toHaveText(customMessage);
  });

  test('should render text input with default placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Verify input is visible
    await expect(input).toBeVisible();
    
    // Verify default placeholder
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should render text input with custom placeholder', async ({ mount }) => {
    const customPlaceholder = 'Type your name here';
    const component = await mount(
      <HelloWorld placeholder={customPlaceholder} />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should update greeting when name is entered', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Initially shows default message
    await expect(title).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');

    // Greeting should update
    await expect(title).toHaveText('Hello, Alice!');
  });

  test('should handle multiple name changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // First name
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');

    // Second name
    await input.fill('Charlie');
    await expect(title).toHaveText('Hello, Charlie!');

    // Third name
    await input.fill('Diana');
    await expect(title).toHaveText('Hello, Diana!');
  });

  test('should show default message when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Enter a name
    await input.fill('Eve');
    await expect(title).toHaveText('Hello, Eve!');

    // Clear the input
    await input.fill('');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should trim whitespace from names', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Enter name with leading/trailing spaces
    await input.fill('  Frank  ');
    await expect(title).toHaveText('Hello, Frank!');
  });

  test('should show default message for whitespace-only input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Enter only spaces
    await input.fill('   ');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Section has role and aria-label
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Input has aria-label and aria-describedby
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Enter your name');
    await expect(input).toHaveAttribute('aria-describedby', 'name-description');

    // Label is associated with input
    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();

    // Description exists
    const description = component.locator('#name-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to personalize the greeting');
  });

  test('should have correct BEM class structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Block
    await expect(component.locator('.hello-world')).toBeVisible();

    // Elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Input should be focusable
    await input.focus();
    await expect(input).toBeFocused();

    // Should be able to type with keyboard
    await input.pressSequentially('Grace');
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, Grace!');
  });

  test('should handle long names gracefully', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    const longName = 'Christopher Alexander Montgomery Wellington';
    await input.fill(longName);
    await expect(title).toHaveText(`Hello, ${longName}!`);
    await expect(title).toBeVisible();
  });

  test('should handle special characters in names', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Name with special characters
    const specialName = "O'Brien-Smith";
    await input.fill(specialName);
    await expect(title).toHaveText(`Hello, ${specialName}!`);
  });
});