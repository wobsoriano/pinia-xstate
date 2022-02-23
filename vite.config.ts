import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const resolvePath = (str: string) => path.resolve(__dirname, str)

const prodConfig = defineConfig({
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'pinia', 'xstate'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'pinia',
          xstate: 'xstate',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})

export default prodConfig
