import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from 'react-router'
import { ProductType } from '~/utils/db.server'

export default function ProductProfile() {
  return <h1>ProductProfile: Name</h1>
}
