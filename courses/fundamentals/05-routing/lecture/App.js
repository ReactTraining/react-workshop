import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Logo from 'YesterTech/Logo'
import Avatar from 'YesterTech/Avatar'
import Heading from 'YesterTech/Heading'

function Home() {
  return (
    <div className="spacing">
      <Heading>HomePage</Heading>
    </div>
  )
}

function Products() {
  return (
    <div className="products-page">
      <aside className="primary-sidebar spacing">
        <section className="spacing-small">
          <Heading size={3}>Categories</Heading>
          <label>
            <input type="checkbox" /> Games
          </label>
          <label>
            <input type="checkbox" /> Computers
          </label>
          <label>
            <input type="checkbox" /> Music
          </label>
        </section>
      </aside>
      <div className="spacing">
        <Heading>Browse Products</Heading>
      </div>
    </div>
  )
}

function ProductProfile({ productId }) {
  return (
    <div className="spacing">
      <Heading>Product Profile</Heading>
    </div>
  )
}

export default function App() {
  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header flex-parent flex-justify-space-between flex-align-center">
          <div>
            <Logo />
          </div>
          <nav className="horizontal-spacing-large align-right">
            <a href="/" className="primary-nav-item">
              Home
            </a>
            <a href="/products" className="primary-nav-item">
              Products
            </a>
            <a href="/login" className="primary-nav-item">
              Login
            </a>
            <button>
              <Avatar src="" size={1.5} />
            </button>
          </nav>
        </header>

        <main className="primary-content">
          {/* <Home /> */}
          {/* <Products /> */}
          <ProductProfile />
        </main>

        <footer className="primary-footer spacing">
          <hr />
          <div className="text-small">Copyright &copy; 2020 YesterTech Inc</div>
        </footer>
      </div>
    </div>
  )
}
