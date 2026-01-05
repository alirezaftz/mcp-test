import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Wait for component to be visible
    await expect(component).toBeVisible();

    // Test default greeting is displayed
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
    
    // Test semantic HTML and ARIA attributes
    await expect(component.locator('main.hello-world')).toBeVisible();
    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello world greeting section"]')).toBeVisible();
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome to our app!" />
    );

    await expect(component).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome to our app!');
  });

  test('should render input with default placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type something...');
  });

  test('should render input with custom placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Enter your name here..." />
    );

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name here...');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Initially shows default greeting
    await expect(heading).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');
    
    // Greeting should update
    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type character by character
    await input.fill('B');
    await expect(heading).toHaveText('Hello, B!');

    await input.fill('Bo');
    await expect(heading).toHaveText('Hello, Bo!');

    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');
  });

  test('should reset to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Hello, World!" />
    );

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type a name
    await input.fill('Charlie');
    await expect(heading).toHaveText('Hello, Charlie!');

    // Clear the input
    await input.clear();
    
    // Should show default greeting again
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type only spaces
    await input.fill('   ');
    
    // Should show default greeting
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have proper accessibility attributes on input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    
    // Check ARIA attributes
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have associated label for input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');
    
    // Label should have correct text
    await expect(label).toHaveText('Enter your name:');
    
    // Label should be associated with input via htmlFor/id
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should display helper description text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const description = component.locator('.hello-world__description');
    
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to personalize the greeting');
    await expect(description).toHaveAttribute('id', 'input-description');
  });

  test('should use BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    // Check BEM class structure
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should accept custom className', async ({ mount }) => {
    const component = await mount(
      <HelloWorld className="custom-class" />
    );

    await expect(component).toBeVisible();
    await expect(component.locator('.hello-world.custom-class')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component).toBeVisible();
    const input = component.locator('.hello-world__input');
    
    // Focus the input using keyboard
    await input.focus();
    
    // Input should be focused
    await expect(input).toBeFocused();
    
    // Should accept keyboard input
    await input.press('KeyD');
    await input.press('KeyA');
    await input.press('KeyV');
    await input.press('KeyE');
    
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, Dave!');
  });
});