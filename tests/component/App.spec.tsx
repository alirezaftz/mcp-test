import { test, expect } from '@playwright/experimental-ct-react';
import { App } from '../../src/App';
import React from 'react';

test.describe('App Component - Playwright Tests', () => {
  test('should render the app component', async ({ mount }) => {
    const component = await mount(<App />);

    await expect(component.locator('main.app')).toBeVisible();
  });

  test('should render HelloWorld component inside App', async ({ mount }) => {
    const component = await mount(<App />);

    await expect(component.locator('[data-testid="hello-world-section"]')).toBeVisible();
    await expect(component.locator('h1')).toHaveText('Hello World');
  });

  test('should pass correct props to HelloWorld', async ({ mount }) => {
    const component = await mount(<App />);

    await expect(component.locator('[data-testid="hello-world-heading"]')).toHaveText('Hello World');
    await expect(component.locator('[data-testid="hello-world-subtitle"]')).toHaveText('Welcome to your first React TypeScript application');
  });

  test('should use semantic main element', async ({ mount }) => {
    const component = await mount(<App />);

    const main = component.locator('main');
    await expect(main).toBeVisible();
    await expect(main).toHaveClass('app');
  });

  test('should render interactive button from HelloWorld', async ({ mount }) => {
    const component = await mount(<App />);

    const button = component.locator('[data-testid="hello-world-button"]');
    await expect(button).toBeVisible();
    
    await button.click();
    await expect(component.locator('[data-testid="hello-world-counter"]')).toBeVisible();
  });
});