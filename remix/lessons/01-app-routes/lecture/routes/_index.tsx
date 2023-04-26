import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import { Heading } from '~/components/Heading'
import { FilterByCheckbox } from '~/components/FilterByCheckbox'
import { getProducts } from '~/utils/db.server'
import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async ({ params }: LoaderArgs) => {
  const products = await getProducts()
  return json({ products })
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>()
  console.log(products)

  return <div>index</div>
}
