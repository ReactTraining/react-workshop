import React from 'react'
import { Columns, Column } from 'react-flex-columns'

import Heading from 'YesterTech/Heading'
import Tiles from 'YesterTech/Tiles'
import Hero from 'YesterTech/Hero'
import ProductCategories from 'YesterTech/ProductCategories'
import ProductTile from 'YesterTech/ProductTile'

function Home() {
  return (
    <div className="spacing">
      <Hero />

      <section className="spacing">
        <ProductCategories />
        <hr />
      </section>

      <Columns gutters>
        <Column className="spacing" flex>
          <Heading as="h2" size={3}>
            Our most popular games
          </Heading>
          <hr />
          <Tiles>
            <ProductTile productId={2} />
            <ProductTile productId={3} />
            <ProductTile productId={10} />
          </Tiles>

          <hr />

          <Heading as="h2" size={3}>
            Our most popular gadgets
          </Heading>
          <hr />
          <Tiles>
            <ProductTile productId={15} />
            <ProductTile productId={4} />
            <ProductTile productId={6} />
          </Tiles>
        </Column>
        <Column className="spacing" size={20}>
          <Heading as="h2" size={3}>
            Old School Tech News
          </Heading>
          <hr />
          <ul>
            <li>
              <a href="/">
                This year's "Best 56k Modem" reviews are in. Did you ever think the Internet could
                be so fast?
              </a>
            </li>
            <li>
              <a href="/">How to tell if your kid is using Napster?</a>
            </li>
            <li>
              <a href="/">How Microsoft and AOL will someday rule the World!</a>
            </li>
            <li>
              <a href="/">Upgrade your RAM to 8MB.</a>
            </li>
            <li>
              <a href="/">HP buys Compaq Computer.</a>
            </li>
            <li>
              <a href="/">Did you know you can get a free email from your ISP, probably?</a>
            </li>
          </ul>
        </Column>
      </Columns>
    </div>
  )
}

export default Home
