# Context

## ✅ Task 1: Implement Context Provider

Start by opening `Board.js` and creating a context variable:

```js
// Don't forget to `export` it like this
export const BoardContext = React.createContext()
```

Remember, this variable is how we make the provider and the corresponding consumers which is why we must export it so the consumer(s) can use it.

There are three parts to context:

- Creating the context variable (`BoardContext` in our case)
  - Do this outside of the React components
- The Provider where the `value` prop is the data being passed down through context
- The Consumer using `useContext(BoardContext)`

After you have the context variable, use it in the form of JSX to make a provider. Be sure to wrap the provider around anything that might consume context. This also happens in `Board.js`

```js
// You'll see the context variable is already made for you in Board.js
<BoardContext.Provider value={context}>
  <OtherStuffHere />
</BoardContext.Provider>
```

## ✅ Task 2: Implement Context Consumer

Now that we have the provider, any React tree descendants of that provider can consume this context. Open the `TaskCard.js` file to setup the consumer

The whole point here is that the `TaskCard` component gets a `taskId` prop. Before we were using side effects to do a network request for the data of each card. But that would be an architectural problem if there were many cards and each was starting its own side effect for a network request. Since the `Board.js` component already has an array of all the tasks, we can pass down the tasks to all the components below it through context. But instead of passing the actual array down, let's pass down a `getTask` function.

The good news is, we already did that if you setup Task 1 from above correctly. The `Board.js` file should be passing down context like this:

```js
const getTask = (taskId) => {
  return tasks.find((task) => task.id === taskId)
}

const context = {
  getTask,
}

<BoardContext.Provider value={context}>
  <OtherStuffHere />
</BoardContext.Provider>
```

Now in the `Card.js` file, you can consume that function from context like this:

```js
const { getTask } = useContext(BoardContext)
const task = getTask(taskId)
```

Pay attention to where `BoardContext` comes from, remember we have to import that context variable from `Board.js`
