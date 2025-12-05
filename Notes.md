# SPA (client only)

you make your own data-fetching strategy, and global state strategy

Create React App (CRA)
Webpack (bundler) + Babel (compiler)

- React Router

Vite
Rollup (bundler) + Babel (compiler)

- React Router

# React Frameworks (To do react on the server and on the client)

The framework absorbs your data-fetching and other architectural things like global state

NextJS (gives you less options for hosting)

React Router Framework (Formerly called Remix) (many hosting options)

- uses Vite

```
const states = []

let count = -1

function useState(defaultState: any) {
  count++

  if (states[count]) {
    return states[count]
  }

  function reRender(newValue: any) {
    states[count][0] = newValue
    count = -1
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <div>
        <Counter />
      </div>
    )
  }

  const state = [defaultState, reRender]
  states.push(state)
  return state
}
```
