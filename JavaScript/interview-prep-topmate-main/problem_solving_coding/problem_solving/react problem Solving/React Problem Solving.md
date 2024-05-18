**1. Describe a situation where you would use `useMemo` or `useCallback`.**

<details>
<summary>View Answer</summary>
Here's an example using `useMemo` to compute a filtered list only when the source list or filter criteria change:

```jsx
import React, { useState, useMemo } from 'react'

function FilteredList({ list }) {
  const [filter, setFilter] = useState('')

  const filteredList = useMemo(() => {
    return list.filter((item) => item.includes(filter))
  }, [list, filter])

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
}
```

</details>

---

**2. How would you manage the state in a large-scale React application?**

<details>
<summary>View Answer</summary>

A simple example using Redux:

```javascript
// actions.js
export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
})

// reducers.js
const initialState = { items: [] }
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    default:
      return state
  }
}

// store.js
import { createStore } from 'redux'
import { itemsReducer } from './reducers'
export const store = createStore(itemsReducer)

// App component
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './actions'

function App() {
  const items = useSelector((state) => state.items)
  const dispatch = useDispatch()

  const handleAdd = (item) => {
    dispatch(addItem(item))
  }

  // Render logic here...
}
```

</details>

---

**3. Implement a custom hook that handles form inputs and validation.**

<details>
<summary>View Answer</summary>

```jsx
import { useState } from 'react'

function useForm(initialState, validate) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  return { values, errors, handleChange }
}
```

</details>

---

**4. Handle routing in your React application.**

<details>
<summary>View Answer</summary>

This example uses `react-router-dom`:

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/home' component={HomeComponent} />
        <Route path='/about' component={AboutComponent} />
        <Route path='/contact' component={ContactComponent} />
        <Route render={() => <h1>404: Page Not Found</h1>} />
      </Switch>
    </Router>
  )
}
```

</details>

---
