import React, { useCallback } from 'react'
import { Columns, Column } from 'react-flex-columns'
import { Heading, Quantity, Tiles } from 'workshop'

import ProductImage from './ProductImage'
import StarRatings from './StarRatings'
import ShoppingCartButton from './ShoppingCartButton'
import { useShoppingCartState } from './ShoppingCartState'
import ProductTile from './ProductTile'
import useApi from './useApi'
import api from './api'

function ProductProfile({ match }) {
  const productId = parseInt(match.params.productId, 10)
  const getProduct = useCallback(() => api.products.getProduct(productId), [productId])
  const [product] = useApi(getProduct)

  // Cart
  const { addToCart, getQuantity } = useShoppingCartState()
  const quantity = getQuantity(productId)

  if (!product) return <div>Loading...</div>

  return (
    <div className="product-profile spacing">
      <Columns gutters>
        <Column>
          <ProductImage src={product.imagePath} name={product.name} size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>{product.name}</Heading>
          <StarRatings rating={product.rating} />
          <hr />
          <Columns split>
            <Column>
              <div className="text-small">
                <div>Brand: {product.brand}</div>
                <div>Category: {product.category}</div>
                <div>Condition: {product.condition}</div>
              </div>
            </Column>
            <Column className="spacing-small">
              <ShoppingCartButton productId={productId} name={product.name} price={product.price} />

              {quantity > 0 && (
                <div className="align-right">
                  <Quantity onChange={q => addToCart(productId, q)} quantity={quantity} />
                </div>
              )}
            </Column>
          </Columns>
          <p>{product.description}</p>
        </Column>
      </Columns>

      {Array.isArray(product.relatedProducts) && (
        <>
          <hr />
          <div>
            <Heading as="h2" size={4}>
              Related Products
            </Heading>
            <Tiles>
              {product.relatedProducts.map(productId => (
                <ProductTile key={productId} productId={productId} />
              ))}
            </Tiles>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductProfile
