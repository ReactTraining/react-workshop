import { useEffect, useState, useRef } from 'react'
import { get } from 'YesterTech/api/utils'
import queryString from 'query-string'

export function getProducts() {
  const query = queryString.stringify({
    _limit: 10
  })
  return get(`/products?${query}`)
}

export function useUndoState(defaultValue) {
  const [value, setValue] = useState(defaultValue)
  const historyRef = useRef([])

  function undo() {
    const lastValue = historyRef.current.pop()
    setValue(lastValue)
  }

  function updateValue(newValue) {
    historyRef.current.push(value)
    setValue(newValue)
  }

  return [value, updateValue, undo]
}

export function useLocalStorage(name) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(name)
  })

  useEffect(() => {
    localStorage.setItem(name, value)
  }, [name, value])

  return [value, setValue]
}
