import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProductType } from '~/utils/db.server'

export async function loader({ params }: LoaderArgs) {
  const id = params.productId!
  const product = (await fetch(`http://localhost:3333/products/${id}`).then((res) =>
    res.json()
  )) as ProductType
  return json(product)
}

export default function ProductProfile() {
  const product = useLoaderData<typeof loader>()
  return <h1>ProductProfile: {product.name}</h1>
}
