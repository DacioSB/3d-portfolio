import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js and related libraries
          'three': ['@react-three/fiber', '@react-three/drei'],
          // Separate animation libraries
          'animation': ['framer-motion'],
          // Separate UI libraries
          'ui': ['react-tilt', 'react-parallax-tilt', 'react-vertical-timeline-component'],
          // Separate email functionality
          'email': ['@emailjs/browser']
        }
      }
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  // Enable compression
  server: {
    compress: true
  }
})
