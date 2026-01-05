import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify the component is visible
    await expect(component).toBeVisible();
    
    // Check default greeting text
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should render with custom greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Welcome to React!" />
    );
    
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Welcome to React!');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Check for main element
    const main = component.locator('main.hello-world');
    await expect(main).toBeVisible();
    
    // Check for section with proper role and aria-label
    const section = component.locator('section[role="region"][aria-label="Hello world greeting section"]');
    await expect(section).toBeVisible();
    
    // Check for heading
    const heading = component.locator('h1.hello-world__heading');
    await expect(heading).toBeVisible();
    
    // Check for form
    const form = component.locator('form.hello-world__form');
    await expect(form).toBeVisible();
  });

  test('should have BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify BEM block
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Verify BEM elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should render text input with placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld placeholder="Type your name here..." />
    );
    
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type your name here...');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');
    
    // Initial state
    await expect(heading).toHaveText('Hello, World!');
    
    // Type a name
    await input.fill('Alice');
    await expect(heading).toHaveText('Hello, Alice!');
    
    // Change the name
    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');
  });

  test('should revert to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Hello, World!" />
    );
    
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');
    
    // Type a name
    await input.fill('Charlie');
    await expect(heading).toHaveText('Hello, Charlie!');
    
    // Clear the input
    await input.fill('');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Hello, World!" />
    );
    
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');
    
    // Type whitespace only
    await input.fill('   ');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have accessible form elements', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Check form has aria-label
    const form = component.locator('form[aria-label="Greeting customization form"]');
    await expect(form).toBeVisible();
    
    // Check input has proper id and aria attributes
    const input = component.locator('input#name-input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
    
    // Check label is associated with input
    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Personalize your greeting:');
    
    // Check description exists
    const description = component.locator('#input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });

  test('should have accessible ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Section has role and aria-label
    const section = component.locator('section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');
    
    // Form has aria-label
    const form = component.locator('form');
    await expect(form).toHaveAttribute('aria-label', 'Greeting customization form');
    
    // Input has aria-label and aria-describedby
    const input = component.locator('input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should accept custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld className="custom-class" />
    );
    
    const main = component.locator('main');
    await expect(main).toHaveClass(/custom-class/);
    await expect(main).toHaveClass(/hello-world/);
  });

  test('should prevent form submission default behavior', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const form = component.locator('form');
    const input = component.locator('.hello-world__input');
    
    // Fill input and submit form
    await input.fill('Test User');
    await input.press('Enter');
    
    // Verify the greeting is still updated (form didn't reload page)
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, Test User!');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    
    // Focus on input
    await input.focus();
    await expect(input).toBeFocused();
    
    // Type using keyboard
    await input.type('Keyboard User');
    
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, Keyboard User!');
  });

  test('should maintain input value state', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    
    // Type a value
    await input.fill('State Test');
    
    // Verify input value is maintained
    await expect(input).toHaveValue('State Test');
    
    // Verify heading is updated
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toHaveText('Hello, State Test!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');
    
    // Type special characters
    await input.fill('Alice & Bob');
    await expect(heading).toHaveText('Hello, Alice & Bob!');
    
    // Try emoji
    await input.fill('🎉 Party');
    await expect(heading).toHaveText('Hello, 🎉 Party!');
  });

  test('should have responsive container structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify responsive container exists
    const container = component.locator('.hello-world__container');
    await expect(container).toBeVisible();
    
    // Verify content wrapper exists
    const content = component.locator('.hello-world__content');
    await expect(content).toBeVisible();
  });
});