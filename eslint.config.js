import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  { ignores: ['dist/', 'coverage/', 'demo/'] },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    rules: {
      // disableAnimation and similar long prop names are intentional
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }
);
