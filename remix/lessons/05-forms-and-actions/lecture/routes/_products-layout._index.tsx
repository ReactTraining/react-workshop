import {
  Form,
  useFetcher,
  useNavigation,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react'
import { type ActionArgs, type LoaderArgs, json } from '@remix-run/node'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { type UnpackLoader, sleep } from '~/utils/helpers'
// import { addToCart, removeFromCart, getCart } from '~/utils/cart.server'
import type { LoaderData as RouteLoaderData } from './_products-layout'

// async function addToCart(productId: number) {
//   console.log('add product', productId)
//   return Promise.resolve('').then(sleep(2000))
// }

// async function removeFromCart(productId: number) {
//   console.log('remove product', productId)
//   return Promise.resolve('').then(sleep(3000))
// }

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const productId = formData.get('productId')
  console.log('product', productId)

  return null
}

export default function () {
  const { products } = useRouteLoaderData('routes/_products-layout') as RouteLoaderData

  function addToCart(productId: number) {
    fetch('/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
  }

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
                <button
                  onClick={() => addToCart(product.id)}
                  className="button button-outline whitespace-nowrap"
                  type="submit"
                >
                  <Icon name="cart" />
                </button>
                <button className="button">Remove</button>
              </div>
            </div>
          </div>
        )
      })}
    </Tiles>
  )
}

// type AddProps = {
//   productId: number
//   quantityInCart?: number
// }

// function AddToCart({ productId, quantityInCart = 0 }: AddProps) {

// }

// type RemoveProps = {
//   productId: number
// }

// function RemoveFromCart({ productId }: RemoveProps) {

// }
