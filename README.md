# 基本类型

指定变量的类型，使得变量只存储某种类型的值

## 语法

```javascript
let 变量: 类型;

let 变量: 类型 = 值;

function fn(参数: 类型, 参数: 类型): 类型{
    ...
}
```

##  自动类型判断

（1）`TS`拥有自动的类型判断机制；
（2）如果变量声明和赋值同时进行，`TS`编译器会自动判断变量的类型，可以省略掉类型声明

##  类型种类

类型	  |例子  |	描述
|--|--|--|
number	  |1, -33, 2.5 |	任意数字
string	  |'hi', "hi", hi |	任意字符串
boolean  |	true、false	| 布尔值
字面量	  |其本身|	限制变量的值就是该字面量的值
any  |	*	|任意类型
unknown	  |*|	类型安全的any
void	  | 空值（undefined）	| 没有值（或undefined）
never   |	没有值 |	不能是任何值
object  |	{name:'孙悟空'}	| 任意的JS对象
array  |	[1,2,3]	| 任意JS数组
tuple  |	 [4,5]	 | TS 新增元组类型，**固定**长度数组
enum  |	enum{A, B}	| 枚举，TS 中新增类型

【案例】

```javascript
 // 1、number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;

// 2、boolean
let isDone: boolean = false;

// 3、string
let color: string = "blue";
color = 'red';

// 4、string 
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}`

// 5、字面量
// 可以使用 或语法 包含的所有字符
let color: 'red' | 'blue' | 'black';
let num: 1 | 2 | 3 | 4 | 5;

// 6、any
let d: any = 4;
d = 'hello';
d = true;
// 7、unknown
let notSure: unknown = 4;
notSure = 'hello';

// 8、void
// 定义函数时，表示没有返回值，可以为 unknown 、null
let unusable: void = undefined;


// 9、never
// 定义函数时，表示不返回，甚至不可以为 unknown 、null
function error(message: string): never {
  throw new Error(message);
}

// 10、对象 object（没啥用） 
let obj: object = {};
// {} 用来指定对象中可以包含哪些类型
let b:{name:string,age?:number}
b={name:'猪八戒'}
// [proName:String]: any 表示任意类型属性
let c:{name:string,age?:number,[somename:string]:any}
c={name:'猪八戒',age: 23,gander: 'man'}

// 11、array 对象类型
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// 12、tuple 元组
let x: [string, number];
x = ["hello", 10]; 

// 13、enum 枚举
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

## 类型断言

有些情况下，变量的类型对于我们来说是很明确，但是`TS`编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

（1）`as` 语法

```javascript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

（2）`<>` 语法

```javascript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```
