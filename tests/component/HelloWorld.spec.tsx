import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
  });

  test('should render with custom greeting text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Welcome to our app!" />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome to our app!');
  });

  test('should render text input field with default placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should render text input field with custom placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Type your name here" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
  });

  test('should render label with default text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Your Name:');
  });

  test('should render label with custom text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputLabel="Full Name:" />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Full Name:');
  });

  test('should update input value when user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await input.fill('John Doe');
    
    await expect(input).toHaveValue('John Doe');
  });

  test('should update greeting when form is submitted', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const heading = component.locator('.hello-world__heading');

    await input.fill('Alice');
    await button.click();

    await expect(heading).toHaveText('Hello, Alice!');
  });

  test('should update greeting when form is submitted with Enter key', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const heading = component.locator('.hello-world__heading');

    await input.fill('Bob');
    await input.press('Enter');

    await expect(heading).toHaveText('Hello, Bob!');
  });

  test('should preserve greeting after multiple submissions', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const heading = component.locator('.hello-world__heading');

    await input.fill('Charlie');
    await button.click();
    await expect(heading).toHaveText('Hello, Charlie!');

    await input.fill('Diana');
    await button.click();
    await expect(heading).toHaveText('Hello, Diana!');
  });

  test('should show default greeting when submitted with empty input', async ({ mount }) => {
    const component = await mount(<HelloWorld greeting="Welcome!" />);

    const button = component.locator('.hello-world__button');
    const heading = component.locator('.hello-world__heading');

    await button.click();

    await expect(heading).toHaveText('Welcome!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld greeting="Hello, World!" />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const heading = component.locator('.hello-world__heading');

    await input.fill('   ');
    await button.click();

    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('main.hello-world')).toBeVisible();
    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('h1.hello-world__heading')).toBeVisible();
    await expect(component.locator('form.hello-world__form')).toBeVisible();
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('section[role="region"]');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    const form = component.locator('form.hello-world__form');
    await expect(form).toHaveAttribute('aria-label', 'Name input form');

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');

    const button = component.locator('.hello-world__button');
    await expect(button).toHaveAttribute('aria-label', 'Submit name to update greeting');
  });

  test('should have proper label association with input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');

    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');

    await input.focus();
    await expect(input).toBeFocused();

    await input.press('Tab');
    await expect(button).toBeFocused();

    await button.press('Enter');
    const heading = component.locator('.hello-world__heading');
    await expect(heading).toBeVisible();
  });

  test('should apply custom className when provided', async ({ mount }) => {
    const component = await mount(<HelloWorld className="custom-class" />);

    const mainElement = component.locator('main.hello-world');
    await expect(mainElement).toHaveClass(/custom-class/);
  });

  test('should have BEM naming convention for all CSS classes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });

  test('should have proper button type attribute', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const button = component.locator('.hello-world__button');
    await expect(button).toHaveAttribute('type', 'submit');
  });

  test('should have input description for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Enter your name to personalize the greeting');
  });
});