import React, { useRef, useState, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Popover } from './Popover'
import { wrapEvent, useForkedRef } from '../../utils'

const MenuContext = React.createContext()

/**
 * Menu
 */

export function Menu({ children, onChange, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const buttonRef = useRef(null)

  const context = {
    isOpen,
    buttonRef,
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
  const { isOpen, onSelect, buttonRef } = useContext(MenuContext)

  // Combine Refs
  const ref = useForkedRef(buttonRef, forwardedRef)

  return (
    <button
      onClick={wrapEvent(onClick, onSelect)}
      data-menu-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-expanded={isOpen}
      ref={ref}
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

// Menu List composes MenuPopover and MenuItems in a common way
export const MenuList = forwardRef((props, forwardedRef) => {
  return (
    <MenuPopover>
      <MenuItems {...props} data-menu-list="" ref={forwardedRef} />
    </MenuPopover>
  )
})

MenuList.displayName = 'MenuList'

/**
 * Menu Popover
 */

export const MenuPopover = forwardRef((props, forwardedRef) => {
  const { isOpen, buttonRef } = useContext(MenuContext)

  return isOpen ? <Popover {...props} ref={forwardedRef} targetRef={buttonRef} /> : null
})

MenuPopover.displayName = 'MenuPopover'

/**
 * Menu Items
 */

export const MenuItems = forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen } = useContext(MenuContext)

  return (
    <div
      hidden={!isOpen}
      data-menu-items=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

MenuItems.displayName = 'MenuItems'

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
