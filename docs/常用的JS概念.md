## new操作发生了些什么
1. 新建一个object，原型是 object
2. 将这个新建的object的原型(__proto__)指向constructor的原型(prototype)
3. 将this这个变量指向这个新建的object
4. 执行构造函数中的方法
5. 除非构造函数显示的返回的一个非空非null的引用，否则返回这个对象

## Object.create(prototype, descriptors)
返回一个具有指定的内部原型且包含指定的属性的新对象

## 对象 key 的遍历
```javascript
// 这两个都会遍历原型链上的属性（不包含方法）
Object.keys()
for (let key in obj) {
  console.log(key)
}
// 只会获得对象本身的key，不包含原型链
Object.getOwnPropertyNames()
// 箭头函数不能用作 构造函数是因为缺少[[construct]]属性
() => {}
```
1. for...in
　　for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
2. Object.keys(obj)
　　Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
3. Object.getOwnPropertyNames(obj)
　　Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
4. Object.getOwnPropertySymbols(obj)
　　Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
5. Reflect.ownKeys(obj)
　　Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

## 检测屏幕分辨率
window.devicePixelRatio

## flatten
```javascript
const flatten = arr => arr.reduce((flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next), [])
Array.prototype.flatten = function() {
  return this.reduce((flat, next) => flat.concat(Array.isArray(next) ? next.flatten() : next), [])
}
// 非递归实现
function flatten(arr) {
  const stack = [...arr].reverse()
  const copy = []
  while (stack.length) {
    let o = stack.pop()
    if (Array.isArray(o)) {
      stack.push(...o.reverse())
    } else {
      copy.push(o)
    }
  }
  return copy
}
```

## let var const 的转换(bebel实现)
```javascript
// ES6
let a = 13
{
    let a = 12
}
// 转换ES5
var a = 13;
{
    var a_1 = 12;
}
```

## js中的作用域
1. 函数作用域
2. try catch
3. with
4. let foo = funciton bar() {}
5. 函数参数默认值的 function(name = 'Treasure') {}

## 自行实现Symbol.iterator
```javascript
// [...3] => [1, 2, 3]
Number.prototype[Symbol.iterator] = function () {
    var self = this;
    var index = 0;
    return {
        next: function () {
            if (index < self) {
                index++;
                return { value: index, done: false };
            }
            else {
                return { value: undefined, done: true };
            }
        }
    };
};
console.log([...3]);
```

## javascript使用UTF-16进行编码