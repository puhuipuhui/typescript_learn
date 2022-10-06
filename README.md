# 面向对象

通过将复杂的事情，描述成对象的行为，通过数据和行为构成对象。

## 定义类

```javascript
class 类名 {
    属性名: 类型;
    
    constructor(参数: 类型){
        this.属性名 = 参数;
    }
    
    方法名(){
        //....
    }
}
```

在类中，`this`表示当前实例对象
示例

```javascript
    class Person{
        name: string;
        age: number;
    
        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
```

使用类

```javascript
// new关键字 调用构造函数
const p = new Person('孙悟空', 18);
p.sayHello();
```

简写
使用`constructor`定义一个构造器方法

```javascript
class Person{
	constructor(public name: string, public age: number) {
}
    
	sayHello(){
   		console.log(`大家好，我是${this.name}`);
	}
}
```

## 修饰符

1、静态属性（static）：

* 声明为`static`的属性或方法不再属于实例，而是属于类；

2、只读属性（readonly）：

* 如果在声明属性时添加一个	`readonly`，则属性便成了只读属性无法修改

3、`TS`中属性具有三种修饰符：

* public（默认值），可以在类、子类和对象中修改
* protected ，可以在当前类、当前子类中修改
* private ，可以在当前类中修改

4、示例
public

```javascript
const p = new Person('孙悟空', 18,'男');
p.name = '猪八戒';// 可以通过对象修改

```

protected

```javascript
const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```

private 

```javascript
// 子类
class Employee extends Person{
    // ......
    setName(){
    	this.name = name; //子类中不能修改
    }
}
const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```

## 属性存取器

由于可能会出现用户填写数字不合法的情况，例如：年纪为负数。
因此，某些情况下不允许用户直接修改属性值，而是通过封装方法改变属性值（在方法内部实现判断）。

```javascript
class Person{
    private _age: number;

    constructor(age: number){
        this._age = age;
    }

    get age(){
        return this._age;
    }

    set age(value: string){
    	if(value >= 0){
    	     this._age= value;
    	}
    }

}

const p1 = new Person(15);
// 实际通过调用getter方法读取age属性
console.log(p1.age);
// 实际通过调用setter方法修改age属性 
p1.name = 89; 
```

## 静态属性

静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用

静态属性（方法）使用`static`开头
示例：

```javascript
class Tools{
    static PI = 3.1415926;
    
    static sum(num1: number, num2: number){
        return num1 + num2
    }
}

console.log(Tools.PI);
console.log(Tools.sum(123, 456));
```


## 继承

为了减少代码重复率，提高开发效率，使用继承父类，子类便可以使用父类的属性和方法

示例：

```javascript
class Animal{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}

class Dog extends Animal{

    bark(){
        console.log(`${this.name}在汪汪叫！`);
    }
}

const dog = new Dog('旺财', 4);
dog.bark();
```

上述代码实现了继承，还可以在不修改类的情况下完成对类的扩展

当子类需要对父类的属性做补充时，需要在子类写构造函数完成属性值设置，并在构造函数中调用父类`super(参数)`。

## 重写

发生继承时，子类中方法会替换掉父类中的同名方法，这就称为方法的重写

```javascript
class Animal{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    run(){
        console.log(`父类中的run方法！`);
    }
}

class Dog extends Animal{

    bark(){
        console.log(`${this.name}在汪汪叫！`);
    }

    run(){
        console.log(`子类中的run方法，会重写父类中的run方法！`);
    }
}

const dog = new Dog('旺财', 4);
dog.run();// 子类中的run方法，会重写父类中的run方法！
```

在子类中可以使用`super`来完成对父类的引用

## 抽象类（abstract class）

使用`abstract`关键字开头，表示抽象类、抽象方法。

* 抽象类可以包含声明抽象方法、普通方法；
* 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例；
* 抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现。

```javascript
abstract class Animal{
  abstract run(): void;
  bark(){
      console.log('动物在叫~');
  }
}

class Dog extends Animals{
  run(){
      console.log('狗在跑~');
  }
}
```

## 接口（Interface）

接口主要负责定义一个类的结构，接口可以去限制一个对象。
使用`Interface`关键字开头，接口的作用类似于抽象类。
不同点在于：接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法；

```javascript
interface Person{
   name: string;
   sayHello():void;
}

class Student implements Person{
// 区别于继承：extends 
   constructor(public name: string) {
   }

   sayHello() {
       console.log('大家好，我是'+this.name);
   }
}
```

## 泛型（Generic）

泛型是**任意类型**，可以说是类型变量，根据传递的值的类型自动识别泛型所表示的**类型**

### 泛型函数

当定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时需要使用泛型。

```typescript
function test(arg: any): any{
    return arg;
}
```

由于**参数**和**返回值**类型不确定，使用`any`，但是很明显这样做是不合适的：首先使用`any`会关闭`TS`的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型。

泛型的使用：定义+使用，其中括号`<>`表示**定义**泛型，使用泛型前必须定义

```typescript
function test<T>(arg: T): T{
    return arg;
}
```

`T`的类型值是参数`arg`的类型，例如，参数`arg = 10`，则`T === number`。

泛型函数调用

```typescript
test(10) // TS 自动推断T的值
test<number>(10) // 手动指定泛型
```

多个泛型

```javascript
function test<T, K>(a: T, b: K): K{
  return b;
}

test<number, string>(10, "hello");
```

### 泛型类

```javascript
class MyClass<T>{
  prop: T;

  constructor(prop: T){
      this.prop = prop;
  }
}

const myc = new MyClass('嘻嘻嘻') // TS 自动判断 T 是 String 类型
const myc = new MyClass<string>('嘻嘻嘻') //直接指定 T是 String
```

继承

```js
interface MyInter{
  length: number;
}

function test<T extends MyInter>(arg: T): number{
  return arg.length;
}
test('123') // 字符串'123'有length 属性
test({length:10}) // 对象有length 属性，值为 10
```
