# Authentication

# Main Topics to Cover

- ✅ Authentication With Context
- ✅ Unique situations with Context
- ✅ Private Routes

# Lecture

This one is mostly an end-of-workshop show-and-tell. The `App` component in `index.tsx` is hard-coded for `authenticated = false` which means when you successfully login, nothing will happen until you get the real `authenticated` boolean from `useAuth()`

Show the attendees how to use the `useAuth` but in our unique case, how we can't consume this context from the very component that makes the provider. So sometimes these sorts of tricks are needed:

```tsx
const App: React.FC = () => {
  const { authenticated } = useAuth()
  if (authenticated === null) return <div>Loading...</div>
  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

Depending on how much time you have and how much you want to show, the context currently gives you a `dispatch` function. It might ne nice to refactor `AuthContext` to give a `login` and `logout` function instead. Depending on how those functions are used, we might need to wrap in `useCallback` :)
