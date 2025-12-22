import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting message', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world__title')).toHaveText('Hello World!');
    await expect(component.locator('.hello-world__title')).toBeVisible();
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome to our app!" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome to our app!');
  });

  test('should render text input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should render input with custom placeholder', async ({ mount }) => {
    const customPlaceholder = 'Type your name here...';
    const component = await mount(
      <HelloWorld placeholder={customPlaceholder} />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should render input with default placeholder', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
  });

  test('should update greeting when button is clicked', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const title = component.locator('.hello-world__title');

    await input.fill('Alice');
    await button.click();

    await expect(title).toHaveText('Hello, Alice!');
  });

  test('should update greeting when Enter key is pressed', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.fill('Bob');
    await input.press('Enter');

    await expect(title).toHaveText('Hello, Bob!');
  });

  test('should reset to initial greeting when empty input is submitted', async ({ mount }) => {
    const initialGreeting = 'Hello World!';
    const component = await mount(
      <HelloWorld initialGreeting={initialGreeting} />
    );

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const title = component.locator('.hello-world__title');

    // First update with a name
    await input.fill('Charlie');
    await button.click();
    await expect(title).toHaveText('Hello, Charlie!');

    // Clear input and submit
    await input.clear();
    await button.click();

    await expect(title).toHaveText(initialGreeting);
  });

  test('should handle whitespace-only input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const title = component.locator('.hello-world__title');

    await input.fill('   ');
    await button.click();

    await expect(title).toHaveText('Hello World!');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('section[role="region"]')).toBeVisible();
    await expect(component.locator('section[role="region"]')).toHaveAttribute(
      'aria-label',
      'Hello World greeting section'
    );
  });

  test('should have accessible input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('#name-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-label', 'Name input field');

    const label = component.locator('label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Customize your greeting:');
  });

  test('should have accessible button', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const button = component.locator('.hello-world__button');
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-label', 'Update greeting message');
    await expect(button).toHaveText('Update Greeting');
  });

  test('should render hint text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const hint = component.locator('.hello-world__hint');
    await expect(hint).toBeVisible();
    await expect(hint).toHaveText('Type your name and click the button or press Enter');
  });

  test('should use BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
    await expect(component.locator('.hello-world__hint')).toBeVisible();
  });

  test('should handle multiple consecutive updates', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');
    const title = component.locator('.hello-world__title');

    await input.fill('First');
    await button.click();
    await expect(title).toHaveText('Hello, First!');

    await input.clear();
    await input.fill('Second');
    await button.click();
    await expect(title).toHaveText('Hello, Second!');

    await input.clear();
    await input.fill('Third');
    await button.click();
    await expect(title).toHaveText('Hello, Third!');
  });

  test('should preserve input value after updating greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const button = component.locator('.hello-world__button');

    await input.fill('TestName');
    await button.click();

    await expect(input).toHaveValue('TestName');
  });
});