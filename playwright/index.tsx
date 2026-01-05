import React from 'react';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import '../src/App.css';
import '../src/components/HelloWorld.css';

beforeMount(async ({ App }) => {
  return <App />;
});