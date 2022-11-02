import {defineConfig, mergeConfig} from 'vite'
import vitestConfig from './vitst.config'

export default mergeConfig(defineConfig({}), vitestConfig)
