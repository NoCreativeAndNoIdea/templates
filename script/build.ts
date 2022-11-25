import {resolve as _resolve} from 'path'
import type {OutputOptions, RollupBuild} from 'rollup'
import {rollup} from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import {RenameScss} from './plugin'

const resolve = (path: string) => _resolve(__dirname, path)

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)))
}

const inputPath = resolve('../src/index.ts')
const output = resolve('../dist/')

const PKG_NAME = 'rc-component'

const buildConfig = {
  esm: {
    module: 'es6',
    format: 'esm',
    ext: 'js',
    output: {
      name: 'es',
      path: output,
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
}

export async function compilerReact() {
  const bundle = await rollup({
    input: inputPath,
    treeshake: false,
    external: ['react', 'react-dom'],
    plugins: [
      RenameScss(),
      esbuild({
        platform: 'browser',
        target: 'es6',
        jsx: 'transform',
        jsxDev: true,
        treeShaking: true,
      }),
    ],
  })

  await writeBundles(
    bundle,
    Object.entries(buildConfig).map(([module, config]) => ({
      format: config.format,
      dir: config.output.path,
      exports: module === 'cjs' ? 'named' : undefined,
      preserveModules: true,
      entryFileNames: `[name].${config.ext}`,
    })),
  )
}

export async function generateDts() {
  const bundle = await rollup({
    input: inputPath,
    external: ['react', 'react-dom'],
    plugins: [RenameScss(), dts()],
  })

  await writeBundles(bundle, [
    {
      format: 'es',
      dir: output,
      preserveModules: true,
      entryFileNames: `[name].d.ts`,
    },
  ])
}

export async function buildReact() {
  await compilerReact()
  await generateDts()
}
