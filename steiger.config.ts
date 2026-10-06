import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Слайсы описываются постепенно: пустые сегменты не считаем ошибкой.
    files: ['./src/fsd/**'],
    rules: {
      'fsd/no-public-api-sidestep': 'error',
      'fsd/public-api': 'error',
      'fsd/forbidden-imports': 'error',
      'fsd/insignificant-slice': 'off',
      'fsd/repetitive-naming': 'off',
    },
  },
]);
