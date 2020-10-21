import { useEffect, useState, useRef } from 'react'
import { get } from 'YesterTech/api/utils'
import queryString from 'query-string'

export function getProducts() {
  const query = queryString.stringify({
    _limit: 10
  })
  return get(`/products?${query}`)
}

export function useUndoState(defaultState) {
  const [values, setValues] = useState([defaultState])

  function undo() {
    setValues(values.slice(0, values.length - 1))
  }

  function changeValue(newValue) {
    setValues(values.concat([newValue]))
  }

  return [values.slice(values.length - 1), changeValue, undo]
}
