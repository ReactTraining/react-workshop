import React, { useReducer, useContext, forwardRef } from 'react'

const DisclosureContext = React.createContext()

export function Disclosure({ children, defaultIsOpen = false }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE': {
          return { ...state, isOpen: !state.isOpen }
        }
        default:
          return state
      }
    },
    {
      isOpen: defaultIsOpen,
    }
  )

  function onSelect() {
    dispatch({ type: 'TOGGLE' })
  }

  const context = {
    isOpen: state.isOpen,
    onSelect,
  }

  return <Disclosure.Provider children={children} value={context} />
}

export const DisclosureButton = forwardRef(({ children, ...props }, forwardedRef) => {
  const { onSelect } = useContext(DisclosureContext)

  return (
    <button onClick={onSelect} data-disclosure-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen } = useContext(DisclosureContext)

  return (
    <div hidden={!isOpen} data-disclosure-panel="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
