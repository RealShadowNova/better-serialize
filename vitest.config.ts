import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'clover'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**', '**/.yarn/**']
    }
  },
  esbuild: {
    target: 'es2022'
  }
});
