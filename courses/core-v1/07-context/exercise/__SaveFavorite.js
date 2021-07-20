import * as React from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

// import { useFavoriteProduct } from 'YesterTech/FavoriteProductState'

function SaveFavorite({ productId }) {
  const [favorites, setFavorites] = React.useState([])

  // See if our productId is one of the favorites
  const favorite = favorites.includes(productId)

  function handleClick() {
    if (favorite) {
      // Remove favorites by filtering an array down to everything that
      // doesn't match the productId
      setFavorites(favorites.filter((id) => id !== productId))
    } else {
      // Add favorites by concatenating two arrays together. If favorites
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

export default SaveFavorite
