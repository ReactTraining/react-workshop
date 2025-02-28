import { type ActionFunctionArgs } from 'react-router'
import { addToCart, removeFromCart } from '~/utils/cart.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)
  const quantity = parseInt(formData.get('quantity') as string)

  switch (request.method) {
    case 'POST': {
      return await addToCart(request, productId, quantity)
    }
    case 'DELETE': {
      return await removeFromCart(request, productId)
    }
    default: {
      return null
    }
  }
}
