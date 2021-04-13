import * as React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  let stars = []

  for (let i = 0; i < max; ++i) {
    if (i + 1 <= rating) {
      stars.push(<FaStar key={i} aria-label="full star rating" />)
    } else if (i < rating) {
      stars.push(<FaStarHalfAlt key={i} aria-label="half star rating" />)
    } else {
      stars.push(<FaRegStar key={i} aria-label="empty star rating" />)
    }
  }

  return <span className="star-ratings">{stars}</span>
}

type StarRatingProps = {
  rating: number
  max?: number
}
