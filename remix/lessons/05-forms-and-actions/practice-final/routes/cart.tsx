import { type ActionFunctionArgs } from '@remix-run/node'
import { addToCart, removeFromCart } from '~/utils/cart.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)
  const quantity = parseInt(formData.get('quantity') as string)

  if (request.method === 'POST') {
    return await addToCart(request, productId, quantity)
  } else if (request.method === 'DELETE') {
    return await removeFromCart(request, productId)
  }

  return null
}
