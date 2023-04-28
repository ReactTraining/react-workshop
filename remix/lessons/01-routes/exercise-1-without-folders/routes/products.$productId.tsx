import { useParams } from '@remix-run/react'

export default function () {
  const productId = useParams().productId!
  return <div>Product Profile: {productId}</div>
}
