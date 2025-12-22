import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';

beforeMount(async ({ App }) => {
  console.log('beforeMount');
});

afterMount(async () => {
  console.log('afterMount');
});