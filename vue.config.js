const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
  devServer: {
    port: process.env.VUE_APP_SERVER_PORT,
    allowedHosts: "all",
  },
  transpileDependencies: true,

  // ビルド結果パス
  outputDir: "dist",
  // リソースパス
  assetsDir: "static",
  // eslint-loader はファイルが保存されるときチェックするかどうか
  lintOnSave: false,
  // Prod環境場合、sourceMapファイルを生成するかどうか
  productionSourceMap: false,
  // ファイルhash
  filenameHashing: true,

  // webpackの設定
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
        const: "@/const",
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },

  chainWebpack: (config) => {
    config.module
      .rule("js")
      .include.add("/package/")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options;
      });

    config.module
      .rule("svg")
      .clear()
      .test(/\.(svg)(\?.*)?$/)
      .type("asset/inline");

    config.module
      .rule("images")
      .clear()
      .test(/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/)
      .type("asset/inline");
  },
});
