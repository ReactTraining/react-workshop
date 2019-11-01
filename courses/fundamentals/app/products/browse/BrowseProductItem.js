import React from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import Heading from '../../ui/Heading'
import ProductImage from '../../ui/ProductImage'
import './BrowseProductItem.scss'

function BrowseProductItem({ productId, name }) {
  return (
    <Columns gutters className="browse-product-item">
      <Column size={7}>
        <ProductImage
          src="https://avatars0.githubusercontent.com/u/2272118?s=460&v=4"
          name={name}
        />
      </Column>
      <Column flex className="spacing">
        <Heading as="h1" size={3}>
          {name}
        </Heading>
        <div>
          <Link to={`/products/${productId}`}>Profile</Link>
        </div>
      </Column>
    </Columns>
  )
}

export default BrowseProductItem
