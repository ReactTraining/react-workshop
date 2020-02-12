import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

export function Menu({ children, open: defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      onSelect: () => setIsOpen(!isOpen),
      closeMenu: () => setIsOpen(false),
    })
  })

  return <div data-menu="">{children}</div>
}

export const MenuButton = forwardRef(({ children, onSelect, ...props }, forwardedRef) => {
  return (
    <button onClick={onSelect} data-menu-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

MenuButton.displayName = 'MenuButton'

export const MenuList = forwardRef(({ children, isOpen, closeMenu, ...props }, forwardedRef) => {
  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      closeMenu,
    })
  })

  return (
    <div hidden={!isOpen} data-menu-list="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

MenuList.displayName = 'MenuList'

export const MenuItem = forwardRef(({ children, closeMenu, ...props }, forwardedRef) => {
  function onClick(e) {
    closeMenu()
    props.onSelect && props.onSelect(e)
  }

  return (
    <div role="menuitem" onClick={onClick} data-menu-item="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

MenuItem.displayName = 'MenuItem'
Menu.propTypes = {
  onSelect: PropTypes.func,
}
