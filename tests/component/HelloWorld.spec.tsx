import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render component with default text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    // Check component is visible
    await expect(component).toBeVisible();

    // Check default text is displayed
    const title = component.locator('.hello-world__title');
    await expect(title).toHaveText('Hello World');
  });

  test('should render component with custom default text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Welcome!" />
    );

    const title = component.locator('.hello-world__title');
    await expect(title).toHaveText('Welcome!');
  });

  test('should have text input field with correct attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        defaultText="Hello World"
        placeholderText="Type here..."
      />
    );

    const input = component.locator('.hello-world__input');
    
    // Check input exists and is visible
    await expect(input).toBeVisible();
    
    // Check input has correct placeholder
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
    
    // Check input has correct type
    await expect(input).toHaveAttribute('type', 'text');
    
    // Check input has aria-label
    await expect(input).toHaveAttribute('aria-label', 'Text input field');
    
    // Check input has proper ID for label association
    await expect(input).toHaveAttribute('id', 'hello-world-input');
  });

  test('should update display text when typing in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type new text
    await input.fill('Custom Message');

    // Check title updates
    await expect(title).toHaveText('Custom Message');
  });

  test('should show default text when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type text then clear
    await input.fill('Temporary');
    await expect(title).toHaveText('Temporary');
    
    await input.clear();
    await expect(title).toHaveText('Hello World');
  });

  test('should have Update button that submits form', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const updateButton = component.locator('button[aria-label="Submit text input"]');
    const title = component.locator('.hello-world__title');

    // Check button exists
    await expect(updateButton).toBeVisible();
    await expect(updateButton).toHaveText('Update');

    // Type text and click update
    await input.fill('Updated Text');
    await updateButton.click();

    // Title should be updated
    await expect(title).toHaveText('Updated Text');
  });

  test('should have Reset button that clears input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const resetButton = component.locator('button[aria-label="Reset to default text"]');
    const title = component.locator('.hello-world__title');

    // Check button exists
    await expect(resetButton).toBeVisible();
    await expect(resetButton).toHaveText('Reset');

    // Type text
    await input.fill('Some Text');
    await expect(title).toHaveText('Some Text');

    // Click reset
    await resetButton.click();

    // Input should be cleared and title reset
    await expect(input).toHaveValue('');
    await expect(title).toHaveText('Hello World');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    // Check section element with proper role and aria-label
    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world section');

    // Check header element
    const header = component.locator('header');
    await expect(header).toBeVisible();

    // Check form element
    const form = component.locator('form');
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute('aria-label', 'Text input form');
  });

  test('should have proper BEM class naming structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    // Check block class
    await expect(component.locator('.hello-world')).toBeVisible();

    // Check element classes
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__actions')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();

    // Check modifier classes
    await expect(component.locator('.hello-world__button--primary')).toBeVisible();
    await expect(component.locator('.hello-world__button--secondary')).toBeVisible();
  });

  test('should have accessible form label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const label = component.locator('label.hello-world__label');
    
    // Check label exists
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter your message:');
    
    // Check label is associated with input
    await expect(label).toHaveAttribute('for', 'hello-world-input');
  });

  test('should have descriptive text for accessibility', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const description = component.locator('#input-description');
    
    // Check description exists
    await expect(description).toBeVisible();
    await expect(description).toContainText('Type a custom message');
    
    // Check input is described by this element
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should apply custom className when provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        defaultText="Hello World"
        className="custom-class"
      />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should handle form submission with Enter key', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type text and press Enter
    await input.fill('Form Submit Test');
    await input.press('Enter');

    // Title should be updated
    await expect(title).toHaveText('Form Submit Test');
  });

  test('should have buttons with proper ARIA labels', async ({ mount }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    // Check Update button
    const updateButton = component.locator('button[aria-label="Submit text input"]');
    await expect(updateButton).toBeVisible();
    await expect(updateButton).toHaveAttribute('type', 'submit');

    // Check Reset button
    const resetButton = component.locator('button[aria-label="Reset to default text"]');
    await expect(resetButton).toBeVisible();
    await expect(resetButton).toHaveAttribute('type', 'button');
  });

  test('should maintain accessibility with keyboard navigation', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld defaultText="Hello World" />
    );

    const input = component.locator('.hello-world__input');
    const updateButton = component.locator('button[aria-label="Submit text input"]');
    const resetButton = component.locator('button[aria-label="Reset to default text"]');

    // Tab to input
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Tab to Update button
    await page.keyboard.press('Tab');
    await expect(updateButton).toBeFocused();

    // Tab to Reset button
    await page.keyboard.press('Tab');
    await expect(resetButton).toBeFocused();
  });
});