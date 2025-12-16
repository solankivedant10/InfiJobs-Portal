import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      host: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // 👇 New Build Optimizations
    build: {
      chunkSizeWarningLimit: 1000, // Increase limit to 1MB to silence warning
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries into separate chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react', 'react-markdown'],
            'ai-vendor': ['@google/genai'],
          },
        },
      },
    },
  };
});