import type { LoaderFunctionArgs } from 'react-router'
import type { ProductType } from '~/utils/db.server'
import type { Route } from './+types/final.product-profile'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.productId!

  const product = (await fetch(`http://localhost:3333/products/${id}`).then((res) =>
    res.json()
  )) as ProductType

  return new Response(JSON.stringify(product), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60', // cache for 60 seconds
    },
  })
}

export default function ProductProfile({ loaderData: product }: Route.ComponentProps) {
  // const product = useLoaderData<typeof loader>() // OLD REMIX WAY
  return <h1>ProductProfile: {product.name}</h1>
}
