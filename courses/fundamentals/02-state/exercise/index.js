import React from 'react'
import ReactDOM from 'react-dom'
import BrowseProductItem from './BrowseProductItem'
// import BrowseProductItem from './BrowseProductItem.final'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const products = [
  { productId: 1, name: 'Mario Kart', imagePath: '/images/products/mario-kart.jpg' },
  { productId: 2, name: 'Donkey Kong', imagePath: '/images/products/donkey-kong-country.jpg' },
  { productId: 3, name: 'Nintendo NES', imagePath: '/images/products/nintendo-nes.png' },
]

function App() {
  return (
    <div className="spacing">
      {products.map(product => {
        return (
          <BrowseProductItem
            key={product.productId}
            name={product.name}
            imagePath={product.imagePath}
          />
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
