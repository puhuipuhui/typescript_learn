# 编译选项

## 编译指定文件

编译文件时，使用 `-w` 指令后，`TS`编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

1、编译

```cmd
// 安装
npm install -g typescript
```

2、编译

```javascript
// 编译 xxx.ts 为 xxx.js文件 ,并监听该文件
  tsc xxx.ts -w
```

## 编译整个项目（自动）

如果终端直接 使用`tsc`指令，则可以自动将当前项目下的所有`ts`文件编译为`js`文件。
但是能直接使用`tsc`命令的前提是：要先在项目根目录下创建一个`ts`的配置文件 `tsconfig.json`

`tsconfig.json`的配置示例：

```json
// 所有`src`目录和`tests`目录下的文件都会被编译
"include":["src/**/*", "tests/**/*"]
"exclude": ["./src/hello/**/*"]
"extends": "./configs/base"
"files": [
    "core.ts",
    "sys.ts"
  ],
"compilerOptions": {
    "target": "ES6"
}
```

## 配置选项

### include

* 定义希望被编译文件所在的目录
* 默认值：["**/*"]

```json
  "include":["src/**/*", "tests/**/*"]
```

上述示例中，所有`src`目录和`tests`目录下的文件都会被编译

### exclude

* 定义不被编译排除的目录
* 默认值：["node_modules", "bower_components", "jspm_packages"]

```json
  "exclude": ["./src/hello/**/*"]
```

上述示例中，`src`下`hello`目录下的文件都不会被编译

### files

* 指定被编译文件的列表，只有需要编译的文件少时才会用到

```json
"files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "tsc.ts"
  ]
```

上述列表中的文件都会被`TS`编译器所编译

### compilerOptions

* 编译选项是配置文件中重要、复杂的配置选项
* 在`compilerOptions`中包含多个子选项，完成对编译的配置

 项目选项：`target`、`lib`、`module`、`outDir`、`outFile`、`allowJs`、`checkJs`、`removeComments`、`noEmit`、`sourceMap`、……

 **target**

 * 设置`ts`代码编译的目标版本
 * 可选值：
   ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext
 * 示例：

```javascript
"compilerOptions": {
    "target": "ES6"
}
```

**lib**（一般设置，用默认配置）

* 指定代码运行时所包含的库（宿主环境）
* 可选值：
  ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......
* 示例：

```javascript
"compilerOptions": {
    "target": "ES6",
    "lib": ["ES6", "DOM"],
}
```

**module**

* 设置编译后代码使用的模块化系统
* 可选值：
  CommonJS、UMD、AMD、System、ES2020、ESNext、None
* 示例

```javascript
"compilerOptions": {
    "target": "ES6",
    "lib": ["ES6", "DOM"],
    "module": "CommonJS"
}
```

**outDir**

* 编译后文件的所在目录
* 默认情况下，编译后的`js`文件会和`ts`文件位于相同的目录，设置`outDir`后可以改变编译后文件的位置
* 示例：

```javascript
"compilerOptions": {
 	"target": "ES6",
    "lib": ["ES6", "DOM"],
    "module": "CommonJS"
    "outDir": "dist"
}
```

设置后编译后的`js`文件将会生成到`dist`目录

**outFile**

* 将所有的文件编译为一个`js`文件
* 默认会将所有的编写在全局作用域中的代码合并为一个`js`文件，如果`module`制定了`None`、`System`或`AMD`则会将模块一起合并到文件之中
* 示例：

```json
"compilerOptions": {
	"target": "ES6",
    "lib": ["ES6", "DOM"],
    "module": "CommonJS"
    "outDir": "dist"
    "outFile": "dist/app.js"
}
```

**allowJs**

* 是否对`js`文件编译

**checkJs**

* 是否对`js`文件进行检查
* 示例：

```javascript
"compilerOptions": {
    "allowJs": true,
    "checkJs": true
}
```

**removeComments**

* 是否删除注释
* 默认值：`false`

**严格检查**：`alwaysStrict`、`strict`

**noEmit**

* 不对代码进行编译
* 默认值：`false`

**noEmitOnError**

* 有错误的情况下不进行编译
* 默认值：`false`

# 
