import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from 'react-router'
import { ProductType } from '~/utils/db.server'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.productId!

  const product = (await fetch(`http://localhost:3333/products/${id}`).then((res) =>
    res.json()
  )) as ProductType

  return product
}

export default function ProductProfile() {
  const product = useLoaderData<typeof loader>()
  return <h1>ProductProfile: {product.name}</h1>
}
