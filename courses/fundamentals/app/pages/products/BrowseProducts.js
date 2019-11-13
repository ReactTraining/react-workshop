import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import api from '../../api'
import BrowseProductItem from '../../ui/BrowseProductItem'
import { Columns, Column } from 'react-flex-columns'
import { Heading, Pagination, PaginationRange, NoResults } from 'workshop'

function BrowseProducts() {
  const [products, setProducts] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const urlQuery = window.location.search
  const search = useMemo(() => queryString.parse(urlQuery), [urlQuery])
  const page = parseInt(search.page, 10) || 1

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
      <Columns split middle>
        <Column className="spacing">
          <Heading size={1}>Products</Heading>
        </Column>
        <Column>
          {Array.isArray(products) > 0 && (
            <PaginationRange
              resultsPerPage={10}
              page={page}
              totalResults={totalResults}
              query={search.q || ''}
            />
          )}
        </Column>
      </Columns>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="spacing">
          {products.map(product => (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              imagePath={product.imagePath}
              price={product.price}
              year={product.year}
              brand={product.brand}
              category={product.category}
              condition={product.condition}
            />
          ))}
        </div>
      ) : (
        <NoResults>
          No Results
          {search.q && (
            <span>
              {'. '}
              <Link to="/products">Clear Search & Filters</Link>
            </span>
          )}
        </NoResults>
      )}

      <Pagination
        as="footer"
        path="/products"
        totalResults={totalResults}
        page={page}
        resultsPerPage={10}
      />
    </div>
  )
}

export default BrowseProducts
