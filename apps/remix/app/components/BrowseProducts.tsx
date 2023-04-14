import { Link } from '@remix-run/react'
import { Tiles } from './Tiles'
import { Icon } from './Icon'
import type { ProductType } from '~/utils/db.server'

type BrowseProductsProps = {
  products: ProductType[]
}

export function BrowseProducts({ products }: BrowseProductsProps) {
  return (
    <div>
      <Tiles>
        {products.map((product) => {
          return <BrowseProductItem key={product.id} product={product} />
        })}
      </Tiles>
    </div>
  )
}

type BrowseProductItemProps = {
  product: ProductType
}

export function BrowseProductItem({ product }: BrowseProductItemProps) {
  return (
    <div className="p-3 border rounded-lg bg-white overflow-hidden flex flex-col">
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
        <div className="flex gap-3">
          <div className="w-full flex flex-col">
            <Link to="/" className="button">
              View
            </Link>
          </div>
          <div className="flex-1">
            <button className="button button-outline">
              <Icon name="cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
