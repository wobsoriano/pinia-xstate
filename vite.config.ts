import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

const resolvePath = (str: string) => path.resolve(__dirname, str);

const isProd = process.env.NODE_ENV === 'production';

const devConfig = defineConfig({
  plugins: [
    vue(),
    dts({
      compilerOptions: {
        exclude: resolvePath('node_modules/**'),
      },
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue']
    })
  ],
  build: {
    outDir: 'dist-demo',
  }
  // base: '/pinia-xstate/',
});

const prodConfig = defineConfig({
  build: {
    lib: {
      entry: resolvePath('lib/index.ts'),
      name: 'pinia-xstate',
      fileName: (format) => `pinia-xstate.${format}.js`,
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
      compilerOptions: {
        rootDir: resolvePath('lib'),
        exclude: resolvePath('node_modules/**'),
      },
      include: ['./lib']
    })
  ],
});

export default isProd ? prodConfig : devConfig;