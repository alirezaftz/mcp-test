import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';

beforeMount(async ({ App }) => {
  return <App />;
});

afterMount(async () => {});