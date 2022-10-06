# TypeScript 打包（webpack）

## webpack 打包

1、构建工具

```cmd
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin
```

共安装了7个包:

webpack：构建工具 webpack
webpack-cli：webpack 的命令行工具
webpack-dev-server：webpack 的开发服务器
typescript：ts 编译器
ts-loader：ts 加载器，用于在 webpack 中编译 ts 文件
html-webpack-plugin：webpack 中 html 插件，用来自动创建 html 文件
clean-webpack-plugin：webpack 中的清除插件，每次构建都会先清除目录

2、配置 webpack
根目录下创建 `webpack`的配置文件`webpack.config.js`：

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
   optimization:{
       minimize: false // 关闭代码压缩，可选
   },

   entry: "./src/index.ts",

   devtool: "inline-source-map",

   devServer: {
       contentBase: './dist'
   },

   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",
       environment: {
           arrowFunction: false // 关闭webpack的箭头函数，可选
       }
   },

   resolve: {
       extensions: [".ts", ".js"]
   },

   module: {
       rules: [
           {
               test: /\.ts$/,
               use: {
                   loader: "ts-loader"     
               },
               exclude: /node_modules/
           }
       ]
   },

   plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
           title:'TS测试'
       }),
   ]
}
```

3、配置 TS 编译选项
根目录下创建`tsconfig.json`，配置可以根据自己需要

```javascript
{
   "compilerOptions": {
       "target": "ES2015",
       "module": "ES2015",
       "strict": true
   }
}
```

4、修改 package.json 配置
修改 `package.json` 添加如下配置

```javascript
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       // webpack 打包 
       "build": "webpack",
       // webpack 服务器启动 并在谷歌启动 实时打包并更新页面
       "start": "webpack serve --open chrome.exe"
   },
```

## Babel 适配

除了`webpack`，开发中还经常需要结合`babel`来对代码进行转换，以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将`babel`引入到项目中；

> TS 编译成 JS 代码，只支持部分代码简单的转换，
> 对于例如：Promise 等 ES6 特性，TS 无法直接转换，这时还要用到 babel 来做转换；

安装依赖包：

```javascript
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

共安装了4个包，分别是：

@babel/core：babel 的核心工具

@babel/preset-env：babel 的预定义环境

@babel-loader：babel 在webpack 中的加载器

core-js：core-js 用来使老版本的浏览器支持新版 ES 语法

修改`webpack.config.js`配置文件:

```javascript
module: {
    rules: [
        {
            test: /\.ts$/,
            use: [
                {
                    loader: "babel-loader",
                    options:{
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets":{
                                    // 指定要兼容的浏览器版本；
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    "corejs":"3",
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                {
                    loader: "ts-loader",

                }
            ],
            exclude: /node_modules/
        }
    ]
}
```

以上代码解决浏览器兼容问题，在配置选项的`targets`中指定要兼容的浏览器版本；
