import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check that component is visible
    await expect(component.locator('section[role="region"]')).toBeVisible();
    
    // Check default greeting is displayed
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
    
    // Check input is present with default placeholder
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('should render with custom greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Welcome to React!" />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome to React!');
  });

  test('should render with custom input placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Type your name here" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check semantic section element
    await expect(component.locator('section[role="region"]')).toBeVisible();
    
    // Check form element with proper role
    await expect(component.locator('form[role="form"]')).toBeVisible();
    
    // Check label is associated with input
    const label = component.locator('.hello-world__label');
    await expect(label).toHaveAttribute('for', 'name-input');
    
    const input = component.locator('#name-input');
    await expect(input).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check section has role and aria-label
    const section = component.locator('section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello World section');
    
    // Check form has aria-label
    const form = component.locator('form');
    await expect(form).toHaveAttribute('aria-label', 'Name input form');
    
    // Check input has aria-label
    const input = component.locator('input');
    await expect(input).toHaveAttribute('aria-label', 'Text input for name');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Type into the input
    await input.fill('John Doe');
    
    // Check input value is updated
    await expect(input).toHaveValue('John Doe');
  });

  test('should display personalized greeting when name is entered', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Initially, greeting message should not be visible
    await expect(component.locator('.hello-world__greeting-message')).not.toBeVisible();
    
    // Type a name
    await input.fill('Alice');
    
    // Personalized greeting should appear
    const greetingMessage = component.locator('.hello-world__greeting-message');
    await expect(greetingMessage).toBeVisible();
    await expect(greetingMessage).toHaveText('Hello, Alice!');
  });

  test('should hide personalized greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Type a name
    await input.fill('Bob');
    await expect(component.locator('.hello-world__greeting-message')).toBeVisible();
    
    // Clear the input
    await input.fill('');
    
    // Greeting message should disappear
    await expect(component.locator('.hello-world__greeting-message')).not.toBeVisible();
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check block class
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Check element classes
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should support custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld className="custom-class" />
    );

    const section = component.locator('section');
    await expect(section).toHaveClass(/custom-class/);
    await expect(section).toHaveClass(/hello-world/);
  });

  test('should support custom aria-label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld ariaLabel="Custom greeting section" />
    );

    await expect(component.locator('section')).toHaveAttribute('aria-label', 'Custom greeting section');
  });

  test('should apply visibility modifier class', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('.hello-world');
    
    // Check that visibility modifier is eventually applied
    await expect(section).toHaveClass(/hello-world--visible/, { timeout: 1000 });
  });

  test('should handle form submission without page reload', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const form = component.locator('.hello-world__form');
    
    // Fill input
    await input.fill('Test User');
    
    // Submit form (should not cause any errors)
    await form.evaluate((form) => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    });
    
    // Input value should still be present (no page reload)
    await expect(input).toHaveValue('Test User');
    await expect(component.locator('.hello-world__greeting-message')).toHaveText('Hello, Test User!');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Focus the input using keyboard
    await input.focus();
    
    // Check input is focused
    await expect(input).toBeFocused();
    
    // Type using keyboard
    await input.pressSequentially('Keyboard User');
    
    // Check value updated
    await expect(input).toHaveValue('Keyboard User');
    await expect(component.locator('.hello-world__greeting-message')).toHaveText('Hello, Keyboard User!');
  });

  test('should have responsive design with proper CSS', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('.hello-world');
    
    // Check that essential styling is applied
    await expect(section).toHaveCSS('display', 'flex');
    
    // Check content container exists
    await expect(component.locator('.hello-world__content')).toBeVisible();
  });

  test('should handle empty string input gracefully', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Fill with text
    await input.fill('Test');
    await expect(component.locator('.hello-world__greeting-message')).toBeVisible();
    
    // Clear to empty string
    await input.fill('');
    
    // Greeting should not be visible
    await expect(component.locator('.hello-world__greeting-message')).not.toBeVisible();
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Type special characters
    await input.fill('John O\'Brien');
    
    // Check greeting displays correctly
    const greetingMessage = component.locator('.hello-world__greeting-message');
    await expect(greetingMessage).toHaveText('Hello, John O\'Brien!');
  });

  test('should have proper label-input association', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    const input = component.locator('#name-input');
    
    // Verify label's 'for' attribute matches input's 'id'
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
    
    // Clicking label should focus input
    await label.click();
    await expect(input).toBeFocused();
  });
});