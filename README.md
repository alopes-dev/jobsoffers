#Replacing Render With createRoot

```js

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

to

```js

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement)
root.render(<App />);

```
