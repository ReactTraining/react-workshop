import React, { useEffect, useState } from 'react'
import * as storage from 'YesterTech/localStorage'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

function SaveInFavorites({ productId }) {
  const [favorites, setFavorites] = useState(() => {
    return storage.getFavorites()
  })

  useEffect(() => {
    console.log('Update Favorites', favorites)
    storage.updateFavorites(favorites)
  }, [favorites])

  const favorite = favorites.includes(productId)

  function handleClick() {
    if (favorite) {
      // Remove by filtering an array down to everything that
      // doesn't match the productId
      setFavorites(favorites.filter(id => id !== productId))
    } else {
      // Add by concatenating two arrays together. If favorites
      // looks like this: [1, 2] and you concat an array that looks
      // like this [3], the end result is [1,2,3]
      setFavorites(favorites.concat([productId]))
    }
  }

  return (
    <button className="text-small as-link" onClick={handleClick}>
      <span>Favorite</span>
      {favorite ? <HiHeart color="#f00" /> : <HiOutlineHeart />}
    </button>
  )
}

export default SaveInFavorites
