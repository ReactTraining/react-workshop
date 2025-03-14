import { Link } from 'react-router'
import { Icon } from '~/components/Icon'
import { Tiles } from '~/components/Tiles'
import type { ProductType } from '~/utils/db.server'
import type { Route } from './+types/final.home'

export async function loader() {
  const products = (await fetch('http://localhost:3333/products').then((res) =>
    res.json()
  )) as ProductType[]

  return { products }
}

export default function Index({ loaderData: { products } }: Route.ComponentProps) {
  // const product = useLoaderData<typeof loader>() // OLD REMIX WAY
  return (
    <Tiles>
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="p-3 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col"
          >
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
                <div className="flex-1">
                  <button className="button button-outline whitespace-nowrap" type="submit">
                    <Icon name="cart" />
                  </button>
                </div>
                <div className="w-full flex flex-col">
                  <Link to={product.id.toString()} className="button">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Tiles>
  )
}
