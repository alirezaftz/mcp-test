import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';

test.describe('Smoke Test', () => {
  test('playwright component testing is working', async ({ mount }) => {
    const component = await mount(<div data-testid="smoke-test">Smoke Test</div>);
    await expect(component.getByTestId('smoke-test')).toHaveText('Smoke Test');
  });
});