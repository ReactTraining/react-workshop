import { useParams } from 'react-router'

export default function Page() {
  const productId = useParams().productId!
  return (
    <div>
      <h1>Product Profile: {productId}</h1>
    </div>
  )
}
