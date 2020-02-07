import React, { useReducer, forwardRef, useContext } from 'react'

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

  function onSelect() {
    dispatch({ type: 'TOGGLE' })
  }

  function closeMenu() {
    dispatch({ type: 'CLOSE' })
  }

  const context = {
    isOpen: state.isOpen,
    onSelect,
    closeMenu,
  }

  return (
    <MenuContext.Provider value={context}>
      <div data-menu="">{children}</div>
    </MenuContext.Provider>
  )
}

export const MenuButton = forwardRef(({ children, ...props }, forwardedRef) => {
  const { onSelect } = useContext(MenuContext)

  return (
    <button onClick={onSelect} data-menu-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

MenuButton.displayName = 'MenuButton'

export const MenuList = forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen } = useContext(MenuContext)

  return (
    <div hidden={!isOpen} data-menu-list="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

MenuList.displayName = 'MenuList'

export const MenuItem = forwardRef(({ children, ...props }, forwardedRef) => {
  const { closeMenu } = useContext(MenuContext)

  function onClick(e) {
    closeMenu()
    typeof props.onSelect === 'function' && props.onSelect(e)
  }

  return (
    <div role="menuitem" onClick={onClick} data-menu-item="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

MenuItem.displayName = 'MenuItem'
