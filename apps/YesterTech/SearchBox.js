import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { IoIosSearch } from 'react-icons/io'

import 'YesterTech/SearchBox.scss'

function SearchBox({ placeholder, path }) {
  const history = useHistory()
  const search = useLocation().search
  const [query, setQuery] = useState(queryString.parse(search).q || '')

  useEffect(() => {
    setQuery(queryString.parse(search).q || '')
  }, [search])

  function handleSubmit(event) {
    event.preventDefault()
    const search = queryString.stringify({
      ...queryString.parse(window.location.search),
      q: query
    })
    history.push(`${path}?${search}`)
  }

  function clear() {
    setQuery('') // Optimistic
    history.push(path)
  }

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <IoIosSearch />
      <input
        type="text"
        aria-label="Keyword Search"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="clear-search" type="button" onClick={clear}>
        Clear
      </button>
    </form>
  )
}

export default SearchBox
