## String.prototype.endsWith:

<strong>Approach Taken:</strong>

```js
//syntax:
endsWith(searchString, endPosition);
```

- if no position is provided then we are considering length as the entire string length ex: 11 for "Hello world" and using this length for substring calculation.
- this.substring(entire string length - search.length, entire string length)
  ex: "Hello world".substring(6, 11) === "world"

```js
if (!String.prototype.customEndsWith) {
  String.prototype.customEndsWith = function (search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      // if no position is provided then consider it as Entire string length ex: 11 for Hello world
      this_len = this.length;
    }
    // "Hello world".substring(6, 11) === "world"
    return this.substring(this_len - search.length, this_len) === search;
  };
}

// Example Usage
const str1 = 'Cats are the best!';

console.log(str1.customEndsWith('best!'));
// Expected output: true

console.log(str1.customEndsWith('best', 17));
// Expected output: true

const str2 = 'Is this a question?';

console.log(str2.customEndsWith('question'));
// Expected output: false

console.log('--------------------------------------');

// //Example 2:
const str = 'To be, or not to be, that is the question.';

console.log(str.customEndsWith('question.')); // true
console.log(str.customEndsWith('to be')); // false
console.log(str.customEndsWith('to be', 19)); // true
```
