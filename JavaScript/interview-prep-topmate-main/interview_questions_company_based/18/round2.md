## JavaScript:
1. Critical rendering path
2. Ways to copy an object (shallow/deep copy)
3. What is a pure function?
4. What is Event loop?
5. Types of storages. Is it safe to use localstorage to store confidential information?
 
## React:
1. Virtual DOM
2. Difference between useMemo, useCallback, useEffect
3. How to memoize a component?
3. What is context API?
### 4. What is Redux

- Is a **predictable state container** for JavaScript applications. 
- Commonly used with React but can be used with any other JavaScript framework or library. 
- It is <ins>**designed to manage the state of your application**</ins> in a `predictable` way by handling all state transitions through a strict and defined process involving `actions` and `reducers`.

#### How the store updates the values

- **Actions**: 
  - An action is `dispatched` when something happens in the application, 
  - such as a user interaction or an API request. 
  - An `action` **is a plain JavaScript object** that describes what happened and may include data payload. 
  - It **must have a type property** that indicates the type of action being performed.
- **Reducers**: 
  - Reducers are **pure functions** **that take the <ins>current state and an action as arguments**</ins> and return the new state. 
  - They specify how the state changes in response to actions sent to the store. 

- **Store**: 
  - The Redux store **brings `actions` and `reducers` together**. 
  - The store has the following responsibilities:
    - **Holds** the application state;
    - Allows access to the state via getState();
    - Allows state to be updated via dispatch(action);
    - Registers listeners via subscribe(listener);
    - Handles un-registering of listeners via the function returned by subscribe(listener).

#### redux hooks:

- **useSelector()**: 
  - This hook allows you to <ins>**extract data from the Redux store state**</ins>, using a selector function. 
  - It will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
<br/>

- **useDispatch()**: 
  - This hook returns the store's dispatch method, which **you can use to `dispatch` actions**.
<br/>

- **useStore()**: 
  - This hook **returns the Redux store** itself. 
  - It is rarely needed but can be useful in special situations where you need access to the store.

#### redux middleware's you have worked on

#### ABOUT REDUX-SAGA:

- Is a library that aims to **make application side effects** (i.e., asynchronous things like data fetching and impure things like accessing the browser cache)
  - **easier to manage**, 
  - **more efficient to execute**, 
  - **easy to test**, 
  - **better at handling failures**.

- The mental model is that a <ins>**saga is like a separate thread in your application that's solely responsible for side effects**</ins>. 
- Redux-saga is a redux middleware, which means **this thread can be `started`, `paused`, and `cancelled` <ins>from the main application with normal Redux actions**</ins>, 
- it **<ins>has access to the full Redux application state**</ins> 
- and **it can `dispatch` Redux actions** as well.

It uses an ES6 feature called `Generators` to make those asynchronous flows easy to read, write, and test. 
- (Think of functions that can be paused and resumed). 
- By using sagas, <ins>**you can keep all the asynchronous logic related to your side effects in one place**</ins>, making it easier to handle.

Here's a basic example of a saga that fetches user data:

```js
import { call, put, takeEvery } from 'redux-saga/effects';
import Api from './api.js'; // Import some API calling interface

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      //dispatches SUCCEEDED or
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      //dispatches FAILED
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```
----

1. Dynamic imports/lazy loading components
2. What is the second parameter we send in react.memo?

----

## TypeScript:
### 1. What is an enum?
- is a <ins>**way to organize a collection of related values**</ins>

```js
// Direction is an enum, all of them are members
// By default, enums begin numbering their members starting at '0'.

enum Direction {
  Up,
  Down,
  Left,
  Right
}

// You can refer to enum members using the enum name:
const move = Direction.Up;
```
----

```js
// you can manually set the values as follows
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
}

// Usage
const move = Direction.Left; // Outputs 3
```

### String enums:

