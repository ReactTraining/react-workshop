function MainLayout() {
  return (
    <div>
      <header className="primary">primary Header</header>
      <div>
        <Outlet></Outlet>
      </div>
      <footer>primary footer</footer>
    </div>
  )
}

function DashboardSubLayout() {
  return (
    <>
      <aside>aside</aside>
      <main>main</main>
    </>
  )
}
