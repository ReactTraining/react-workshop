# Data Flow

Start by opening the file `SaveFavorite.tsx`. The general idea is that we're managing an array of `productId`'s (favorites):

- Our state is an array
- The `handleClick` will either add or update the array

One thing we want to eventually do is persist the favorites to `localStorage`. The problem is that if we were to read from `localStorage` in `SaveFavorite` to establish the initial state, we have 10 instances of `SaveFavorite` mounted so we'd be reading 10 times from `localStorage`. So let's just read one time in a Context Provider and once we put that array on context all the `SaveFavorite` instances can just read from context.

## Task One: Move to Context

1. Open `App.js` and `FavoriteProductState.js`
2. In `FavoriteProductState.js`, you have the workings of a Provider and a custom hook which will help your consumers. Start by creating some context (I helped you out a bit and created a type definition you can use if you want):

```tsx
const FavoriteProductContext = React.createContext<FavoriteProductContextValue>();
```

Then make the `<FavoriteProductContext.Provider>` from that variable and pass down some context through it's `value` prop. Also, remember to pass the `children` into the provider.

1. Create a `useFavoriteProduct` custom hook, return the context for anyone who wants to consume context by calling the `React.useContext` function with our `FavoriteProductContext` object.

2. Open `App.js` and `import` the provider. Then wrap `ProductLayout` in that provider

** WARNING **

You're making lots of changes, so lets test the code to see if things work. Before migrating the code from `SaveFavorite` into the provider, lets just pass down a basic message through context to see that it's all connected:

```js
return (
  <FavoriteProductContext.Provider value="Hello, does it work?">
    {children}
  </FavoriteProductContext.Provider>
);
```

Open the `SaveFavorite.tsx` file again and import the custom hook. Call it and see if you get your message. If you don't, you might have missed a subtle step from above.

This is a good stopping point. The instructor might tell you we're all going to get caught up to this point before we continue.

## Task Two: Move the `SaveFavorite` code into context

1. Open the `SaveFavorite.tsx` file.
2. Move the state for `favorites` into the context provider.
3. Just so everyone's code is similar, pass three things down through context:

```tsx
const context: FavoriteProductContextValue = {
  isFavorite(productId) {}, // returns boolean
  addFavorite(productId) {}, // adds
  removeFavorite(productId) {}, // removes
};
```

4. Fill out those functions. You have all the code you need sitting right there inside `SaveFavorite`
5. The `SaveFavorite` file will still need a `handleClick` and the if-statement logic to decide if it should add or remove. But now you should be able to get these three functions from context and use them instead.

If that all goes well, you should be able to add and remove products and see the UI update accordingly. But, this doesn't persist when you do a refresh.

## Task Three: Persist the favorites with `localStorage`

1. In the provider, import the `storage` object which is commented out.
2. Create a `React.useEffect` which runs every time the `favorites` change.
3. The `storage` has two methods:

```tsx
storage.getFavorites();
storage.updateFavorites(favorites);
```

Use those to:

- Establish the initial state of the array
- And to update the favorites when they change (in the effect).

4. You might notice that the way you wrote your effect, it's going to call `storage.updateFavorites` even when we mount. That's fine for now to get things working. Technically we just read from storage to start our state so we're just rewriting that same list we got from localStorage back to localStorage. We'll fix that next.

If you get to this point, you should be able to refresh your page and see the UI start with your list of favorites you had before the refresh.

## Bonus Tasks

1. See if you can make the effect only do `storage.updateFavorites` on re-renders that aren't the first mount. If the instructor told you about mutable refs already, that's one way to do it (See the final)

2. Every time our `favorites` state changes, our provider gets a re-render. When we re-render and call `useState()` the argument we pass in gets called too, even if the nature of useState is to use that value only initially. What can we do so that we only read from `storage.getFavorites()` once?

It turns out, `React.useState()` has an alternative way to initialize state:

```tsx
React.useState(() => {
  // return the initial state
});
```

If you pass a function in, the return value of that function will be the initial state. Also, that function gets called only on the first render. Therefore, if you put your call to `storage.getFavorites()` there, you'll only call it once. (See the final solution)
