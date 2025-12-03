import { createUnplugin } from 'unplugin';
import { transform } from './core/transform';

export const unplugin = createUnplugin(() => {
    return {
        name: 'num-beauty-macro',
        transformInclude(id) {
            return /\.(js|ts|jsx|tsx|mjs|cjs)$/.test(id);
        },
        transform(code, id) {
            return transform(code, id);
        },
    };
});

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
