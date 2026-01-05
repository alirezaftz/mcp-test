import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';
import '../src/index.css';

beforeMount(async ({ App }) => {
  console.log('Before mount');
});

afterMount(async () => {
  console.log('After mount');
});