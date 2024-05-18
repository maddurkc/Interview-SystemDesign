#### 1. How does the Node.js event loop work, and how does it handle multiple asynchronous operations simultaneously?

- The event loop enabling Node.js to perform non-blocking, asynchronous I/O operations

- The event loop works by constantly checking and delegating tasks in its various phases to the appropriate threads.

- As soon as the I/O operation finishes, the result is returned to the event loop, which then proceeds to the next task it can execute.

Here is an overview of the event loop and their roles:

- <strong>Timers:</strong> This phase executes callbacks scheduled by setTimeout() and setInterval()

- <strong>I/O callbacks:</strong> Executes almost all callbacks including I/O events

- <strong>Idle, prepare:</strong> Internal usage only

- <strong>Poll:</strong> Retrieves new I/O events.

- <strong>Check:</strong> Execute setImmediate() callbacks

- - <strong>Close callbacks:</strong> Executes close event callbacks such as socket.on("close",)

##### Node.js is essentially single threaded but it can simultaneously handle multiple asynchronous operations by delegating them to the native system API's provided by the libuv librarry or the worker threads pool.

- When the event loop encounters an asynchronous operation it offloads the task and moves forward and once that task is completed it comes back to this async operation task and executes it.

---

#### 2. How does Node.js handle uncaught exceptions and what is the best practice for handling them in a production application?

- By default, Node.js handles uncaught exceptons by printing the error stack trace to the console and exiting the process.

- However it is possible to attach an unhandled exception event listener to the <strong>uncaughtException</strong> event to prevent the
  default behaviour.

```js
process.on('uncaughtException', (error) => {
  // code goes on
})
```

- But the above approach is not recommended for production use because the application may be left in a unpredictable state.

- So the best practise for handling uncaught exceptions in production applications is:

- Log the error and all relevant information.
- Gracefully shutdown the process.

- Use a process manager like pm2 or container orchestration system like Kubernetes to automatically restart the application.

- Additionally improve the error handling in your application and use proper testing and monitoring to reduce the chances of unhandled exceptions.

---

#### 3. What is libuv, and how does it play a vital role in Node.js performance optimization?

##### libuv is a cross-platform I/O library written in C that plays a crucial role in the Node.js ecosystem.

##### It provides the event loop implementation, async I/O operations, and thread pooling for handling filesystem, DNS and user-defined tasks.

##### libuv abstracts the underlying OS-level mechanisms to perform these tasks, thus ensuring consistent behaviour across platforms.

##### The key benefits of libuv in Node.js performance optimization include:

- <strong>Event loop:</strong> libuv provides a fast, scalable and cross-platform event loop that is the backbone of Node.js concurrency model.

- <strong>Asynchronous I/O:</strong> libuv handles async I/O operations allowing Node.js to achieve non-blocking I/O operations and handle thousands of concurrent connections efficiently.

- <strong>Thread pool:</strong> libuv manages a thread pool to offload blocking tasks like <strong>file I/O, cryptographic operations, and user-defined operations,</strong> enabling better CPU usage in concurrent environments.

<strong>Cross-platform support:</strong> libuv provides a consistent API for different platforms, significantly contributing to Node.js cross-platform compatability.

---

#### Explain the difference between process.nextTick() and setImmediate() in Node.js and when to use each one.

Both enable deferring the execution of a function to a later time.

- <strong>process.nextTick()</strong>:fires immediately on the same phase

```js
console.log('Start')

process.nextTick(() => {
  console.log('Callback function executed')
})

console.log('End')

// Start
// End
// Callback function executed
```

- <strong>setImmediate():</strong>fires on the following iteration or 'tick' of the event loop

```js
It has higher priority than other asynchronous operations, such as timers or I/O operations.
```

##### Why use process.nextTick()?

- Allow users to handle errors, cleanup any unneeded resources or try the request again before the event loop continues.

- <strong>In summary </strong>: use process.nextTick() when you want to execute a callback function immediately after the current operation completes, but before other I/O events or timers. Use setImmediate() when you want to schedule a callback to be executed in the next event loop iteration, after any pending I/O events or process.nextTick() callbacks.

------

