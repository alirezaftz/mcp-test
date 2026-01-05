import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

/**
 * Component Tests for HelloWorld Component
 * 
 * Tests cover:
 * - Initial rendering with default props
 * - Text input functionality
 * - Dynamic greeting updates
 * - Accessibility attributes
 * - Custom props
 * - Semantic HTML structure
 */
test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify default greeting is displayed
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
    
    // Verify component is visible
    await expect(component.locator('.hello-world')).toBeVisible();
  });

  test('should render text input with default placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify input exists and has correct attributes
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Initially shows default greeting
    await expect(heading).toHaveText('Hello, World!');

    // Type name into input
    await input.fill('Alice');

    // Greeting should update to personalized message
    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should handle multiple input changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type first name
    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');

    // Change to different name
    await input.fill('Charlie');
    await expect(heading).toHaveText('Hello, Charlie!');

    // Clear input - should revert to default
    await input.fill('');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should render with custom props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        greeting="Welcome!"
        placeholder="Type here"
        inputLabel="Full Name"
      />
    );

    // Verify custom greeting
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Welcome!');

    // Verify custom placeholder
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type here');

    // Verify custom label
    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Full Name');
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify section has role and aria-label
    const section = component.locator('.hello-world');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Verify input has aria-label
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Your Name');
    await expect(input).toHaveAttribute('aria-describedby', 'name-input-description');

    // Verify input is associated with label via id
    await expect(input).toHaveAttribute('id', 'name-input');
    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
  });

  test('should use semantic HTML elements', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify section element is used
    const section = component.locator('section.hello-world');
    await expect(section).toBeVisible();

    // Verify h1 heading is used
    const heading = component.locator('h1.hello-world__heading');
    await expect(heading).toBeVisible();

    // Verify label element is used
    const label = component.locator('label.hello-world__label');
    await expect(label).toBeVisible();
  });

  test('should follow BEM naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify block class
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify element classes
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type only spaces
    await input.fill('   ');

    // Should show default greeting (whitespace trimmed)
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should accept additional className prop', async ({ mount }) => {
    const component = await mount(<HelloWorld className="custom-class" />);

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should have input description text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });
});