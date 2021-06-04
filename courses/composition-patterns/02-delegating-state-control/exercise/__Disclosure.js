import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

const DisclosureContext = React.createContext({})

export const Disclosure = React.forwardRef(
  ({ children, defaultOpen = false, onChange, className, ...domProps }, forwardedRef) => {
    let id = makeId('disclosure', useId())
    let panelId = makeId('panel', id)
    let [open, setOpen] = React.useState(defaultOpen)

    function toggle() {
      onChange && onChange()
      setOpen((open) => !open)
    }

    let context = {
      disclosureId: id,
      panelId,
      toggle,
      open,
    }

    return (
      <div className={composeClassNames(className, 'disclosure')} ref={forwardedRef} {...domProps}>
        <DisclosureContext.Provider value={context}>{children}</DisclosureContext.Provider>
      </div>
    )
  }
)

export const DisclosureButton = React.forwardRef(
  ({ children, className, onClick, ...domProps }, forwardedRef) => {
    let { open, panelId, toggle } = React.useContext(DisclosureContext)
    return (
      <button
        aria-controls={panelId}
        aria-expanded={open}
        data-state={open ? 'open' : 'collapsed'}
        className={composeClassNames(className, 'disclosure__button')}
        onClick={composeEventHandlers(onClick, toggle)}
        ref={forwardedRef}
        {...domProps}
      >
        <span className="disclosure__button-icon" aria-hidden>
          {open ? <FaAngleDown /> : <FaAngleRight />}
        </span>
        {children}
      </button>
    )
  }
)

export const DisclosurePanel = React.forwardRef(function DisclosurePanel(
  { children, className, id, ...domProps },
  forwardedRef
) {
  let { panelId, open } = React.useContext(DisclosureContext)
  return (
    <div
      hidden={!open}
      data-state={open ? 'open' : 'collapsed'}
      id={panelId}
      tabIndex={-1}
      ref={forwardedRef}
      className={composeClassNames(className, 'disclosure__panel')}
      {...domProps}
    >
      {children}
    </div>
  )
})

/**
 * @param {string} string
 * @return {string}
 */
function slugify(string) {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}

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
        ref(node)
      } else if (ref != null) {
        ref.current = node
      }
    }
  }
}

function makeId(...parts) {
  return parts.map(slugify).join('-')
}

let instance = -1
function useId() {
  let value = React.useMemo(() => String(++instance), [])
  return value
}
