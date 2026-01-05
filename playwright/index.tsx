import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';

beforeMount(async ({ App }) => {
  console.log('Before mount');
});

afterMount(async () => {
  console.log('After mount');
});