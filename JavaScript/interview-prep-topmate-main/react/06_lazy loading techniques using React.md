## Lazy Loading using React


- Lazy loading allows us to load <ins><strong>only the components and media that are required for the initial render</strong></ins> of a page. 
- This reduces the amount of data that needs to be transferred and processed, ***which can lead to faster page load times***.

- `Lazy Loading` can be ***applied to individual components, such as <ins>images or to entire section of a page</ins>***.
<br/>

- `React.lazy` function is in-built function in React.js that **allows us to lazy load individual components**. <ins>***This function returns a new component that can be rendered in place of the original component.***</ins>
<br/>

- When the component is loaded, it will only load the necessary data for the initial render, and then defer the loading of the remaining data until it is actually needed.

##### Example using React.lazy function

- In this example, the LazyComponent is loaded using the React.lazy function.

- The component is wrapped in a Suspense component <strong>which provides a fallback component to be displayed while the component is being loaded</strong>

```js
import React, { lazy, suspense } from "react"

const LazyComponent = () => import("./LazyComponent")

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
export default App
```

---

### Here are some of the ways you can improve the performance of your React.js website:


#### 1. Minimize the size of the javascript bundle:

  - The size of your javascript bundle has direct impact on the performance of your website. <strong>To minimize the size of your javascript bundle, consider your <ins>code splitting, tree shaking.</strong></ins>

#### <ins>Following are the techniques:</ins>
#### Code Splitting:

   - Allows to divide the JS code into smaller, more manageable chunks, instead of having one large, monolithic bundle. So this can reduce the size of JS bundle which in turn improve the performance of the website.

---

#### Tree Shaking:

- Allows you to only include the code that is actually used in your JS bundle, instead of including entire codebase.

---

#### Minification:

- process of removing unnecessary characters from your JS code, such as whitespace and comments, to reduce the size of the file.

---

#### compression:

- process of encoding JS code in a compact format, reducing the size of the file.

```js
Gzip is a popular compression format for JS
```

---

#### Use of a CDN:

- Using a content delivery network can help to reduce the size of the JS bundle by serving it from a fast, globally distributed network of servers.

---

#### 2. Optimizing your images:

- Optimizing your images also plays an important role in improving the performance of your website. This includes <strong>using image compression to reduce the file size of your images</strong> and choosing the best image file format for your needs

---

#### 3. Memoization:

- Allows you to **cache the results of expensive function calls**, so that you don't have to recompute them each time the function is called. This can also lead to improve the performance of website, especially for complex resource intensive components.

---

#### 4. Virualized lists:

- Allows you to **only render the items that are currently visible on the screen**, reducing the amount of data that needs to be transferred and processed. This can be especially useful for large lists, such as long lists of data or images.

---

#### 5. Server Side Rendering:

- Allows you to pre-render your components on the server, reducing the amount of data that needs to be transferred and processed on the client. Helpful for slower connections.

---

#### 6. Monitoring the website performance:

- Regular monitoring is an important step in identifying and fixing performance issues. Tools are like Google PageSpeed Insights and Lighthouse.

---

