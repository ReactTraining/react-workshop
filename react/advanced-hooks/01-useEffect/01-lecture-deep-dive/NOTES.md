1. Teach useEffect
2. Refactor to React Router loaders
3. Remember to throw for 404

```js
if (!vacation) throw new Response('Not Found', { status: 404 })
```

- https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/
- https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/
- https://reacttraining.com/blog/setting-state-on-unmounted-component
- https://reacttraining.com/blog/useEffect-cleanup
- https://reacttraining.com/blog/hooks-you-probably-dont-need
- Docs: https://react.dev/learn/synchronizing-with-effects
- Docs: https://react.dev/learn/you-might-not-need-an-effect
