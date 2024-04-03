function App() {
  return (
    <Routes>
      <Route path="/:guid">
        <Route element={<GeneralAuth rules={() => {}} />}>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
        </Route>
        <Route element={<GeneralAuth rules />}>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
          <Route path="/stuff" element={Page}></Route>
        </Route>
      </Route>
    </Routes>
  )
}
