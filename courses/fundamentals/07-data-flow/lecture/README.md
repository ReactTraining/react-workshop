# Notes for Instructor

## Teach "prop-drilling", "lifting state", "context" and related topics.

Browser: http://localhost:3000

The main idea of this lecture is to start with local state and lift it as needed. Eventually the state will be lifted all the way to the top of the application which can start a conversation about lifted state and prop drilling vs context.

In `App.js`, there are several components that would ordinarily be in separate files. The easiest way to understand the relationships between them is to open `flow.png`. This was made with our interactive tree-visualizer tool: https://reacttraining.com/tree

### Update the value of "In Cart: 0"

Start by reviewing the `BrowseProductItem`. It is very similar to the same component they worked on in 02-state exercise where the programmed the component's state for quantity. However, when you look at the UI you'll notice "In Cart: 0" is in the parent component `BrowseProducts`. Teach that we need to lift state and pass down props to `BrowseProductItem`:

```js
//                                        ▼ State is currently here
App -> PrimaryLayout -> BrowseProducts -> BrowseProductItem
//                      ▲ Lift state to here
```

Before, `BrowseProductItem` was simply managing quantity for itself, but now that `BrowseProducts` will have the shopping cart state of all items, it needs to be an array. In `BrowseProducts` there's already state and utility functions appropriate for maintaining an array of shopping cart items. Enable the code and pass down the necessary props to `BrowseProductItem` to refactor it to work. Then display the number of items in the cart instead of "In Cart: 0"

### Prevent checkout if the cart is empty

Now we want to conditionally render the route for `/checkout` and only display the primary navigation's "Checkout" link if there are items in the cart. Now we need to lift the state and utility functions to `PrimaryLayout` because we need to know what's in the cart in order to implement this feature.

```js
//                      ▼ State is currently here
App -> PrimaryLayout -> BrowseProducts -> BrowseProductItem
//     ▲ Lift state to here
```

This starts a good conversation about prop drilling and lifting state for adjacent components that need to share state.

### Refactor to Context

Refactor `PrimaryLayout` to use context instead. Start by creating a `<ShoppingCart.Provider>` directly inside of `PrimaryLayout`. Have a conversation about context in general and how an app will probably have multiple context providers. Sometimes students will assume this means we'll eventually put all the top-level application state in one component. So refactor the code like this:

```js
////////////////////////////////////////////////////
// This would be it's own file: ShoppingCartState.js
import React, { useState, useContext } from 'react'
const Context = React.createContext()

export function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState([])
  // ...
  return <Context.Provider value={/* stuff */}>{children}</Context.Provider>
}

export function useShoppingCartState() {
  return useContext(Context)
}

///////////////////
// App.js
import React from 'react'
import { ShoppingCartProvider } from './ShoppingCartState'

function App() {
  return (
    <ShoppingCartProvider>
      <PrimaryLayout />
    </ShoppingCartProvider>
  )
}
```
