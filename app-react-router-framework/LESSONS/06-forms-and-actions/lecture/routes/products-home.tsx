import {
  Form,
  useFetcher,
  useNavigation,
  useRouteLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { addToCart, getCart, removeFromCart } from '~/utils/cart.server'
import type { LoaderData as RouteLoaderData } from './products-layout'
import { sleep } from '~/utils/helpers'
import type { Route } from './+types/products-home'

// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData()
//   const productId = parseInt(formData.get('productId') as string)
//   const quantity = parseInt(formData.get('quantity') as string)

//   if (request.method === 'POST') {
//     return await addToCart(request, productId, quantity).then(sleep()) // latency
//   } else if (request.method === 'DELETE') {
//     return await removeFromCart(request, productId)
//   }
// }

// ⭐️ Loader "Revalidates" After successful 200 Action
export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request)
  return { cart }
}

export default function Page({ loaderData: { cart } }: Route.ComponentProps) {
  const { products } = useRouteLoaderData<RouteLoaderData>('routes/products-layout')!

  const addFetcher = useFetcher()
  const removeFetcher = useFetcher()

  return (
    <Tiles>
      {products.map((product) => {
        const quantityInCart = cart?.find((c) => c.productId === product.id)?.quantity || 0
        // const isSubmitting =
        //   navigation.state === 'submitting' &&
        //   navigation?.formData?.get('productId') === product.id.toString()

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
                <addFetcher.Form method="POST">
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="quantity" value={quantityInCart + 1} />
                  <button
                    className="button button-outline whitespace-nowrap"
                    type="submit"
                    aria-label="Add To Cart"
                  >
                    <Icon name="cart" /> {quantityInCart > 0 && quantityInCart}
                    {/* {isSubmitting && '...'} */}
                  </button>
                </addFetcher.Form>
                <removeFetcher.Form method="POST">
                  <input type="hidden" name="productId" value={product.id} />
                  <button className="button">Remove</button>
                </removeFetcher.Form>
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
