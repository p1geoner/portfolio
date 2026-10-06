import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import tseslint from 'typescript-eslint';

/** Слои FSD от верхнего к нижнему. */
const FSD_LAYERS = [
  'app',
  'pages',
  'widgets',
  'features',
  'entities',
  'shared',
];

/**
 * Импорт мимо публичного API слайса: @/entities/project/model/registry
 * вместо @/entities/project. Запрещено на всех слоях, кроме shared,
 * где сегменты сами являются публичным API.
 */
const deepImportPatterns = FSD_LAYERS.filter((layer) => layer !== 'shared').map(
  (layer) => ({
    group: [`@/${layer}/*/*`],
    message: `Импортируйте слайс через публичный API: @/${layer}/<slice>.`,
  })
);

/**
 * Правило зависимостей FSD: слой видит только слои ниже себя, а импорт
 * соседнего слайса того же слоя запрещён. Реализовано штатным
 * no-restricted-imports, чтобы не тащить плагин, зависящий от резолвера
 * eslint-plugin-import (он конфликтует с настройками eslint-config-next).
 */
const layerBoundaries = FSD_LAYERS.map((layer, index) => {
  const upperLayers = FSD_LAYERS.slice(0, index);
  const forbidden = [
    ...upperLayers.map((upper) => ({
      group: [`@/${upper}/*`, `@/${upper}`],
      message: `Слой «${layer}» не может зависеть от слоя «${upper}»: разрешены только слои ниже.`,
    })),
    ...(layer === 'shared'
      ? []
      : [
          {
            group: [`@/${layer}/*`],
            message: `Кросс-импорт внутри слоя «${layer}» запрещён: поднимите общий код на слой ниже.`,
          },
        ]),
  ];

  return {
    files: [`src/fsd/${layer}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [...deepImportPatterns, ...forbidden] },
      ],
    },
  };
});

export default tseslint.config(
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },

  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            'Вместо enum используйте union-тип или объект as const: они лучше стираются в рантайме.',
        },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },

  ...layerBoundaries,

  // Конфиги контента и скрипты — данные и инструменты, не продакшн-код.
  {
    files: ['content/**/*.ts', 'scripts/**/*.ts', '*.config.{ts,mjs,cjs}'],
    rules: {
      'no-console': 'off',
      'no-restricted-imports': 'off',
    },
  },

  // Конфиги инструментов не входят в программу TypeScript,
  // поэтому типизированные правила к ним не применяются.
  {
    files: ['**/*.{mjs,cjs,js}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
);
