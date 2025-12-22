import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify main structure is present
    await expect(component.locator('main[role="main"]')).toBeVisible();
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Verify default title
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    
    // Verify default description
    await expect(component.locator('.hello-world__description')).toContainText('Enter your name below');
  });

  test('should render with custom props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Custom Title"
        description="Custom description text"
        placeholder="Type here..."
        inputLabel="Name Field"
        greetingPrefix="Hi, "
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Custom Title');
    await expect(component.locator('.hello-world__description')).toHaveText('Custom description text');
    await expect(component.locator('.hello-world__label')).toHaveText('Name Field');
  });

  test('should have accessible input field with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    
    // Verify input is accessible
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('aria-label', 'Enter your name for personalized greeting');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-output');
    
    // Verify label is associated with input
    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name');
  });

  test('should display placeholder text in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld placeholder="Enter your name..." />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    // Initially shows placeholder message
    await expect(greeting).toHaveText('Your greeting will appear here');
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);

    // Type a name
    await input.fill('Alice');

    // Greeting should update
    await expect(greeting).toHaveText('Hello, Alice!');
    await expect(greeting).not.toHaveClass(/hello-world__greeting--empty/);
  });

  test('should handle multiple input changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    // First name
    await input.fill('Bob');
    await expect(greeting).toHaveText('Hello, Bob!');

    // Change name
    await input.fill('Charlie');
    await expect(greeting).toHaveText('Hello, Charlie!');

    // Clear input
    await input.fill('');
    await expect(greeting).toHaveText('Your greeting will appear here');
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);
  });

  test('should trim whitespace from input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    // Type name with leading/trailing spaces
    await input.fill('  David  ');

    // Greeting should trim whitespace
    await expect(greeting).toHaveText('Hello, David!');
  });

  test('should handle only whitespace input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    // Type only spaces
    await input.fill('   ');

    // Should show placeholder message
    await expect(greeting).toHaveText('Your greeting will appear here');
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);
  });

  test('should use custom greeting prefix', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greetingPrefix="Welcome, " />
    );

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    await input.fill('Emma');
    await expect(greeting).toHaveText('Welcome, Emma!');
  });

  test('should have proper ARIA live region for greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const greeting = component.locator('#greeting-output');

    // Verify ARIA attributes for screen readers
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
    await expect(greeting).toHaveAttribute('aria-atomic', 'true');
  });

  test('should have semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify semantic elements
    await expect(component.locator('main[role="main"]')).toBeVisible();
    await expect(component.locator('h1.hello-world__title')).toBeVisible();
    await expect(component.locator('label[for="name-input"]')).toBeVisible();
  });

  test('should use BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify BEM naming pattern
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
  });

  test('should apply modifier class when greeting is empty', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const greeting = component.locator('.hello-world__greeting');

    // Empty state should have modifier class
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);

    // Type something
    const input = component.locator('#name-input');
    await input.fill('Test');

    // Modifier class should be removed
    await expect(greeting).not.toHaveClass(/hello-world__greeting--empty/);
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');

    // Focus input with keyboard
    await input.focus();
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Keyboard User');
    
    const greeting = component.locator('#greeting-output');
    await expect(greeting).toHaveText('Hello, Keyboard User!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    // Test with special characters
    await input.fill('John O\'Brien');
    await expect(greeting).toHaveText('Hello, John O\'Brien!');

    await input.fill('María José');
    await expect(greeting).toHaveText('Hello, María José!');
  });

  test('should handle long input names', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const greeting = component.locator('#greeting-output');

    const longName = 'Alexander Bartholomew Christopher';
    await input.fill(longName);
    await expect(greeting).toHaveText(`Hello, ${longName}!`);
  });
});