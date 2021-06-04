import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useLocation } from 'react-router-dom'
import { useRecordData } from './useRecordData'
import './styles.scss'

function App() {
  return (
    <BrowserRouter>
      <PrimaryLayout />
    </BrowserRouter>
  )
}

function PrimaryLayout() {
  let { pathname } = useLocation()
  let pageData = useRecordData(pathname)
  let content = pageData.content || pageData.error || 'Loading content...'
  return (
    <div className="primary-layout">
      <Nav />
      <main className="primary-content">
        <Route path="/" exact>
          <h1>Homepage</h1>
        </Route>
        <Route path="/about">
          <h1>About page</h1>
        </Route>
        <Route path="/contact">
          <h1>Contact page</h1>
        </Route>

        <p>{content}</p>
      </main>
    </div>
  )
}

function Nav() {
  return (
    <header>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
