import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import BrowseProductItem from './BrowseProductItem'
// import BrowseProductItem from './BrowseProductItem.final'
import { updateCart } from './utils'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const products = [
  { id: 1, name: 'Mario Kart' },
  { id: 2, name: 'Donkey Kong' },
  { id: 3, name: 'Nintendo NES' },
]

function App() {
  const [cart, setCart] = useState([])

  function addToCart(id, quantity) {
    const newCart = updateCart(cart, id, quantity)
    setCart(newCart)
  }

  return (
    <div className="spacing-small">
      {products.map(product => {
        return (
          <BrowseProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            addToCart={addToCart}
            quantity={(cart.find(p => p.id === product.id) || {}).quantity}
          />
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
