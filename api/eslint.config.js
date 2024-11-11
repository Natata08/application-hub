import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    languageOptions: { globals: globals.node },
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  },
  pluginJs.configs.recommended,
]
