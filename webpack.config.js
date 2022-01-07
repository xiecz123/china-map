const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/main",
  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "./dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "[name].[hash:6].js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    publicPath: "/", // string   // 输出解析文件的目录，url 相对于 HTML 页面
    // library: "MyLibrary", // string,    // 导出库(exported library)的名称
    // libraryTarget: "umd", // 通用模块定义    // 导出库(exported library)的类型
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js?$/,
  //       use: ["babel-loader"],
  //       exclude: [path.resolve(__dirname, "node_modules")],
  //     },
  //   ],
  // },
  devtool: "cheap-source-map",
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //不删除dll目录下的文件
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
