import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('role=region')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, World!');
  });

  test('should render with custom greeting message', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Welcome to the App!" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome to the App!');
  });

  test('should have accessible section with proper ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld ariaLabel="Custom hello world section" />);

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Custom hello world section');
  });

  test('should render input field with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('should render input with custom placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Type your name here" />
    );

    const input = component.locator('#name-input');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should update greeting when user types their name', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const title = component.locator('.hello-world__title');

    await expect(title).toHaveText('Hello, World!');

    await input.fill('Alice');
    await expect(title).toHaveText('Hello, Alice!');

    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');
  });

  test('should show personalized message when name is entered', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const message = component.locator('.hello-world__message');

    await expect(message).not.toBeVisible();

    await input.fill('Charlie');
    await expect(message).toBeVisible();
    await expect(component.locator('.hello-world__greeting-text')).toHaveText('Nice to meet you, Charlie! 👋');
  });

  test('should hide personalized message when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const message = component.locator('.hello-world__message');

    await input.fill('David');
    await expect(message).toBeVisible();

    await input.clear();
    await expect(message).not.toBeVisible();
  });

  test('should have accessible label for input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText("What's your name?");
  });

  test('should have description text for input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('#input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });

  test('should have aria-describedby linking input to description', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should apply visibility animation class on mount', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/, { timeout: 1000 });
  });

  test('should have live region for dynamic greeting message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    await input.fill('Eve');

    const liveRegion = component.locator('[role="status"][aria-live="polite"]');
    await expect(liveRegion).toBeVisible();
  });

  test('should handle empty input gracefully', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    const title = component.locator('.hello-world__title');

    await input.fill('   ');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should maintain input value after multiple changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');

    await input.fill('First');
    await expect(input).toHaveValue('First');

    await input.fill('Second');
    await expect(input).toHaveValue('Second');

    await input.fill('Third');
    await expect(input).toHaveValue('Third');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    await page.keyboard.type('Test User');
    await expect(input).toHaveValue('Test User');
  });
});