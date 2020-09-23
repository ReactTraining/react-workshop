# Hooks Abstractions

Remember, we only need you to work on files that have a corresponding `.final.js`.

HINT. We don't import things for you on this exercise. You'll have to setup all imports on your own.

## Task One: useMedia

1. Open `useMedia.js` and `Review.js`
2. The Review page is where you need to know if the user prefers "light" or "dark" mode for their OS. This is where we need to call the custom hook for `useMedia('(prefers-color-scheme: dark)')`
3. Pass an `options` prop into `Tweet` for `{theme: 'dark'}` or `{theme: 'light'}` depending on the return from useMedia.

## Task Two: Context

1. Open `App.js` and `ThemeState.js` even though you won't need to edit `App.js`. Review how the App is using the custom context provider.
2. Move your `useMedia()` call from `Review.js` to the provider.
3. Pass context down through the provider that represents the "scheme" (`dark` or `light`) from the `useMedia` response.
4. In `Review.js`, instead of calling `useMedia()` you'll need to consume the context. Get this started however you like, but we'd love to see you make a custom hook for consuming context that lives in the same file as the provider. In other words, this could be code in `ThemeState.js` and it could be imported into `Review.js`.

```js
export function useTheme() {
  // ...
}
```
