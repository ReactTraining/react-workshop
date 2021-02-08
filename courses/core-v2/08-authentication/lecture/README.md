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
