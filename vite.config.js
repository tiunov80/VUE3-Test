/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
// import Inspect from 'vite-plugin-inspect' // если понадобится

import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => {
  const isStorybook = process.env.STORYBOOK === 'true';

  return {
    plugins: [
      vue(),
      !isStorybook && vueDevTools(),
      // !isStorybook && Inspect(), // <-- если будешь подключать vite-plugin-inspect
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['.storybook/vitest.setup.js'],
          },
        },
      ],
    },
  };
});
