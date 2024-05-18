## String.prototype.startsWith:

**Definition**: Determines whether this string begins with the characters of a specified string, returning `true` or `false` as appropriate.

```js
//syntax:
startsWith(searchString, position);
```

<strong>Approach Taken:</strong>

- String.prototype is equal to a function that accepts two arguments, first one is what you want to search and second arg is from which position you want to start ex: 0 or 1 or 10...
- if no position is passed, consider it as 0, else consider whatever is passed (ex: ternay operator)
- this keyword points to the complete string and we can do .substring to this with pos, pos+ search.length and do triple equal check with the passed argument

ex: "Hello world".substring(0, 5) === "Hello" which returns true

```js
if (typeof String.prototype.customStartsWith !== 'function') {
  String.prototype.customStartsWith = function (search, rawPos) {
    var pos = rawPos > 0 ? rawPos : 0;
    // this.substring(pos, pos + search.length) is nothing but
    // "Complete string passed in the left".substring(pos, 1+pos) ex: "Hello" if no pos is passed === "String you passed in right" ex: "Hello"
    return this.substring(pos, pos + search.length) === search;
  };
}

// Example Usage
const str = 'To be, or not to be, that is the question.';

console.log(str.customStartsWith('To be')); // true
console.log(str.customStartsWith('not to be')); // false
console.log(str.customStartsWith('not to be', 10)); // true, because at index 10 it starts with `not to be`
```
