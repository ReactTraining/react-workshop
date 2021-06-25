import * as React from 'react'
import { FaAngleRight } from 'react-icons/fa'

export function Disclosure() {
  return null
}

// Some handy utils that might be useful if you want them!
/**
 * @param {string} string
 * @returns {string}
 */
function slugify(string) {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}

/**
 * @param {...string} classNames
 * @returns {string}
 */
function composeClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

function composeEventHandlers(userEventHandler, internalEventHandler) {
  return function (event) {
    userEventHandler?.(event)
    if (!event.defaultPrevented) {
      internalEventHandler?.(event)
    }
  }
}

function useComposedRefs(...refs) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}

function composeRefs(...refs) {
  // accept multiple refs and return a singular callback ref
  return function composedCallbackRef(node) {
    for (let ref of refs) {
      if (typeof ref === 'function') {
        // @ts-ignore
        ref(node)
      } else if (ref != null) {
        // @ts-ignore
        ref.current = node
      }
    }
  }
}

/**
 * @param  {...string} parts
 * @returns {string}
 */
function makeId(...parts) {
  return parts.map(slugify).join('-')
}

let instance = -1
function useId() {
  let value = React.useMemo(() => String(++instance), [])
  return value
}
