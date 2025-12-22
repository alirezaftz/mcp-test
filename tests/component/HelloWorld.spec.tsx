import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should render with custom greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld greeting="Welcome, Friend!" />);

    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome, Friend!');
  });

  test('should render with custom placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld placeholder="Type here..." />);

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should update greeting when user types their name', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await input.fill('Alice');
    await expect(heading).toHaveText('Hello, Alice!');

    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');
  });

  test('should show clear button when input has value', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');

    // Clear button should not be visible initially
    await expect(clearButton).not.toBeVisible();

    // Type something
    await input.fill('Test');

    // Clear button should now be visible
    await expect(clearButton).toBeVisible();
  });

  test('should clear input and reset greeting when clear button is clicked', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const clearButton = component.locator('.hello-world__clear-button');
    const heading = component.locator('.hello-world__heading');

    // Type a name
    await input.fill('Charlie');
    await expect(heading).toHaveText('Hello, Charlie!');

    // Click clear button
    await clearButton.click();

    // Input should be cleared
    await expect(input).toHaveValue('');
    
    // Greeting should be reset
    await expect(heading).toHaveText('Hello, World!');
    
    // Clear button should be hidden
    await expect(clearButton).not.toBeVisible();
  });

  test('should reset to default greeting when input is cleared manually', async ({ mount }) => {
    const component = await mount(<HelloWorld greeting="Hi there!" />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type a name
    await input.fill('David');
    await expect(heading).toHaveText('Hello, David!');

    // Clear input manually
    await input.fill('');

    // Should reset to default greeting
    await expect(heading).toHaveText('Hi there!');
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Section should have proper role and aria-label
    const section = component.locator('section.hello-world');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Input should have aria-label
    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');

    // Label should be associated with input
    const label = component.locator('.hello-world__label');
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have accessible clear button with aria-label', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await input.fill('Test');

    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).toHaveAttribute('aria-label', 'Clear name input');
    await expect(clearButton).toHaveAttribute('type', 'button');
  });

  test('should use BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Block
    await expect(component.locator('.hello-world')).toBeVisible();

    // Elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should handle whitespace-only input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    // Type whitespace only
    await input.fill('   ');

    // Should show default greeting
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Tab to input
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Keyboard User');
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, Keyboard User!');

    // Tab to clear button
    await page.keyboard.press('Tab');
    const clearButton = component.locator('.hello-world__clear-button');
    await expect(clearButton).toBeFocused();

    // Press Enter to clear
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('');
  });
});