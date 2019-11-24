import React from 'react'
import { Heading, Tiles } from 'workshop'
import ProductTile from '../ui/ProductTile'
import useProducts from '../hooks/useProducts'

function Home() {
  let { products, totalResults } = useProducts()

  return (
    <div className="spacing">
      <Heading>Home</Heading>
      <section className="hero"></section>

      <section className="spacing">
        {totalResults === 0 ? (
          <div>loading...</div>
        ) : (
          <Tiles>
            {products.map((product, index) => {
              return <ProductTile key={`tile-${index}`} productId={product.id} />
            })}
          </Tiles>
        )}
      </section>
    </div>
  )
}

export default Home
