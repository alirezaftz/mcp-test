import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
  });

  test('should render with custom initial message', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialMessage="Welcome to our app!" />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome to our app!');
  });

  test('should have accessible section with proper role and aria-label', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello World greeting section');
  });

  test('should render text input with default placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should render text input with custom placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld placeholder="What's your name?" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', "What's your name?");
  });

  test('should have accessible input with proper aria attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have label associated with input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter your name:');
    await expect(label).toHaveAttribute('for', 'name-input');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await expect(heading).toHaveText('Hello, World!');

    await input.fill('Alice');
    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await input.fill('B');
    await expect(heading).toHaveText('Hello, B!');

    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');

    await input.fill('Bobby');
    await expect(heading).toHaveText('Hello, Bobby!');
  });

  test('should revert to initial message when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await input.fill('Charlie');
    await expect(heading).toHaveText('Hello, Charlie!');

    await input.fill('');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await input.fill('   ');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should display help text for input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to personalize the greeting');
    await expect(description).toHaveAttribute('id', 'input-description');
  });

  test('should use BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    await page.keyboard.type('KeyboardUser');
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, KeyboardUser!');
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await input.fill("O'Brien");
    await expect(heading).toHaveText("Hello, O'Brien!");

    await input.fill('José');
    await expect(heading).toHaveText('Hello, José!');

    await input.fill('李明');
    await expect(heading).toHaveText('Hello, 李明!');
  });

  test('should preserve input value across re-renders', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    await input.fill('TestUser');
    await expect(input).toHaveValue('TestUser');
    
    await component.locator('.hello-world__container').click();
    await expect(input).toHaveValue('TestUser');
  });
});