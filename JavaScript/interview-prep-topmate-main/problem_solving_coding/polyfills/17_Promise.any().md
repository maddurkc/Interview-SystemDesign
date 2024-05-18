## Implement Promise.any polyfill

**Definition**: takes an `iterable of promises` as input and `returns a single Promise`. This returned promise fulfills when `any of the input's promises fulfills`, with this first fulfillment value. It rejects `when all of the input's promises reject` (including when an empty iterable is passed)

```js
//Syntax
Promise.any(iterable);
```

<strong>Approach Taken:</strong>

1. arrayOfPromises is passed as a param and do a forEach (ex: promisesArr.forEach(promise))
2. forEach promise do Promise.resolve(promise) and then do the following .then and .catch
3. as Promise.any rejects if all are rejected promise values, so we have to maintain an errorsArray (ex: errors.push(error)) inside the catch block
4. so when errors.length is equal to the passed promisesArray.length then return reject with Aggregate Error saying that all the promises are rejected.

```js
if (typeof Promise.customAny !== 'function') {
  Promise.customAny = function (promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('it will only accept arrays'));
      }
      if (promises.length === 0) {
        return reject(new TypeError('The array of promises cannot be empty'));
      }

      let errors = [];
      promises.forEach((promise) => {
        // The reason to use Promise.resolve(promise) is to ensure that the following .then and .catch methods can be consistently used, whether we are dealing with a promise or a plain value.
        // When a rejected promise is passed to Promise.resolve, it returns the same rejected promise.
        // It does not change a rejected promise into a resolved one or alter the promise in any way.
        // The .then method is skipped for rejected promises, and the .catch method is invoked instead.
        Promise.resolve(promise)
          .then((value) => resolve(value))
          .catch((error) => {
            errors.push(error);
            if (errors.length === promises.length) {
              return reject(
                new AggregateError(
                  errors,
                  'all the promises passed are of rejected'
                )
              );
            }
          });
      });
    });
  };
}

// Usage example
const p1 = Promise.reject('Failed 1');
const p2 = Promise.resolve('Succeed 2');
const p3 = Promise.reject('Failed 3');

Promise.customAny([p1, p2, p3])
  .then((value) => console.log(value)) // Logs: 'Succeed 2'
  .catch((error) => console.error(error));

// Example 2
const promise1 = Promise.reject('Failed 1');
const promise2 = 'Succeeded'; // This is a plain value, not a promise
const promise3 = Promise.reject('Failed 3');

Promise.customAny([promise1, promise2, promise3])
  .then((value) => console.log(value)) // Logs: 'Succeeded'
  .catch((error) => console.error(error));

//Example 3
const rejectedPromise = Promise.reject('Failed');

// This will not change the state of the rejected promise
const stillRejectedPromise = Promise.resolve(rejectedPromise);

stillRejectedPromise
  .then(() => console.log('This will not be logged'))
  .catch((error) => console.log(error)); // This will log: 'Failed'

// Rejected promises remain rejected and invoke the .catch handler, while resolved promises or plain values invoke the .then handler.
```
