import React, { useState, useEffect } from 'react'
import { Columns, Column } from 'react-flex-columns'
import api from '../../api'
import { Heading, Quantity } from 'workshop'
import ProductImage from '../../ui/ProductImage'
import ShoppingCartButton from '../../ui/ShoppingCartButton'
import { useShoppingCartState } from '../../state/ShoppingCartState'

function ProductProfile({ match }) {
  const productId = parseInt(match.params.productId, 10)
  const [product, setProduct] = useState({})

  // Cart
  const { addToCart, getQuantity } = useShoppingCartState()
  const quantity = getQuantity(productId)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then(product => {
      if (!isCurrent) return
      setProduct(product)
    })
    return () => (isCurrent = false)
  }, [productId])

  return (
    <div className="product-profile spacing">
      <Columns gutters>
        <Column>
          <ProductImage src={product.imagePath} name={product && product.name} size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>{product.name}</Heading>
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
              <ShoppingCartButton productId={productId} />
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
      <hr />
      <div>[Related Products Here?]</div>
    </div>
  )
}

export default ProductProfile
