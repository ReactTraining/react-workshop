import {
  Form,
  useFetcher,
  useNavigation,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react'
import { type ActionFunctionArgs, type LoaderFunctionArgs, json } from '@remix-run/node'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { getCart } from '~/utils/cart.server'
import { addToCart, removeFromCart } from '~/utils/cart.server'
import type { LoaderData as RouteLoaderData } from './_products-layout'
import { sleep } from '~/utils/helpers'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)
  const quantity = parseInt(formData.get('quantity') as string)

  // addToCart commits to the cookie so we need to return special headers.
  // Without the return, it wont work
  return await addToCart(request, productId, quantity)
}

// ⭐️ Loader "Revalidates" After Action
//  - Will only happen in the future upon action's 200 responses
export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request)
  return json({ cart })
}

export default function ProductsIndex() {
  const { cart } = useLoaderData<typeof loader>()
  const { products } = useRouteLoaderData<RouteLoaderData>('routes/_products-layout')!

  const navigation = useNavigation()

  return (
    <Tiles>
      {products.map((product) => {
        const quantityInCart = cart?.find((c) => c.productId === product.id)?.quantity || 0
        const isSubmitting =
          navigation.state === 'submitting' &&
          navigation?.formData?.get('productId') === product.id.toString()

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
                <div>{product.name}</div>
                <b className="block">${product.price}</b>
              </div>
              <div className="flex gap-2">
                {isSubmitting && '...'}
                <Form method="post">
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="quantity" value={quantityInCart + 1} />
                  <button
                    className="button button-outline whitespace-nowrap"
                    type="submit"
                    aria-label="Add To Cart"
                  >
                    <Icon name="cart" /> {quantityInCart > 0 && quantityInCart}
                  </button>
                </Form>
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
