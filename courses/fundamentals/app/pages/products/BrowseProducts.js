import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import api from '../../api'
import BrowseProductItem from '../../ui/BrowseProductItem'
import { Columns, Column } from 'react-flex-columns'
import { Heading } from 'workshop'

function BrowseProducts() {
  const [products, setProducts] = useState(null)
  const [totalResults, setTotalResults] = useState(null)
  const urlQuery = window.location.search
  const search = useMemo(() => queryString.parse(urlQuery), [urlQuery])

  useEffect(() => {
    let isCurrent = true
    api.products.getProducts(search).then(({ products, total }) => {
      if (!isCurrent) return
      setProducts(products)
      setTotalResults(total)
    })
    return () => (isCurrent = false)
  }, [search])

  return (
    <div className="browse-products spacing">
      <Columns split>
        <Column className="spacing">
          <Heading size={1}>Browse Products</Heading>
        </Column>
        <Column>
          {Array.isArray(products) > 0 && (
            <div className="horizontal-spacing text-small">
              <span>
                Showing 1 - 1 of {`${totalResults} `}
                {search.q && (
                  <span>
                    {' '}
                    from search: <strong>{search.q}</strong>
                  </span>
                )}
              </span>
              {search.q && <Link to="/products">Clear</Link>}
            </div>
          )}
        </Column>
      </Columns>

      {Array.isArray(products) &&
        products.map(product => (
          <BrowseProductItem
            key={product.id}
            productId={product.id}
            name={product.name}
            imagePath={product.imagePath}
            year={product.year}
            brand={product.brand}
            category={product.category}
            condition={product.condition}
          />
        ))}
    </div>
  )
}

export default BrowseProducts
