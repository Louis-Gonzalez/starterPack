import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('Nuxt Test', async () => {
  await setup();

  it('Homepage fonctionne', async () => {
    const html = await $fetch('/');
    expect(html).toContain('home');
  });
});
