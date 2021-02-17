import * as React from 'react'
import Quantity from './Quantity'
// import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'

interface BrowseProductItemProps {
  productId: number
  name: string
  price: number
  imagePath: string
  year?: string
  condition?: string
  brand?: string
  category?: string
  rating?: number
}

function BrowseProductItem({ productId, name, price, imagePath }: BrowseProductItemProps) {
  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button className="button">Add To Cart</button>
        <div className="align-right">
          <Quantity />
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
