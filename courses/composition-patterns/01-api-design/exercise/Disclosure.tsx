import * as React from 'react'
import { FaAngleRight } from 'react-icons/fa'

export function Disclosure() {
  return null
}

interface DisclosureProps {
  // What will your props look like? 👀
}

// Some handy utils that might be useful if you want them!
function slugify(string: string): string {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}

function composeClassNames(...classNames: string[]): string {
  return classNames.filter(Boolean).join(' ')
}

function composeEventHandlers<
  EventType extends React.SyntheticEvent<any>,
  Handler extends React.EventHandler<EventType>
>(userEventHandler: Handler, internalEventHandler: Handler) {
  return function (event: EventType): void {
    userEventHandler?.(event)
    if (!event.defaultPrevented) {
      internalEventHandler?.(event)
    }
  }
}

function useComposedRefs<Ref extends React.Ref<Value>, Value = any>(...refs: Ref[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}

function composeRefs<Ref extends React.Ref<Value>, Value = any>(...refs: Ref[]) {
  // accept multiple refs and return a singular callback ref
  return function composedCallbackRef(node: Value) {
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

function makeId(...parts: string[]) {
  return parts.map(slugify).join('-')
}

function useId() {
  let valueRef = React.useRef<string>()
  if (valueRef.current === undefined) {
    valueRef.current = String(uniqueId())
  }
  return valueRef.current
}

// naiive implementation details, feel free to ignore!
let instance = -1
function uniqueId() {
  return ++instance
}
