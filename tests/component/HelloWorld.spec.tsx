import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify the main container is present with proper ARIA attributes
    await expect(component.locator('section.hello-world__container[role="region"]')).toBeVisible();
    await expect(component.locator('section[aria-label="Hello World greeting section"]')).toBeVisible();
    
    // Verify default greeting text
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, World!');
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome to React!" />
    );
    
    await expect(component.locator('.hello-world__title')).toHaveText('Welcome to React!');
  });

  test('should display input field with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld placeholder="Type here..." />);
    
    const input = component.locator('.hello-world__input');
    
    // Verify input is visible and has proper attributes
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');
    
    // Initial state
    await expect(title).toHaveText('Hello, World!');
    
    // Type in the input
    await input.fill('John');
    
    // Verify greeting updates
    await expect(title).toHaveText('Hello, John!');
  });

  test('should update footer message when user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const footerInfo = component.locator('.hello-world__info');
    
    // Initial state
    await expect(footerInfo).toHaveText('Enter your name above');
    
    // Type in the input
    await input.fill('Alice');
    
    // Verify footer updates
    await expect(footerInfo).toHaveText('Nice to meet you, Alice!');
  });

  test('should revert to initial greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld initialGreeting="Hello, World!" />);
    
    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');
    
    // Type something
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');
    
    // Clear the input
    await input.clear();
    
    // Verify it reverts to initial greeting
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');
    
    // Type whitespace
    await input.fill('   ');
    
    // Should revert to default greeting
    await expect(title).toHaveText('Hello, World!');
  });

  test('should have proper form accessibility attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const form = component.locator('.hello-world__form');
    
    await expect(form).toHaveAttribute('aria-label', 'Name input form');
  });

  test('should have proper label association', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');
    
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have descriptive text for screen readers', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const description = component.locator('#name-input-description');
    
    await expect(input).toHaveAttribute('aria-describedby', 'name-input-description');
    await expect(description).toHaveText('Type your name to personalize the greeting');
  });

  test('should prevent form submission default behavior', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const form = component.locator('.hello-world__form');
    const input = component.locator('.hello-world__input');
    
    // Fill input
    await input.fill('Test User');
    
    // Press Enter to submit form
    await input.press('Enter');
    
    // Verify greeting is still visible (form didn't navigate away)
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, Test User!');
  });

  test('should apply custom className prop', async ({ mount }) => {
    const component = await mount(<HelloWorld className="custom-class" />);
    
    const main = component.locator('main.hello-world');
    
    await expect(main).toHaveClass(/custom-class/);
  });

  test('should use semantic HTML elements', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    // Verify semantic HTML structure
    await expect(component.locator('main.hello-world')).toBeVisible();
    await expect(component.locator('section.hello-world__container')).toBeVisible();
    await expect(component.locator('header.hello-world__header')).toBeVisible();
    await expect(component.locator('footer.hello-world__footer')).toBeVisible();
    await expect(component.locator('form.hello-world__form')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    
    // Tab to the input field
    await page.keyboard.press('Tab');
    
    // Verify input is focused
    await expect(input).toBeFocused();
    
    // Type using keyboard
    await page.keyboard.type('Keyboard User');
    
    // Verify greeting updates
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, Keyboard User!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');
    
    // Type special characters
    await input.fill('Mary-Jane O\'Connor');
    
    // Verify greeting handles special characters
    await expect(title).toHaveText('Hello, Mary-Jane O\'Connor!');
  });

  test('should handle long names gracefully', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');
    
    const longName = 'Christopher Alexander Montgomery';
    
    await input.fill(longName);
    
    await expect(title).toHaveText(`Hello, ${longName}!`);
    await expect(title).toBeVisible();
  });

  test('should maintain input value after multiple edits', async ({ mount }) => {
    const component = await mount(<HelloWorld />);
    
    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');
    
    // First edit
    await input.fill('Alice');
    await expect(title).toHaveText('Hello, Alice!');
    await expect(input).toHaveValue('Alice');
    
    // Second edit
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');
    await expect(input).toHaveValue('Bob');
    
    // Third edit
    await input.fill('Charlie');
    await expect(title).toHaveText('Hello, Charlie!');
    await expect(input).toHaveValue('Charlie');
  });
});