```js
enum FileStatus {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Completed = "Completed",
  Failed = "Failed"
}

// Usage
const currentStatus = FileStatus.InProgress; // "In Progress"
```
### Enum Features
- **Enum at Runtime**: 
  - TypeScript enums are **real objects that <ins>exist at runtime**</ins></ins>. 
  - You can, for instance, pass around enum types as parameters, return them from functions, or even <ins>**dynamically create new enums at runtime**</ins>.

- **Const Enums**: 
  - By using the `const` modifier, 
  - you **can define enums that are <ins>completely inlined at compile time**</ins>.
  - This means that **<ins>no object code is generated for them at runtime**</ins>, which can lead to performance gains.

```js
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

let directions = [Direction.Up, Direction.Down]; // Transpiles to let directions = [0, 1];
```

- Enums are particularly <ins>**useful when you need a set of predefined options</ins>**, 
- such as days of the week, directions, states of a process, or response statuses.
- They **make your code more readable** and less prone to errors, as you can use meaningful names instead of numeric constants throughout your code, all while retaining type-safety benefits.

2. What are Type guards?
   - Type guards allow you to **ensure that a variable is of a certain type** <ins>**before you perform operations on it**</ins>, which helps prevent runtime errors and assists in robust type-checking.



 #### User-Defined Type Guards

- Sometimes, the types you're dealing with **aren't** `primitives` or `class-based`, and you might need more complex logic to determine types.
- <ins>essential for ensuring type safety</ins> in scenarios where the type of a variable is `uncertain`.
- By ensuring that the correct types are being operated on, developers can write more reliable and maintainable code
```js
interface Bird {
  type: 'bird';
  fly(): void;
}

interface Fish {
  type: 'fish';
  swim(): void;
}

// User-defined type guard to check if the passed object conforms to the Bird interface.
// It returns true if 'pet' is a Bird, 
// indicated by checking if the 'fly' method exists.
function isBird(pet: Bird | Fish): pet is Bird {
  // Use type assertion (casting) to check if 'fly' method exists on 'pet'.
  // If 'pet' has a 'fly' method, it must be a Bird, so return true.
  return (pet as Bird).fly !== undefined;
}

// Function to perform an action based on whether the 'pet' parameter is a Bird or a Fish.
// It takes a union type that could be either a Bird or a Fish.
function move(pet: Bird | Fish) {
  // Use the 'isBird' type guard to check if 'pet' is a Bird.
  if (isBird(pet)) {
    // If 'pet' is a Bird, execute the 'fly' method.
    pet.fly();
  } else {
    // If the type guard check fails, it means 'pet' is a Fish, so execute the 'swim' method.
    pet.swim();
  }
}
```
----

### 3. What are Utility types?
- Provides flexible **ways to transform types into new types**, 
- generally by providing operations over them which are common in certain programming patterns
- can <ins>**help you manipulate types in various ways</ins>**, 
- such as <ins>**making all properties optional</ins>**, 
- <ins>picking a subset of properties</ins>, 
- <ins>or making properties readonly, among others</ins>.

1. `Partial<T>`:
- Creates a type **by making all properties of T optional**. 
- It's useful <ins>**when you want to construct objects partially**</ins>, like during updates.

```js
interface User {
  name: string;
  age: number;
}

function updateUser(id: string, changes: Partial<User>) {
  // changes can include any of the properties of User, none, or all.
}
```


2. `Required<T>`:
- Constructs a type **by making all properties of T required**. The opposite of Partial. 

```js
interface Props {
  name?: string;
  age?: number;
}

const props: Required<Props> = { name: "John", age: 30 }; // Both properties are required.
```
3. `Readonly<T>`:
- Makes all properties of T readonly, which means **they can't be reassigned** after their initial creation.

```js
interface User {
  name: string;
}

const user: Readonly<User> = { name: "Jane" };
user.name = "Doe"; // Error: Cannot assign to 'name' because it is a read-only property.
```

------

## Micro frontend
- Webpack Module Federation plugin
 
As a developer, what are steps/reports required to check before production release?