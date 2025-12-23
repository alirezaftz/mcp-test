import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify main container is visible
    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('[role="main"]')).toBeVisible();
    
    // Verify default title and description
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__description')).toContainText('Enter your name');
  });

  test('should render with custom props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        title="Welcome!"
        description="Custom description text"
        placeholder="Type here..."
        inputLabel="Name"
      />
    );
    
    // Verify custom title and description
    await expect(component.locator('.hello-world__title')).toHaveText('Welcome!');
    await expect(component.locator('.hello-world__description')).toHaveText('Custom description text');
    await expect(component.locator('.hello-world__label')).toHaveText('Name');
    
    // Verify custom placeholder
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should display text input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    
    // Verify input exists and is visible
    await expect(input).toBeVisible();
    
    // Verify input is of type text
    await expect(input).toHaveAttribute('type', 'text');
    
    // Verify input has proper ARIA attributes
    await expect(input).toHaveAttribute('aria-label', 'Enter your name for personalized greeting');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-output');
  });

  test('should have accessible label for input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');
    
    // Verify label exists and is associated with input
    await expect(label).toBeVisible();
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should display default greeting when input is empty', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const greeting = component.locator('.hello-world__greeting');
    
    // Verify default greeting is displayed
    await expect(greeting).toBeVisible();
    await expect(greeting).toContainText('Enter your name above');
    
    // Verify empty state modifier class is applied
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');
    
    // Type a name into the input
    await input.fill('Alice');
    
    // Verify greeting updates with the name
    await expect(greeting).toHaveText('Hello, Alice! Welcome to our page.');
    
    // Verify empty state modifier class is removed
    await expect(greeting).not.toHaveClass(/hello-world__greeting--empty/);
  });

  test('should trim whitespace from input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');
    
    // Type a name with leading/trailing spaces
    await input.fill('  Bob  ');
    
    // Verify greeting trims the whitespace
    await expect(greeting).toHaveText('Hello, Bob! Welcome to our page.');
  });

  test('should show default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');
    
    // Type a name
    await input.fill('Charlie');
    await expect(greeting).toHaveText('Hello, Charlie! Welcome to our page.');
    
    // Clear the input
    await input.clear();
    
    // Verify default greeting is shown again
    await expect(greeting).toContainText('Enter your name above');
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);
  });

  test('should handle multiple input changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');
    
    // First name
    await input.fill('David');
    await expect(greeting).toHaveText('Hello, David! Welcome to our page.');
    
    // Second name
    await input.fill('Emma');
    await expect(greeting).toHaveText('Hello, Emma! Welcome to our page.');
    
    // Third name
    await input.fill('Frank');
    await expect(greeting).toHaveText('Hello, Frank! Welcome to our page.');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify main element with proper role
    await expect(component.locator('main[role="main"]')).toBeVisible();
    
    // Verify heading structure
    await expect(component.locator('h1.hello-world__title')).toBeVisible();
    
    // Verify proper label/input association
    await expect(component.locator('label[for="name-input"]')).toBeVisible();
    await expect(component.locator('input#name-input')).toBeVisible();
  });

  test('should have live region for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const greeting = component.locator('.hello-world__greeting');
    
    // Verify greeting has proper ARIA attributes for screen readers
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
    await expect(greeting).toHaveAttribute('id', 'greeting-output');
  });

  test('should follow BEM naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify BEM block class
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Verify BEM element classes
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
  });

  test('should handle empty string with only spaces', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');
    
    // Type only spaces
    await input.fill('     ');
    
    // Verify default greeting is shown (spaces are trimmed)
    await expect(greeting).toContainText('Enter your name above');
    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);
  });

  test('should use custom default greeting', async ({ mount }) => {
    const customGreeting = 'Please provide your name';
    
    const component = await mount(
      <HelloWorld defaultGreeting={customGreeting} />
    );
    
    const greeting = component.locator('.hello-world__greeting');
    
    // Verify custom default greeting is displayed
    await expect(greeting).toHaveText(customGreeting);
  });
});