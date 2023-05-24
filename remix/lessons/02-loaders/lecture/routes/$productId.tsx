import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProductType } from '~/utils/db.server'
import { UnpackLoader } from '~/utils/helpers'

export default function ProductProfile() {
  return <h1>ProductProfile: Name</h1>
}
