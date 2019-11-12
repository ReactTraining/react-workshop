import React from 'react'
import { Heading, Tiles } from 'workshop'
import ProductTile from '../ui/ProductTile'

function Home() {
  return (
    <div>
      <Heading>Home</Heading>
      <br />
      <br />
      <br />
      <br />

      <section className="spacing">
        <Heading as="h2" size={4}>
          Home
        </Heading>

        <Tiles>
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
        </Tiles>
      </section>
    </div>
  )
}

export default Home
