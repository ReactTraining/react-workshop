import { type ActionArgs } from '@remix-run/node'
import { addToCart, removeFromCart } from '~/utils/cart.server'

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)

  if (request.method === 'POST') {
    return await addToCart(request, productId)
  } else if (request.method === 'DELETE') {
    return await removeFromCart(request, productId)
  }

  return null
}
