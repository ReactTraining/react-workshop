import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import Logo from 'YesterTech/Logo'
import Avatar from 'YesterTech/Avatar'
import Heading from 'YesterTech/Heading'
import ProductImage from 'YesterTech/ProductImage'
import StarRatings from 'YesterTech/StarRatings'
// import ProductsSidebar from 'YesterTech/ProductsSidebar'
// import BrowseProducts from 'YesterTech/BrowseProducts'
// import ProductProfile from 'YesterTech/ProductProfile'
import 'YesterTech/ProductsLayout.scss'

function Home() {
  return (
    <div className="spacing">
      <Heading>HomePage</Heading>
    </div>
  )
}

function ProductsLayout() {
  return (
    <div className="products-layout">
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
      <div>Product Profile Goes Here</div>
    </div>
  )
}

function ProductProfile() {
  return (
    <div className="spacing">
      <Columns gutters>
        <Column>
          <ProductImage src="/images/products/mario-kart.jpg" alt="Mario Kart" size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>Mario Kart</Heading>
          <StarRatings rating={4.5} />
          <hr />

          <div className="text-small">
            <div>Brand: Nintendo</div>
            <div>Category: Games</div>
            <div>Condition: Good</div>
          </div>
        </Column>
      </Columns>
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
          <Home />
        </main>

        <footer className="primary-footer spacing">
          <hr />
          <div className="text-small">Copyright &copy; 2020 YesterTech Inc</div>
        </footer>
      </div>
    </div>
  )
}
