import * as React from 'react'
import { useFavoriteProduct } from 'YesterTech/FavoriteProductState'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { ReactFCNoChildren } from 'YesterTech/types'

interface SaveFavoriteProps {
  productId: number
}

const SaveFavorite: ReactFCNoChildren<SaveFavoriteProps> = ({ productId }): React.ReactElement => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteProduct()
  const favorite = isFavorite(productId)
  const action = favorite ? removeFavorite : addFavorite

  return (
    <button className="text-small as-link" onClick={() => action(productId)}>
      <span>Favorite</span>
      {favorite ? <HiHeart color="#f00" /> : <HiOutlineHeart />}
    </button>
  )
}

export default SaveFavorite
