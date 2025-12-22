import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__description')).toContainText('Welcome!');
    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Enter your name...');
    await expect(component.locator('.hello-world__label')).toHaveText('Your Name');
  });

  test('should render with custom props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Custom Title"
        description="Custom description text"
        placeholder="Type here..."
        inputLabel="Name"
        greetingPrefix="Hi"
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Custom Title');
    await expect(component.locator('.hello-world__description')).toHaveText('Custom description text');
    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Type here...');
    await expect(component.locator('.hello-world__label')).toHaveText('Name');
  });

  test('should display greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await expect(greeting).toBeEmpty();

    await input.fill('John');

    await expect(greeting).toHaveText('Hello, John!');
    await expect(greeting).toHaveClass(/hello-world__greeting--visible/);
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('A');
    await expect(greeting).toHaveText('Hello, A!');

    await input.fill('Alice');
    await expect(greeting).toHaveText('Hello, Alice!');

    await input.fill('Alice Smith');
    await expect(greeting).toHaveText('Hello, Alice Smith!');
  });

  test('should hide greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('Jane');
    await expect(greeting).toHaveText('Hello, Jane!');

    await input.clear();
    await expect(greeting).toBeEmpty();
    await expect(greeting).not.toHaveClass(/hello-world__greeting--visible/);
  });

  test('should use custom greeting prefix', async ({ mount }) => {
    const component = await mount(<HelloWorld greetingPrefix="Greetings" />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('Bob');
    await expect(greeting).toHaveText('Greetings, Bob!');
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('main[role="main"]')).toBeVisible();
    await expect(component.locator('main')).toHaveAttribute('aria-label', 'Hello World main section');

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-output');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
    await expect(greeting).toHaveAttribute('aria-atomic', 'true');
  });

  test('should have proper label association with input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');

    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('   ');
    await expect(greeting).toBeEmpty();
    await expect(greeting).not.toHaveClass(/hello-world__greeting--visible/);
  });

  test('should maintain input value state correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    await input.fill('Test User');
    await expect(input).toHaveValue('Test User');

    await input.fill('');
    await expect(input).toHaveValue('');
  });

  test('should follow BEM naming convention for all CSS classes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
  });

  test('should apply BEM modifier class when greeting is visible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const greeting = component.locator('.hello-world__greeting');
    const input = component.locator('.hello-world__input');

    await expect(greeting).not.toHaveClass(/hello-world__greeting--visible/);

    await input.fill('User');

    await expect(greeting).toHaveClass(/hello-world__greeting--visible/);
  });
});