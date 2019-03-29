module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    "vue/html-self-closing": ["error", {
      "html": {
          "normal": "always",      // HTML elements. E.g. <div/>
          "void": "always",        // HTML void elements. E.g. <img/>>
          "components": "always", // Vue.js components.
      },
      "svg": "always",
      "math": "always",
    }]
  },
}
