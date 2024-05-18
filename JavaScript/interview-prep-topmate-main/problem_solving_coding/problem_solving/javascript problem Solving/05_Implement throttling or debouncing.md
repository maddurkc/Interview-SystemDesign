## Throttling and Debouncing

**Throttling**

- A function doesn't get called often more than a specified interval, even if it's invoked multiple times.
- Ex: If you throttle a function to be called at most once every 300 ms, it will ignore any additional calls that happen before the 300 ms have passed.

```js
function updateLayout() {
  console.log('Updating layout...');
}

function throttle(func, limit) {
  //maintain a variable for mutation (ex: isThrottle = false)
  let isThrottle = false;
  // return another function with args
  return function (...args) {
    // check the variable is not true, if yes then mutate the variable to true,
    if (!isThrottle) {
      isThrottle = true;
      func.apply(this, args);
      setTimeout(() => {
        isThrottle = false;
      }, limit);
    }
  };
}

let isThrottled = throttle(updateLayout, 300);

window.addEventListener('resize', () => {
  isThrottled();
});
```

**Debouncing**

- A function doesn't get called until after a specified amount of time has passed since it was last invoked.

- Ex: execute this function only if 300 milliseconds have passed without it being called


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Javascript Coding</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hello Javascript</h1>
    <input type="text" id="searchInput" placeholder="Search here.." />
    <script src="index.js"></script>
  </body>
</html>
```

```js
// Debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Function that performs the search
function searchQuery(query) {
  console.log(`Searching for: ${query}`);
}

// Create a debounced version of the search function
const debouncedSearch = debounce(searchQuery, 300);

// Function to attach event listeners after the page loads
const input = document.getElementById('searchInput');
input.addEventListener('input', function (event) {
  debouncedSearch(event.target.value);
});
```
