import type {Plugin} from 'rollup'

export function RenameScss(): Plugin {
  return {
    name: 'rc-rename-scss',
    resolveId(id) {
      if (id.includes('scss')) {
        return {
          id: id.replaceAll('scss', 'css'),
          external: 'absolute',
        }
      }
      return null
    },
  }
}
