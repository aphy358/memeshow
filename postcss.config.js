module.exports = {
  plugins: {
    "postcss-import": {},
    autoprefixer: {},
    cssnano: {
      // 禁用 calc 插件，使得类似 width: calc(100% - 180rpx); 的代码不会报错
      preset: ['default', {
        calc: false,
      }],
    }
  }
};
