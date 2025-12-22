import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
    await expect(component.locator('.hello-world__subtitle')).toHaveText('Welcome to our interactive greeting page');
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toHaveText('Hello! Please enter your name above.');
  });

  test('should render with custom props', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Custom Title"
        subtitle="Custom Subtitle"
        inputPlaceholder="Type here..."
        inputLabel="Name Field"
        defaultGreeting="Welcome!"
      />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Custom Title');
    await expect(component.locator('.hello-world__subtitle')).toHaveText('Custom Subtitle');
    await expect(component.locator('.hello-world__input')).toHaveAttribute('placeholder', 'Type here...');
    await expect(component.locator('.hello-world__label')).toHaveText('Name Field');
    await expect(component.locator('.hello-world__greeting')).toHaveText('Welcome!');
  });

  test('should update greeting when text is entered', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await expect(greeting).toHaveText('Hello! Please enter your name above.');

    await input.fill('Alice');
    await expect(greeting).toHaveText('Hello, Alice!');

    await input.fill('Bob Smith');
    await expect(greeting).toHaveText('Hello, Bob Smith!');
  });

  test('should handle empty input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('John');
    await expect(greeting).toHaveText('Hello, John!');

    await input.fill('');
    await expect(greeting).toHaveText('Hello! Please enter your name above.');
  });

  test('should trim whitespace from input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.fill('   Spaces   ');
    await expect(greeting).toHaveText('Hello, Spaces!');

    await input.fill('   ');
    await expect(greeting).toHaveText('Hello! Please enter your name above.');
  });

  test('should have proper accessibility attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('main[role="main"]')).toBeVisible();
    await expect(component.locator('main')).toHaveAttribute('aria-label', 'Hello World main content');

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Your Name');
    await expect(input).toHaveAttribute('aria-describedby', 'greeting-output');

    const greeting = component.locator('.hello-world__greeting');
    await expect(greeting).toHaveAttribute('role', 'status');
    await expect(greeting).toHaveAttribute('aria-live', 'polite');
    await expect(greeting).toHaveAttribute('aria-atomic', 'true');
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__greeting')).toBeVisible();
  });

  test('should apply empty state modifier class', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const greeting = component.locator('.hello-world__greeting');

    await expect(greeting).toHaveClass(/hello-world__greeting--empty/);

    const input = component.locator('.hello-world__input');
    await input.fill('John');

    await expect(greeting).not.toHaveClass(/hello-world__greeting--empty/);
  });

  test('should apply visibility modifier class on mount', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const main = component.locator('.hello-world');
    await expect(main).toHaveClass(/hello-world--visible/);
  });

  test('should handle keyboard input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const greeting = component.locator('.hello-world__greeting');

    await input.focus();
    await input.pressSequentially('TypedName');

    await expect(greeting).toHaveText('Hello, TypedName!');
  });

  test('should render without subtitle when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld
        title="Title Only"
        subtitle=""
      />
    );

    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__subtitle')).not.toBeVisible();
  });

  test('should accept custom className', async ({ mount }) => {
    const component = await mount(
      <HelloWorld className="custom-class" />
    );

    await expect(component.locator('.hello-world.custom-class')).toBeVisible();
  });

  test('should have proper input field attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('id', 'name-input');

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveAttribute('for', 'name-input');
  });
});