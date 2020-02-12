import React, { useState, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from '../../utils'

const MenuContext = React.createContext()

/**
 * Menu
 */

export function Menu({ children, onChange, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const context = {
    isOpen,
    onSelect: () => {
      onChange && onChange(!isOpen)
      setIsOpen(!isOpen)
    },
    close: () => {
      onChange && onChange(false)
      setIsOpen(false)
    },
  }

  return <MenuContext.Provider value={context} children={children} />
}

Menu.propTypes = {
  onChange: PropTypes.func,
}

/**
 * Menu Button
 */

export const MenuButton = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { isOpen, onSelect } = useContext(MenuContext)

  return (
    <button
      onClick={wrapEvent(onClick, onSelect)}
      data-menu-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-expanded={isOpen}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </button>
  )
})

MenuButton.displayName = 'MenuButton'
MenuButton.propTypes = {
  onClick: PropTypes.func,
}

/**
 * Menu List
 */

export const MenuList = forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen } = useContext(MenuContext)

  return (
    <div
      hidden={!isOpen}
      data-menu-list=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

MenuList.displayName = 'MenuList'

/**
 * Menu Item
 */

export const MenuItem = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { close } = useContext(MenuContext)

  function handleClick(e) {
    close()
    props.onSelect && props.onSelect(e)
  }

  return (
    <div
      role="menuitem"
      onClick={wrapEvent(onClick, handleClick)}
      data-menu-item=""
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

MenuItem.displayName = 'MenuItem'
Menu.propTypes = {
  onSelect: PropTypes.func,
}
