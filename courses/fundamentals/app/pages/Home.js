import React from 'react'
import { Heading, Tiles } from 'workshop'
import ProductTile from '../ui/ProductTile'

function Home() {
  return (
    <div className="spacing">
      <Heading>Home</Heading>
      <section className="hero"></section>

      <section className="spacing">
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
