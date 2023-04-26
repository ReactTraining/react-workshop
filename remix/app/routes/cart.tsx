import { type ActionArgs } from '@remix-run/node'
import { Heading } from '~/components/Heading'
import { addToCart, removeFromCart } from '~/utils/cart.server'

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)

  switch (request.method) {
    case 'POST': {
      return await addToCart(request, productId)
    }
    case 'DELETE': {
      return await removeFromCart(request, productId)
    }
    default: {
      return null
    }
  }
}

// export default function () {
//   return (
//     <div>
//       <Heading>View Cart</Heading>
//       <div>...</div>
//     </div>
//   )
// }
