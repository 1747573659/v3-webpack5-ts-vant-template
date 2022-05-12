module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "prettier/prettier": "off",
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 'off',
    "@typescript-eslint/no-explicit-any": ["off"],
    // 'nonblock-statement-body-position': 1,
    'object-curly-spacing': 'off',
    "vue/no-use-v-if-with-v-for": ["error", {
      "allowUsingIterationVar": true
    }],
    // 这里不错提示，生产环境打包时直接把console.log去掉
    'no-console': 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: 2, // 必须使用全等
    "no-empty": 0, // 不允许空作用域
    // 'no-var': 2, // 不允许使用var
    "spaced-comment": ["error", "always"], // 注释后面加空格
    "space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
    'indent': 'off'

  }
}
