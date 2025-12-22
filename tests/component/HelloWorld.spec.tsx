import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    // Verify the section element is present with proper ARIA attributes
    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello world page section"]')).toBeVisible();

    // Verify the title is rendered
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render with custom placeholder and label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Welcome"
        placeholder="Type here..."
        label="Name"
      />
    );

    // Verify custom label is displayed
    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Name');

    // Verify custom placeholder
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should have accessible input field with proper ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" label="Your Name" />
    );

    // Verify input has proper accessibility attributes
    const input = component.locator('#hello-world-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Your Name text input field');
    await expect(input).toHaveAttribute('aria-describedby', 'hello-world-description');

    // Verify label is associated with input
    const label = component.locator('label[for="hello-world-input"]');
    await expect(label).toBeVisible();
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Type into the input field
    await input.fill('John');

    // Verify the input value is updated
    await expect(input).toHaveValue('John');
  });

  test('should display greeting when user enters text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Initially, greeting should not be visible
    await expect(component.locator('.hello-world__greeting')).not.toBeVisible();

    // Type a name
    await input.fill('Alice');

    // Verify greeting appears with the entered name
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting.locator('.hello-world__greeting-name')).toHaveText('Alice');
    await expect(component.locator('.hello-world__greeting-text')).toContainText('Hello, Alice!');
  });

  test('should update greeting dynamically when input changes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Type first name
    await input.fill('Bob');
    await expect(component.locator('.hello-world__greeting-name')).toHaveText('Bob');

    // Change to different name
    await input.fill('Charlie');
    await expect(component.locator('.hello-world__greeting-name')).toHaveText('Charlie');
  });

  test('should hide greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Type a name to show greeting
    await input.fill('David');
    await expect(component.locator('.hello-world__greeting')).toBeVisible();

    // Clear the input
    await input.fill('');
    
    // Verify greeting is hidden
    await expect(component.locator('.hello-world__greeting')).not.toBeVisible();
  });

  test('should have proper BEM class naming structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    // Verify BEM block class
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify BEM element classes
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should apply custom className when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" className="custom-class" />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should have keyboard accessible input', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Focus the input with keyboard
    await input.focus();
    
    // Verify input is focused
    await expect(input).toBeFocused();
    
    // Type using keyboard
    await page.keyboard.type('Keyboard Test');
    
    // Verify value was entered
    await expect(input).toHaveValue('Keyboard Test');
  });

  test('should have live region for greeting accessibility', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Type to trigger greeting
    await input.fill('Emma');

    // Verify greeting has proper ARIA live region
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should render description text for input guidance', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const description = component.locator('#hello-world-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });

  test('should handle empty string input gracefully', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    
    // Fill with spaces only
    await input.fill('   ');
    
    // Greeting should still appear (spaces are valid input)
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
    
    // Clear to actual empty string
    await input.fill('');
    
    // Greeting should be hidden
    await expect(component.locator('.hello-world__greeting')).not.toBeVisible();
  });

  test('should render all semantic HTML elements correctly', async ({ mount }) => {
    const component = await mount(
      <HelloWorld title="Hello World" label="Name" />
    );

    // Verify semantic section
    await expect(component.locator('section.hello-world')).toBeVisible();
    
    // Verify semantic header
    await expect(component.locator('header.hello-world__header')).toBeVisible();
    
    // Verify h1 heading
    await expect(component.locator('h1.hello-world__title')).toBeVisible();
    
    // Verify label element
    await expect(component.locator('label.hello-world__label')).toBeVisible();
    
    // Verify input element
    await expect(component.locator('input.hello-world__input')).toBeVisible();
  });
});