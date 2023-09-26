```js
// Version 4 passes a component
<Route path="/" component={Comp} />

// Version 5 passes a child element
<Route path="/"><Comp /></Route>

// Version 6 passes an element prop and leaves
// availability for an optional nested route
<Route path="/" element={<Comp />}>
  <Route></Route>
</Route>


// Version 4 used <Switch>
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainLayout} />
      </Switch>
    </BrowserRouter>
  )
}


// Version 5 and 6 uses Routes
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <MainLayout />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```
