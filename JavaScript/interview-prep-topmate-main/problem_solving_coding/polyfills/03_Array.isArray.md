### Array.isArray:

**Definition:** Determines whether the passed value is an Array

```js
//Syntax:
Array.isArray(value);
```

<strong>Approach Taken:</strong>


One common approach is to use the `Object.prototype.toString.call()` method to get the object type as a string and check if it is "[object Array]". Here is an example implementation:

```javascript
//customArray function is the correct way
Array.customArray = function (input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};

console.log('Array.isArray([])', Array.isArray([])); //true
console.log('Array.isArray({})', Array.isArray({})); //false
console.log('Array.customArray([])', Array.customArray([])); //true
console.log('Array.customArray({})', Array.customArray({})); //false
```

```js
//if you want to achieve prototype fashion then below is the way
Array.prototype.customArray = function () {
  return Object.prototype.toString.call(this) === '[object Array]';
};

const arr = [];
console.log('arr.customArray', arr.customArray()); //true
const obj = {};
console.log('obj.customArray', obj.customArray); // undefined
```
