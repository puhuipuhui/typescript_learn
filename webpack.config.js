const path = require('path')

const HTMlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const {clean}
module.exports = {
  mode: "production",
  // 入口
  entry: "./src/index.ts",

  devtool: "inline-source-map",

  // 输出
  output: {
    path: path.resolve(__dirname, "./dist"), // 生产模式需要输出
    filename: "[name].main.js", // 将 js 文件输出到 js 目录中
    clean: true,
  },
  // 打包不使用箭头函数、const关键字
  // environment: {
  //   arrowFunction: false,
  //   const: false
  // },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          // 配置babel
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 兼容浏览器
                  targets: {
                    "chrome": "58",
                    "ie": "11"
                  },
                  "corejs": "3",
                  // 使用corejs的方式 "usage" 表示按需加载
                  "useBuiltIns": "usage"
                }
              ]
            ]
          }
        },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env", {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"]
      }
    ]
  },
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"]
  },

  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMlWebpackPlugin({
      template: "./src/index.html"
    }),
  ],
  performance: {
    hints: false,
  },
}