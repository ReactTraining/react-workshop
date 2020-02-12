import React, { useReducer, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'

const MenuContext = React.createContext()

export function Menu({ children, open: defaultIsOpen = false }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE': {
          return { ...state, isOpen: !state.isOpen }
        }
        case 'CLOSE': {
          return { ...state, isOpen: false }
        }
        default:
          return state
      }
    },
    {
      isOpen: defaultIsOpen,
    }
  )

  const context = {
    state,
    dispatch,
  }

  return (
    <MenuContext.Provider value={context}>
      <div data-menu="">{children}</div>
    </MenuContext.Provider>
  )
}

export const MenuButton = forwardRef(({ children, ...props }, forwardedRef) => {
  const { dispatch } = useContext(MenuContext)

  function handleClick() {
    dispatch({ type: 'TOGGLE' })
  }

  return (
    <button onClick={handleClick} data-menu-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

MenuButton.displayName = 'MenuButton'

export const MenuList = forwardRef(({ children, ...props }, forwardedRef) => {
  const { state } = useContext(MenuContext)

  return (
    <div hidden={!state.isOpen} data-menu-list="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

MenuList.displayName = 'MenuList'

export const MenuItem = forwardRef(({ children, ...props }, forwardedRef) => {
  const { dispatch } = useContext(MenuContext)

  function handleClick(e) {
    dispatch({ type: 'CLOSE' })
    props.onSelect && props.onSelect(e)
  }

  return (
    <div role="menuitem" onClick={handleClick} data-menu-item="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

MenuItem.displayName = 'MenuItem'
Menu.propTypes = {
  onSelect: PropTypes.func,
}
