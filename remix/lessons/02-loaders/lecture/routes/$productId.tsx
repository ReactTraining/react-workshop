import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProductType } from '~/utils/db.server'

// runs in node only
export async function loader({ params }: LoaderFunctionArgs) {
  const { productId } = params

  const product = (await fetch(`http://localhost:3333/products/${productId}`).then((res) =>
    res.json()
  )) as ProductType

  return { product }
}

// also run in node
export default function ProductProfile() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return <h1>ProductProfile: {product.name}</h1>
}
