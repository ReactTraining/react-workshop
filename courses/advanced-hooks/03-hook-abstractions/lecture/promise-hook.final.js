import * as React from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

// This useApi is also so generic, it could just be usePromise for
// any promise-based side effects

function useApi(api) {
  const [results, setResults] = React.useState(null)

  React.useEffect(() => {
    let isCurrent = true
    api().then(results => {
      if (!isCurrent) return
      setResults(results)
    })
    return () => (isCurrent = false)
  }, [api])

  return results
}

function ProductProfile({ productId }) {
  const product = useApi(
    React.useCallback(() => api.products.getProduct(productId), [productId])
  )

  if (!product) return <div>Loading...</div>

  return (
    <div className="spacing">
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

export default function App() {
  return (
    <div className="effects-in-custom-hooks">
      <ProductProfile productId={1} />
    </div>
  )
}
