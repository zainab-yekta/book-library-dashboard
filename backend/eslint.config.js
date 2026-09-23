module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
        console: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
];
