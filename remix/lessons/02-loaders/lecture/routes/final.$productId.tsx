import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProductType } from '~/utils/db.server'
import { UnpackLoader } from '~/utils/helpers'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.productId!

  const product = (await fetch(`http://localhost:3333/products/${id}`).then((res) =>
    res.json()
  )) as ProductType

  return json(product)
}

export type LoaderData = UnpackLoader<typeof loader>

export default function ProductProfile() {
  const product = useLoaderData() as LoaderData
  return <h1>ProductProfile: {product.name}</h1>
}
