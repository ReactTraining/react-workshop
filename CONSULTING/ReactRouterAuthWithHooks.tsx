function App() {
  return (
    <Routes>
      <Route path="/:guid">
        <Route path="/stuff" element={Page}></Route>
      </Route>
    </Routes>
  )
}

function useProtectedPage() {
  const auth = useAuth()
  // logic that might re-direct you
}

function Page() {
  useProtectedPage()
}
