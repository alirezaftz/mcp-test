import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World');
  });

  test('should render with custom greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Welcome" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome');
  });

  test('should display input field with correct attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('should display custom placeholder text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld placeholder="Type your name here" />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.fill('Alice');
    await expect(title).toHaveText('Hello World, Alice!');
  });

  test('should update greeting dynamically as user types', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.fill('B');
    await expect(title).toHaveText('Hello World, B!');

    await input.fill('Bob');
    await expect(title).toHaveText('Hello World, Bob!');
  });

  test('should revert to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.fill('Charlie');
    await expect(title).toHaveText('Hello World, Charlie!');

    await input.clear();
    await expect(title).toHaveText('Hello World');
  });

  test('should display custom label', async ({ mount }) => {
    const component = await mount(
      <HelloWorld label="Your Name" />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toHaveText('Your Name');
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const main = component.locator('main.hello-world');
    await expect(main).toBeVisible();

    const section = component.locator('section.hello-world__container');
    await expect(section).toBeVisible();

    const heading = component.locator('h1.hello-world__title');
    await expect(heading).toBeVisible();
  });

  test('should display input description text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Enter your name to personalize the greeting');
  });

  test('should associate label with input using htmlFor', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('label.hello-world__label');
    const input = component.locator('.hello-world__input');

    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should handle keyboard input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.focus();
    await input.pressSequentially('Dave', { delay: 50 });
    
    await expect(title).toHaveText('Hello World, Dave!');
  });

  test('should maintain input value when component rerenders', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    await input.fill('Test User');
    await expect(input).toHaveValue('Test User');

    const title = component.locator('.hello-world__title');
    await expect(title).toHaveText('Hello World, Test User!');
  });

  test('should work with custom greeting and name combination', async ({ mount }) => {
    const component = await mount(
      <HelloWorld greeting="Greetings" />
    );

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.fill('World');
    await expect(title).toHaveText('Greetings, World!');
  });
});