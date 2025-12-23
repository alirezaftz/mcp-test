import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('h1.hello-world__heading')).toHaveText('Hello, World!');
    await expect(component.locator('input.hello-world__input')).toBeVisible();
  });

  test('should render with custom initial message', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialMessage="Welcome, Friend!" />
    );

    await expect(component.locator('h1.hello-world__heading')).toHaveText('Welcome, Friend!');
  });

  test('should render with custom placeholder', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Type your name here" />
    );

    const input = component.locator('input.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('main[role="main"]')).toBeVisible();
    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('main[role="main"]')).toHaveAttribute('aria-label', 'Hello World application');
    await expect(component.locator('section[role="region"]')).toHaveAttribute('aria-label', 'Greeting section');
  });

  test('should have accessible input with proper ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input.hello-world__input');
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
    await expect(input).toHaveAttribute('id', 'name-input');
    
    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText("What's your name?");
  });

  test('should update greeting when user types their name', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input.hello-world__input');
    const heading = component.locator('h1.hello-world__heading');

    await expect(heading).toHaveText('Hello, World!');

    await input.fill('Alice');
    await expect(heading).toHaveText('Hello, Alice!');

    await input.fill('Bob');
    await expect(heading).toHaveText('Hello, Bob!');
  });

  test('should revert to initial message when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input.hello-world__input');
    const heading = component.locator('h1.hello-world__heading');

    await input.fill('Charlie');
    await expect(heading).toHaveText('Hello, Charlie!');

    await input.fill('');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input.hello-world__input');
    const heading = component.locator('h1.hello-world__heading');

    await input.fill('   ');
    await expect(heading).toHaveText('Hello, World!');
  });

  test('should have proper BEM class naming', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
  });

  test('should have form with proper aria-label', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const form = component.locator('form.hello-world__form');
    await expect(form).toHaveAttribute('aria-label', 'Name input form');
  });

  test('should handle multiple character types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input.hello-world__input');
    const heading = component.locator('h1.hello-world__heading');

    await input.fill('John Doe');
    await expect(heading).toHaveText('Hello, John Doe!');

    await input.fill('José García');
    await expect(heading).toHaveText('Hello, José García!');

    await input.fill('山田太郎');
    await expect(heading).toHaveText('Hello, 山田太郎!');
  });

  test('should maintain input value after typing', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('input.hello-world__input');

    await input.fill('TestUser');
    await expect(input).toHaveValue('TestUser');
  });

  test('should have description text visible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('#input-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to see a personalized greeting');
  });
});