// These utils are similar (or identical) to the ones Reach UI uses

import { useMemo } from 'react'
export function wrapEvent(theirHandler, ourHandler) {
  return event => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}

export function useForkedRef(...refs) {
  return useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null
    }
    return node => {
      refs.forEach(ref => {
        assignRef(ref, node)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs)
}

export function assignRef(ref, value) {
  if (ref == null) return
  if (isFunction(ref)) {
    ref(value)
  } else {
    try {
      ref.current = value
    } catch (error) {
      throw new Error(
        `Cannot assign value "${value}" to ref "${ref}"`
      )
    }
  }
}

export function isFunction(value) {
  return !!(value && {}.toString.call(value) === '[object Function]')
}
