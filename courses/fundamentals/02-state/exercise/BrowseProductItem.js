import React, { useState } from 'react'
import Quantity from './Quantity'
import { MdShoppingCart } from 'react-icons/md'

function BrowseProductItem(props) {
  return (
    <div className="browse-product-item">
      <div>{props.name} (0)</div>
      <div>
        <button className="button">Add To Cart</button>
      </div>
      <Quantity />
    </div>
  )
}

export default BrowseProductItem
