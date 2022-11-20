import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      preprocess (matcher) {
        return matcher.startsWith('mochi-')
          ? matcher.slice(6)
          : undefined // ignore
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
