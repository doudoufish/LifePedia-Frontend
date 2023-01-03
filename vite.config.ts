import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'
const { VITE_PWA_SETTING } = require('./src/pkg/env')

export default defineConfig({
	server: { port: 4147, strictPort: true, cors: true, open: false },
	preview: { port: 4147, strictPort: true, cors: true, open: false },
	plugins: [react(), eslint(), tsconfigPaths(), VitePWA(VITE_PWA_SETTING)],
	build: { chunkSizeWarningLimit: 1000 },
})
