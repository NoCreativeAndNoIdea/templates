import {resolve as _resolve} from 'path'
import {defineConfig, mergeConfig} from 'vite'
import dts from 'vite-plugin-dts'
import vitestConfig from './vitst.config'

const resolve = (dir: string) => _resolve(__dirname, dir)

export default mergeConfig(
  defineConfig({
    resolve: {
      alias: {
        '~/': './src/**',
      },
    },
    build: {
      lib: {
        entry: resolve('src/main.ts'),
        name: 'dist',
        fileName: format => `lib.${format}.js`,
      },
      rollupOptions: {},
    },
    plugins: [dts({cleanVueFileName: true, insertTypesEntry: true})],
  }),
  vitestConfig,
)
