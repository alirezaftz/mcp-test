import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default greeting', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify the default greeting is displayed
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello, World!');
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome, Friend!" />
    );

    // Verify the custom greeting is displayed
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Welcome, Friend!');
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify main element with role
    const main = component.locator('main[role="main"]');
    await expect(main).toBeVisible();

    // Verify section with proper ARIA attributes
    const section = component.locator('section.hello-world__content');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Hello world greeting section');

    // Verify form has proper ARIA label
    const form = component.locator('form.hello-world__form');
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute('aria-label', 'Name input form');
  });

  test('should have BEM class naming convention', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify block-level class
    await expect(component.locator('.hello-world')).toBeVisible();

    // Verify element classes
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__form')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__input-description')).toBeVisible();
  });

  test('should display input field with proper attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Verify input is visible and has correct attributes
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('id', 'name-input');
    await expect(input).toHaveAttribute('placeholder', 'Enter your name...');
    await expect(input).toHaveAttribute('aria-label', 'Your Name input field');
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should display custom placeholder text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputPlaceholder="Type here..." />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type here...');
  });

  test('should have label associated with input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');

    // Verify label is visible and has correct text
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Your Name');

    // Verify label is properly associated with input
    await expect(label).toHaveAttribute('for', 'name-input');
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should display custom label text', async ({ mount }) => {
    const component = await mount(
      <HelloWorld inputLabel="Full Name" />
    );

    const label = component.locator('.hello-world__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Full Name');
  });

  test('should update greeting when user types in input', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Initially shows default greeting
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');
    
    // Wait for the greeting to update
    await expect(title).toHaveText('Hello, Alice!');
  });

  test('should reset to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type a name
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');

    // Clear the input
    await input.fill('');
    
    // Greeting should reset to default
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle input with whitespace correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type only spaces
    await input.fill('   ');
    
    // Greeting should remain default
    await expect(title).toHaveText('Hello, World!');

    // Type valid input
    await input.fill('Charlie');
    await expect(title).toHaveText('Hello, Charlie!');
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Focus the input using keyboard
    await input.focus();

    // Verify input is focused
    await expect(input).toBeFocused();

    // Type using keyboard
    await input.pressSequentially('David');

    // Verify the greeting updated
    const title = component.locator('.hello-world__title');
    await expect(title).toHaveText('Hello, David!');
  });

  test('should have input description text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const description = component.locator('.hello-world__input-description');

    // Verify description is visible and has correct text
    await expect(description).toBeVisible();
    await expect(description).toHaveText('Type your name to personalize the greeting');
  });

  test('should prevent form submission default behavior', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const form = component.locator('form.hello-world__form');
    const input = component.locator('.hello-world__input');

    // Fill input and submit form
    await input.fill('Eve');
    await expect(input).toHaveValue('Eve');
    
    await form.evaluate((formElement) => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      formElement.dispatchEvent(event);
    });

    // Verify the page didn't navigate (greeting still visible)
    const title = component.locator('.hello-world__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Hello, Eve!');
  });

  test('should have accessible ARIA attributes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Check main element accessibility
    const main = component.locator('main.hello-world');
    await expect(main).toBeVisible();
    await expect(main).toHaveAttribute('role', 'main');

    // Check section accessibility
    const section = component.locator('section.hello-world__content');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('role', 'region');
    const ariaLabel = await section.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    // Check form accessibility
    const form = component.locator('form.hello-world__form');
    await expect(form).toBeVisible();
    const formAriaLabel = await form.getAttribute('aria-label');
    expect(formAriaLabel).toBeTruthy();

    // Check input accessibility
    const input = component.locator('.hello-world__input');
    await expect(input).toBeVisible();
    const inputAriaLabel = await input.getAttribute('aria-label');
    expect(inputAriaLabel).toBeTruthy();
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
  });

  test('should handle multiple rapid input changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Rapidly change input values using fill (which is atomic)
    await input.fill('Alice');
    
    // Final greeting should reflect last input
    await expect(title).toHaveText('Hello, Alice!');
  });
});