import React from 'react'
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa'
import 'YesterTech/StarRatings.scss'

function StarRatings({ rating }) {
  return (
    <span className="star-ratings" aria-hidden="true">
      {[1, 2, 3, 4, 5].map(current => {
        if (current <= rating) return <FaStar key={current} />
        if (current - rating < 1) return <FaStarHalfAlt key={current} />
        return <FaRegStar key={current} />
      })}
    </span>
  )
}

export default StarRatings
