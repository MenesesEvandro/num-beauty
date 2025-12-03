/* eslint-env node */
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
    plugins: [svelte({ hot: !process.env.VITEST }) as any],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [],
    },
});
