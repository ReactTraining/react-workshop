import { useState, useLayoutEffect, useEffect, useMemo } from 'react'

let serverHandoffComplete = false
let id = 0
const genId = () => ++id

export function useId(fallback?: string) {
  /*
   * If this instance isn't part of the initial render, we don't have to do the
   * double render/patch-up dance. We can just generate the ID and return it.
   */
  const initialId = fallback || (serverHandoffComplete ? genId() : null)

  const [id, setId] = useState(initialId)

  useLayoutEffect(() => {
    if (id === null) {
      /*
       * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
       * rendering flicker, though it'll make the first render slower (unlikely
       * to matter, but you're welcome to measure your app and let us know if
       * it's a problem).
       */
      setId(genId())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (serverHandoffComplete === false) {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      serverHandoffComplete = true
    }
  }, [])
  return id != null ? String(id) : undefined
}

// These utils are similar (or identical) to the ones Reach UI uses

export function composeEventHandlers<EventType extends React.SyntheticEvent | Event>(
  theirHandler: ((event: EventType) => any) | undefined,
  ourHandler: (event: EventType) => any
): (event: EventType) => any {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}

export function useComposedRefs<T>(...refs: React.Ref<T>[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }
    return (node: T) => {
      refs.forEach((ref) => {
        assignRef(ref, node)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs)
}

export function assignRef<T>(ref: React.Ref<T>, value: T) {
  if (ref == null) return
  if (isFunction(ref)) {
    ref(value)
  } else {
    try {
      ;(ref as any).current = value
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
    }
  }
}

export function isFunction(value: any): value is Function {
  return !!(value && {}.toString.call(value) === '[object Function]')
}
