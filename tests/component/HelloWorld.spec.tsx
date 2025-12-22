import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

/**
 * Test Suite: HelloWorld Component
 * 
 * Comprehensive tests for the HelloWorld component covering:
 * - Initial rendering
 * - Text input functionality
 * - Dynamic greeting updates
 * - Accessibility features
 * - Responsive behavior
 * - Animation states
 */

test.describe('HelloWorld Component - Basic Rendering', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify component is visible
    await expect(component.locator('section[role="region"]')).toBeVisible();
    
    // Verify default greeting is displayed
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, World!');
    
    // Verify input field is present
    await expect(component.locator('.hello-world__input')).toBeVisible();
  });

  test('should render with custom initial greeting', async ({ mount }) => {
    const component = await mount(
      <HelloWorld initialGreeting="Welcome to React!" />
    );

    await expect(component.locator('.hello-world__title')).toHaveText('Welcome to React!');
  });

  test('should render with custom placeholder text', async ({ mount }) => {
    const customPlaceholder = 'Type your name here...';
    const component = await mount(
      <HelloWorld inputPlaceholder={customPlaceholder} />
    );

    const input = component.locator('.hello-world__input');
    await expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify section element exists
    await expect(component.locator('section.hello-world')).toBeVisible();
    
    // Verify header element exists
    await expect(component.locator('header.hello-world__header')).toBeVisible();
    
    // Verify main element exists
    await expect(component.locator('main.hello-world__content')).toBeVisible();
    
    // Verify heading exists
    await expect(component.locator('h1.hello-world__title')).toBeVisible();
  });
});

test.describe('HelloWorld Component - Text Input Functionality', () => {
  test('should update greeting when user types their name', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Initial state
    await expect(title).toHaveText('Hello, World!');

    // Type a name
    await input.fill('Alice');
    
    // Verify greeting updates
    await expect(title).toHaveText('Hello, Alice!');
  });

  test('should handle multiple name changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // First name
    await input.fill('Bob');
    await expect(title).toHaveText('Hello, Bob!');

    // Change to second name
    await input.fill('Carol');
    await expect(title).toHaveText('Hello, Carol!');

    // Change to third name
    await input.fill('David');
    await expect(title).toHaveText('Hello, David!');
  });

  test('should revert to default greeting when input is cleared', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type a name
    await input.fill('Emma');
    await expect(title).toHaveText('Hello, Emma!');

    // Clear the input
    await input.fill('');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle whitespace-only input correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type only spaces
    await input.fill('   ');
    
    // Should show default greeting (whitespace is trimmed)
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle names with special characters', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Type name with special characters
    await input.fill('José García-Pérez');
    await expect(title).toHaveText('Hello, José García-Pérez!');
  });

  test('should preserve input value state', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Type a name
    await input.fill('Frank');
    
    // Verify input retains the value
    await expect(input).toHaveValue('Frank');
  });
});

test.describe('HelloWorld Component - Accessibility', () => {
  test('should have proper ARIA attributes on section', async ({ mount }) => {
    const component = await mount(<HelloWorld ariaLabel="Test section" />);

    const section = component.locator('section.hello-world');
    
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Test section');
  });

  test('should have accessible input field', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    
    // Verify input has aria-label
    await expect(input).toHaveAttribute('aria-label', 'Name input field');
    
    // Verify input has aria-describedby
    await expect(input).toHaveAttribute('aria-describedby', 'input-description');
    
    // Verify description element exists
    await expect(component.locator('#input-description')).toBeVisible();
  });

  test('should have proper label association', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const label = component.locator('.hello-world__label');
    const input = component.locator('.hello-world__input');

    // Verify label exists and has text
    await expect(label).toHaveText("What's your name?");
    
    // Verify input has matching ID for label's htmlFor
    await expect(input).toHaveAttribute('id', 'name-input');
  });

  test('should have heading with proper role and level', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const heading = component.locator('.hello-world__title');
    
    await expect(heading).toHaveAttribute('role', 'heading');
    await expect(heading).toHaveAttribute('aria-level', '1');
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');

    // Tab to the input field
    await page.keyboard.press('Tab');
    
    // Verify input is focused
    await expect(input).toBeFocused();

    // Type using keyboard
    await page.keyboard.type('Grace');
    
    // Verify input value
    await expect(input).toHaveValue('Grace');
    
    // Verify greeting updated
    await expect(component.locator('.hello-world__title')).toHaveText('Hello, Grace!');
  });
});

test.describe('HelloWorld Component - Animation States', () => {
  test('should apply visibility class after mount', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('section.hello-world');
    
    // Wait for animation class to be applied
    await expect(section).toHaveClass(/hello-world--visible/, { timeout: 1000 });
  });

  test('should have container with proper structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Verify container exists
    await expect(component.locator('.hello-world__container')).toBeVisible();
    
    // Verify nested structure
    await expect(component.locator('.hello-world__container .hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__container .hello-world__content')).toBeVisible();
  });
});

test.describe('HelloWorld Component - BEM Class Naming', () => {
  test('should use BEM naming convention for all elements', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    // Block
    await expect(component.locator('.hello-world')).toBeVisible();
    
    // Elements
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__header')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
    await expect(component.locator('.hello-world__content')).toBeVisible();
    await expect(component.locator('.hello-world__input-group')).toBeVisible();
    await expect(component.locator('.hello-world__label')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__description')).toBeVisible();
    
    // Modifier
    await expect(component.locator('.hello-world--visible')).toBeVisible({ timeout: 1000 });
  });
});

test.describe('HelloWorld Component - Edge Cases', () => {
  test('should handle very long names gracefully', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    const longName = 'Abcdefghijklmnopqrstuvwxyz1234567890';
    await input.fill(longName);
    
    await expect(title).toHaveText(`Hello, ${longName}!`);
  });

  test('should handle empty string correctly', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    await input.fill('');
    await expect(title).toHaveText('Hello, World!');
  });

  test('should handle rapid input changes', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const input = component.locator('.hello-world__input');
    const title = component.locator('.hello-world__title');

    // Rapid changes
    await input.fill('A');
    await input.fill('Al');
    await input.fill('Ali');
    await input.fill('Alic');
    await input.fill('Alice');
    
    await expect(title).toHaveText('Hello, Alice!');
  });
});

test.describe('HelloWorld Component - Responsive Behavior', () => {
  test('should be visible on mobile viewport', async ({ mount, page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
  });

  test('should be visible on tablet viewport', async ({ mount, page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
  });

  test('should be visible on desktop viewport', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__input')).toBeVisible();
    await expect(component.locator('.hello-world__title')).toBeVisible();
  });
});