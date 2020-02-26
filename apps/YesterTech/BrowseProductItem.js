import React from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import Heading from 'YesterTech/Heading'
import Quantity from 'YesterTech/Quantity'
import StarRatings from 'YesterTech/StarRatings'
import ProductImage from 'YesterTech/ProductImage'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import 'YesterTech/BrowseProductItem.scss'

function BrowseProductItem({
  productId,
  name,
  price,
  imagePath,
  year = 'unknown',
  condition = 'n/a',
  brand = 'n/a',
  category = 'n/a',
  rating
}) {
  // Cart
  const { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  const quantity = getQuantity(productId)

  return (
    <Columns gutters className="browse-product-item">
      <Column>
        <ProductImage src={imagePath} alt={name} />
      </Column>
      <Column flex className="spacing-small">
        <Heading as="h1" size={3}>
          <Link to={`/products/${productId}`}>
            {name} ({year})
          </Link>
        </Heading>
        <StarRatings rating={rating} />
        <div className="horizontal-spacing">
          <span>Price:</span>
          <strong>${price.toFixed(2)}</strong>
        </div>
        <div className="text-small horizontal-spacing">
          <span>Brand: {brand}</span>
          <span>Category: {category}</span>
          <span>Condition: {condition}</span>
        </div>
      </Column>
      <Column className="spacing-small">
        <ShoppingCartButton onClick={() => addToCart(productId, name, price)} quantity={quantity} />
        {quantity > 0 && (
          <div className="align-right">
            <Quantity onChange={q => updateQuantity(productId, q)} quantity={quantity} />
          </div>
        )}
      </Column>
    </Columns>
  )
}

export default BrowseProductItem
