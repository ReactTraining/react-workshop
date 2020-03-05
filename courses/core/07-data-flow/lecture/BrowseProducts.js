import React, { useState } from 'react'
import { useProducts } from './utils'
// import { useShoppingCart } from './ShoppingCartState'
import BrowseProductItem from './BrowseProductItem'

function BrowseProducts() {
  const products = useProducts()
  // const [cart, setCart] = useState([])

  // function addToCart(productId, name, price) {
  //   const newCart = cart.concat([{ productId, quantity: 1, name, price }])
  //   setCart(newCart)
  // }

  // function updateQuantity(productId, quantity) {
  //   let newCart
  //   if (quantity > 0) {
  //     newCart = cart.map(product => {
  //       return product.productId === productId ? { ...product, quantity } : product
  //     })
  //   } else {
  //     newCart = cart.filter(product => product.productId !== productId)
  //   }
  //   setCart(newCart)
  // }

  // function getQuantity(productId) {
  //   if (!Array.isArray(cart)) return 0
  //   return (cart.find(p => p.productId === productId) || {}).quantity || 0
  // }

  return (
    <div className="spacing">
      <nav>
        <span>View Cart (3)</span>
      </nav>
      <hr />
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

export default BrowseProducts
