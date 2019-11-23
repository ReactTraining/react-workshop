import React from 'react'
import { FaStarHalf, FaStar } from 'react-icons/fa'
import './ProductRating.scss'

function ProductRating({ rating }) {
  let stars = []

  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar key={`star-${i}`} />)
  }

  if (rating % 1 > 0) stars.push(<FaStarHalf key={`star-half`} />)

  return <span>{stars}</span>
}

export default ProductRating
