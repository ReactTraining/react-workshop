import React, { useState, Fragment } from 'react'
import Quantity from './Quantity'
import ProductImage from 'YesterTech/ProductImage'
import { MdShoppingCart } from 'react-icons/md'

function BrowseProductItem(props) {
  return (
    <div className="browse-product-item">
      <ProductImage src={props.imagePath} size={7} alt={props.name} />
      <div>{props.name}</div>
      <div>
        <button className="button">Add To Cart</button>
        <div className="align-right">
          <Quantity />
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
