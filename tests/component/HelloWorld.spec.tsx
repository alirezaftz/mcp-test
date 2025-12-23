import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with required props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should display default greeting "Hello, World!"', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toBeVisible();
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should render text input with correct placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Type your name here"
      />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should update greeting when text is entered', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('Alice');
    await expect(greeting).toHaveText('Hello, Alice!');

    await input.fill('Bob');
    await expect(greeting).toHaveText('Hello, Bob!');
  });

  test('should revert to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('Charlie');
    await expect(greeting).toHaveText('Hello, Charlie!');

    await input.clear();
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('   ');
    await expect(greeting).toHaveText('Hello, World!');
  });

  test('should apply default value if provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        defaultValue="David"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await expect(input).toHaveValue('David');
    await expect(greeting).toHaveText('Hello, David!');
  });

  test('should have proper BEM class structure', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
    await expect(component.locator('.hello-world__input-wrapper')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should apply fade-in animation class', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should have accessible ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        ariaLabel="Custom greeting section"
      />
    );

    const section = component.locator('section');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Custom greeting section');

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-description');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
  });

  test('should have properly associated label and input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');

    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should accept custom className prop', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        className="custom-class"
      />
    );

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should handle special characters in input', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('José García');
    await expect(greeting).toHaveText('Hello, José García!');

    await input.fill('李明');
    await expect(greeting).toHaveText('Hello, 李明!');

    await input.fill('O\'Brien');
    await expect(greeting).toHaveText('Hello, O\'Brien!');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const input = component.locator('.hello-world__input');
    
    await input.focus();
    await expect(input).toBeFocused();

    await page.keyboard.type('Emma');
    await expect(input).toHaveValue('Emma');
    
    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveText('Hello, Emma!');
  });

  test('should display description text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
      />
    );

    const description = component.locator('.hello-world__description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Enter your name to see a personalized greeting');
  });
});