import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: 'happy-dom',
		globals: true,
		setupFiles: ['tests/setupTests.js'],
		include: [
			'src/**/*.{test,spec}.{js,ts,vue}',
			'tests/**/*.{test,spec}.{js,ts,vue}',
		],
	},
})
