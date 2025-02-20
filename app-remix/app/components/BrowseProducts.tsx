import { Link } from '@remix-run/react'
import { Tiles } from '~/components/Tiles'
import { CartButtons } from '~/components/CartButtons'
import type { ProductType } from '~/utils/db.server'
import { useCart } from '~/state/CartContext'

type BrowseProductsProps = {
  products: ProductType[]
}

export function BrowseProducts({ products }: BrowseProductsProps) {
  const { cart } = useCart()

  return (
    <div>
      <Tiles>
        {products.map((product) => {
          const quantityInCart = cart?.find((item) => item.productId === product.id)?.quantity || 0
          return (
            <div key={product.id} className="rounded-lg bg-white shadow-sm">
              <BrowseProductItem product={product} quantityInCart={quantityInCart || 0} />
            </div>
          )
        })}
      </Tiles>
    </div>
  )
}

type BrowseProductItemProps = {
  product: ProductType
  quantityInCart: number
}

export function BrowseProductItem({ product, quantityInCart }: BrowseProductItemProps) {
  return (
    <div className="p-3 overflow-hidden flex flex-col">
      <img
        src={`/images/products/${product.image}`}
        alt={product.name}
        className="block object-contain h-52"
      />
      <div className="space-y-3 mt-3 border-t">
        <div className="mt-3 flex justify-between items-center">
          <div className="">{product.name}</div>
          <b className="block">${product.price}</b>
        </div>
        <div className="flex gap-2">
          <CartButtons productId={product.id} quantityInCart={quantityInCart} />
          <div className="w-full flex flex-col">
            <Link to={`/products/${product.id}`} className="button">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
