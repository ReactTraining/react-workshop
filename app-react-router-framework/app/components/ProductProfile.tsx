import { Heading } from './Heading'
import { CartButtons } from './CartButtons'
import { Link } from 'react-router'

type Props = {
  id: number
  name: string
  image: string
  brand: string
  brandHandle: string
  category: string
  categoryHandle: string
  price: number
  quantityInCart: number
}

export function ProductProfile({
  id,
  name,
  image,
  brand,
  brandHandle,
  category,
  categoryHandle,
  price,
  quantityInCart,
}: Props) {
  return (
    <div className="flex gap-6 space-y-3">
      <img
        src={`/images/products/${image}`}
        alt={name}
        className="block object-contain h-72 aspect-square"
      />
      <div className="flex-1 space-y-6">
        <header className="mt-3 flex justify-between items-center">
          <Heading>{name}</Heading>
          <div className="text-3xl text-headingColor">${price.toFixed(2)}</div>
        </header>
        <div className="space-x-2">
          <i>
            Brand: <Link to={`/products?brand=${brandHandle}`}>{brand}</Link>
          </i>
          <i>
            Type: <Link to={`/products?category=${categoryHandle}`}>{category}</Link>
          </i>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, suscipit! Delectus,
          aperiam sed nihil, commodi quia expedita nisi voluptates quisquam, neque fugit suscipit
          odio sint ipsum obcaecati. Molestiae, inventore? Soluta?
        </p>
        <div className="flex gap-3">
          <CartButtons productId={id} quantityInCart={quantityInCart} />
        </div>
      </div>
    </div>
  )
}
