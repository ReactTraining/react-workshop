import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProductType } from '~/utils/db.server'

// Only runs on the serer
export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.productId!

  const product = (await fetch(`http://localhost:3333/products/${id}`).then((res) =>
    res.json()
  )) as ProductType

  return { product }
}

export default function ProductProfile() {
  const { product } = useLoaderData<typeof loader>()

  return <h1>ProductProfile: {product.name}</h1>
}
