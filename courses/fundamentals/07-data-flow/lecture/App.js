import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect, NavLink, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton'
import CheckoutBilling from 'YesterTech/CheckoutBilling'
import Quantity from 'YesterTech/Quantity'
import ProductImage from 'YesterTech/ProductImage'
import { useProducts } from './utils'

import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/PrimaryLayout.scss'
import './styles.scss'

export default function App() {
  return <PrimaryLayout />
}

function PrimaryLayout() {
  const [cart, setCart] = useState([])

  function addToCart(productId, quantity, name, price) {
    const newCart = cart.concat([{ productId, quantity, name, price }])
    setCart(newCart)
  }

  function updateQuantity(productId, quantity) {
    let newCart
    if (quantity > 0) {
      newCart = cart.map(product => {
        return product.productId === productId ? { ...product, quantity } : product
      })
    } else {
      newCart = cart.filter(product => product.productId !== productId)
    }
    setCart(newCart)
  }

  function getQuantity(productId) {
    if (!Array.isArray(cart)) return 0
    return (cart.find(p => p.productId === productId) || {}).quantity || 0
  }

  return (
    <BrowserRouter>
      <div className="primary-layout">
        <div>
          <PrimaryHeader />
          <main>
            <Switch>
              <Route path="/" exact>
                <BrowseProducts />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

function PrimaryHeader() {
  return (
    <header className="primary-header">
      <nav className="horizontal-spacing">
        <NavLink to="/" exact>
          Products
        </NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
      <hr />
    </header>
  )
}

function BrowseProducts() {
  const products = useProducts()

  return (
    <div className="spacing">
      {Array.isArray(products) &&
        products.map(product => {
          return (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              price={product.price}
              imagePath={product.imagePath}
            />
          )
        })}
    </div>
  )
}

function BrowseProductItem({ productId, name, price, imagePath }) {
  const quantity = 0
  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <ShoppingCartButton
          onClick={() => {
            // Add to Cart
          }}
          quantity={quantity}
        />
        <div className="align-right">
          {quantity > 0 && (
            <Quantity
              quantity={quantity}
              onChange={quantity => {
                // Update Cart
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function Checkout() {
  const history = useHistory()

  function handleBillingSubmit() {
    history.push('/checkout/review')
  }

  return (
    <Centered>
      <Switch>
        <Route path="/checkout/billing">
          <CheckoutBilling onSubmit={handleBillingSubmit} />
        </Route>
        <Route path="/checkout/review">
          <CheckoutReview />
        </Route>
        <Redirect to="/checkout/billing" />
      </Switch>
    </Centered>
  )
}

function CheckoutReview() {
  return <div>Checkout Review</div>
}
