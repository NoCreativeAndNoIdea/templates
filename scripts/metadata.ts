export interface MetadataItem {
  name: string
  entry: string
  formats: Array<'es' | 'cjs' | 'iife'>
}

export default [
  {
    name: 'shared',
    entry: 'src/index.ts',
    formats: ['es', 'umd', 'iife'],
  },
] as MetadataItem[]
