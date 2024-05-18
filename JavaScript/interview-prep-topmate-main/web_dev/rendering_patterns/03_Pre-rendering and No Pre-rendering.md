### No Pre-rendering

- A simple react application has no pre-rendering

1. The server sends a HTML file to the browser.
2. Browser receives a HTML file with

```js
<div id='root'></div>
```

3. After the client is hydrated with JS, our React code runs and then if fills that empty space with components.

![image](https://github.com/saiteja-gatadi1996/interview_prep/assets/42731246/a7b52184-6ae0-4259-af21-3e3ebb8c5589)

---

### With Pre-rendering
- A NextJs Application

1. The server sends a HTML file to the browser
2. Browser receives a complete HTML file to display on screen
3. After the client is hydrated with JS, our app becomes interactive

![image](https://github.com/saiteja-gatadi1996/interview_prep/assets/42731246/dd35913e-57f5-480a-8e25-37e8880c494c)
