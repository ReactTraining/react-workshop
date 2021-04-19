import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import Heading from 'YesterTech/Heading'
import Quantity from 'YesterTech/Quantity'
import Tiles from 'YesterTech/Tiles'
import StarRatings from 'YesterTech/StarRatings'
import ProductImage from 'YesterTech/ProductImage'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import ProductTile from 'YesterTech/ProductTile'
import { Product } from 'YesterTech/types'
import api from 'YesterTech/api'

// https://twitter.com/dan_abramov/status/1313891773224189953

function ProductProfile() {
  let { productId } = useParams<{ productId: any }>()
  productId = parseInt(productId, 10)

  let product: Product | null = null

  api.products.getProduct(productId)

  // Cart
  let { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  let quantity = getQuantity(productId)

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="spacing">
      <Columns gutters>
        <Column>
          <ProductImage src={product.imagePath} alt={product.name} size={15} />
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
              <ShoppingCartButton
                onClick={() => addToCart(productId, product.name, product.price)}
                quantity={quantity}
              />

              {quantity > 0 && (
                <div className="align-right">
                  <Quantity onChange={(q) => updateQuantity(productId, q)} quantity={quantity} />
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
              {product.relatedProducts.map((productId) => (
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
