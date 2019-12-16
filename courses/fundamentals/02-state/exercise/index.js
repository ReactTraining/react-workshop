import React from 'react'
import ReactDOM from 'react-dom'
import BrowseProductItem from './BrowseProductItem'
// import BrowseProductItem from './BrowseProductItem.final'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const products = [
  { id: 1, name: 'Mario Kart', imagePath: '/images/products/mario-kart.jpg' },
  { id: 2, name: 'Donkey Kong', imagePath: '/images/products/donkey-kong-country.jpg' },
  { id: 3, name: 'Nintendo NES', imagePath: '/images/products/nintendo-nes.png' },
]

function App() {
  return (
    <div className="spacing">
      {products.map(product => {
        return (
          <BrowseProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            imagePath={product.imagePath}
          />
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
