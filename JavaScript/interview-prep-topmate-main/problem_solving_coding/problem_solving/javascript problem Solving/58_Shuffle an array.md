## Shuffle the array

#### Simple Solution, which returns only one of the shuffled array

```js
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randIdx = Math.floor(Math.random() * (i + 1));
    const storedItem = arr[i];
    arr[i] = arr[randIdx];
    arr[randIdx] = storedItem;
  }

  return arr;
}

// Example usage:
const myArray = [1, 2, 3, 4];
console.log('shuffle', shuffle(myArray));
```

---

#### Simple Solution, which returns all the permutations of shuffled array

```js
function generatePermutations(
  inputArr,
  n = inputArr.length,
  currentArr = [],
  resultArr = []
) {
  // logic 1, based on one condition we need to push to resultArr
  if (currentArr.length === n) {
    resultArr.push([...currentArr]);
    return;
  }

  for (let i = 0; i < inputArr.length; i++) {
    // logic 2, based on one condition we need to push to currentArr
    if (!currentArr.includes(inputArr[i])) {
      currentArr.push(inputArr[i]);
      //core logic is recursion
      generatePermutations(inputArr, n, currentArr, resultArr);
      //logic 3, currentArr.pop()
      currentArr.pop();
    }
  }

  // never forget to return something in your functions
  return resultArr;
}

// Example usage:
const myArray = [1, 2, 3, 4];
const permutations = generatePermutations(myArray);
console.log('Total Permutations for [1,2,3,4] are ', permutations.length);
permutations.forEach((permutation) => console.log(permutation));
```
