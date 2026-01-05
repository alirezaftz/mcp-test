import { test, expect } from '@playwright/experimental-ct-react';
import { HelloWorld } from '../../src/components/HelloWorld';

test.describe('HelloWorld Component Tests', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toHaveText('Hello, World!');
    await expect(component.locator('.hello-world__subheading')).toHaveText('Welcome to our application');
  });

  test('should render with custom message', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        message="Welcome to TypeScript!"
        subheading="Building modern web applications"
      />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Welcome to TypeScript!');
    await expect(component.locator('.hello-world__subheading')).toHaveText('Building modern web applications');
  });

  test('should render without subheading when not provided', async ({ mount }) => {
    const component = await mount(
      <HelloWorld 
        message="Hello!"
        subheading={undefined}
      />
    );

    await expect(component.locator('.hello-world__heading')).toHaveText('Hello!');
    await expect(component.locator('.hello-world__subheading')).not.toBeVisible();
  });

  test('should have proper ARIA attributes for accessibility', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const section = component.locator('section[role="region"]');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Welcome section');

    const button = component.locator('button[aria-label="Get started with the application"]');
    await expect(button).toBeVisible();
  });

  test('should apply animation class when animated is true', async ({ mount }) => {
    const component = await mount(<HelloWorld animated={true} />);

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/, { timeout: 2000 });
  });

  test('should not animate when animated is false', async ({ mount }) => {
    const component = await mount(<HelloWorld animated={false} />);

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/hello-world--visible/);
  });

  test('should render button with correct text', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    const button = component.locator('.hello-world__button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Get Started');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(<HelloWorld className="custom-class" />);

    const section = component.locator('.hello-world');
    await expect(section).toHaveClass(/custom-class/);
  });

  test('should have BEM class naming structure', async ({ mount }) => {
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__container')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__subheading')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<HelloWorld />);

    const button = component.locator('.hello-world__button');
    
    await button.focus();
    await expect(button).toBeFocused();
    
    await page.keyboard.press('Enter');
  });

  test('should handle button click interaction', async ({ mount }) => {
    let clicked = false;
    
    const component = await mount(
      <HelloWorld />
    );

    const button = component.locator('.hello-world__button');
    await button.click();
    
    await expect(button).toBeVisible();
  });
});

test.describe('HelloWorld Responsive Design Tests', () => {
  test('should render correctly on mobile viewport (375px)', async ({ mount, page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });

  test('should render correctly on tablet viewport (768px)', async ({ mount, page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
  });

  test('should render correctly on desktop viewport (1440px)', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
  });

  test('should render correctly on small mobile viewport (320px)', async ({ mount, page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    
    const component = await mount(<HelloWorld />);

    await expect(component.locator('.hello-world')).toBeVisible();
    await expect(component.locator('.hello-world__heading')).toBeVisible();
    await expect(component.locator('.hello-world__button')).toBeVisible();
  });
});