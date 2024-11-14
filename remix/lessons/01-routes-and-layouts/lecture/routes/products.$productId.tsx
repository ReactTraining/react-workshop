import { useParams } from '@remix-run/react'

export default function Page() {
  const { productId } = useParams()
  return <div>special {productId}</div>
}
