import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component', () => {
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify the component is visible
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Verify the default greeting text
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome, Friend!" />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome, Friend!');
  });

  test('should display text input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify input field exists and is visible
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    
    // Verify input has correct attributes
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify section has proper role and aria-label
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Verify input has aria-label
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');

    // Verify form has aria-label
    const form = component.locator('.hello-world__form');
    await expect(form).toHaveAttribute('aria-label', 'Greeting customization form');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Initially shows default greeting
    await expect(heading).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');
    
    // Greeting should update
    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should reset to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type a name
    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');

    // Clear the input
    await input.clear();
    
    // Should revert to default greeting
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should use custom placeholder text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld placeholderText="Your name here" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Your name here');
  });

  test('should handle input with whitespace correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type only whitespace
    await input.fill('   ');
    
    // Should show default greeting (whitespace is trimmed)
    await expect(heading).toHaveText('Hello, World!');

    // Type name with leading/trailing whitespace
    await input.fill('  Charlie  ');
    
    // Should still create greeting (value is not trimmed, but trim check allows it)
    await expect(heading).toHaveText('Hello,   Charlie  !');
  });

  test('should have proper BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify BEM block
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Verify BEM elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should apply additional className when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld className="custom-class" />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world/);
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should have accessible label for input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify label exists and is associated with input
    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(label).toHaveText('Personalize your greeting:');
  });

  test('should have description text for input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('#input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });

  test('should prevent default form submission', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const form = component.locator('.hello-world__form');
    const input = component.locator('.hello-world__input');

    // Fill input
    await input.fill('TestUser');

    // Press Enter to submit form
    await input.press('Enter');

    // Page should not reload (component should still be visible)
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, TestUser!');
  });

  test('should handle rapid input changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Rapidly type different names
    await input.fill('A');
    await expect(heading).toHaveText('Hello, A!');

    await input.fill('AB');
    await expect(heading).toHaveText('Hello, AB!');

    await input.fill('ABC');
    await expect(heading).toHaveText('Hello, ABC!');
  });

  test('should use semantic HTML elements', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify section element is used
    await expect(component.locator('section.hello-world')).toBeVisible();

    // Verify h1 for heading
    await expect(component.locator('h1.hello-world__heading')).toBeVisible();

    // Verify form element
    await expect(component.locator('form.hello-world__form')).toBeVisible();

    // Verify label element
    await expect(component.locator('label.hello-world__label')).toBeVisible();

    // Verify input element
    await expect(component.locator('input.hello-world__input')).toBeVisible();
  });
});