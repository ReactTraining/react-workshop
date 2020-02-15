import React, { useRef, useState, useEffect, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Popover } from './Popover'
import { wrapEvent, useForkedRef } from '../../utils'
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants,
} from '@reach/descendants'

const DescendantContext = createDescendantContext('DescendantContext')
const MenuContext = React.createContext()

/**
 * Menu
 */

export function Menu({ children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [descendants, setDescendants] = useDescendants()
  const buttonRef = useRef(null)

  const context = {
    isOpen,
    setIsOpen,
    buttonRef,
    activeIndex,
    setActiveIndex,
  }

  return (
    <DescendantProvider context={DescendantContext} items={descendants} set={setDescendants}>
      <MenuContext.Provider value={context} children={children} />
    </DescendantProvider>
  )
}

Menu.propTypes = {
  onChange: PropTypes.func,
}

/**
 * Menu Button
 */

export const MenuButton = forwardRef(({ children, onClick, onKeyDown, ...props }, forwardedRef) => {
  const { isOpen, setIsOpen, setActiveIndex, buttonRef } = useContext(MenuContext)

  // Combine Refs
  const ref = useForkedRef(buttonRef, forwardedRef)

  function handleClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
      setActiveIndex(0)
    }
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        setIsOpen(true)
        setActiveIndex(0)
        break
      default:
        break
    }
  }

  return (
    <button
      ref={ref}
      {...props}
      onClick={wrapEvent(onClick, handleClick)}
      onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      data-menu-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-expanded={isOpen}
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

export const MenuItems = forwardRef(({ children, onKeyDown, ...props }, forwardedRef) => {
  const { isOpen, setIsOpen, activeIndex, setActiveIndex } = useContext(MenuContext)
  const { descendants } = useContext(DescendantContext)
  const totalItems = descendants.length

  function handleKeyDown(event) {
    if (!isOpen) return
    switch (event.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'Home':
        setActiveIndex(0)
        break
      case 'End':
        setActiveIndex(totalItems - 1)
        break
      case 'ArrowUp':
        if (activeIndex !== 0) {
          setActiveIndex(activeIndex - 1)
        }
        break
      case 'ArrowDown':
        if (activeIndex < totalItems - 1) {
          setActiveIndex(activeIndex + 1)
        }
        break
      case 'Tab':
        event.preventDefault()
        break
      default:
        break
    }
  }

  return (
    <div
      role="menu"
      {...props}
      onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      hidden={!isOpen}
      data-menu-items=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={forwardedRef}
      tabIndex={-1}
    >
      {children}
    </div>
  )
})

MenuItems.displayName = 'MenuItems'

/**
 * Menu Item
 */

export const MenuItem = forwardRef(
  ({ children, onClick, onMouseEnter, onKeyDown, ...props }, forwardedRef) => {
    const { menuRef, activeIndex, setIsOpen, setActiveIndex } = useContext(MenuContext)
    const menuItemRef = useRef(null)

    // Combine Refs
    const ref = useForkedRef(menuItemRef, forwardedRef)

    const index = useDescendant({
      context: DescendantContext,
      element: menuItemRef.current,
    })

    const isSelected = index === activeIndex

    useEffect(() => {
      if (isSelected) {
        menuItemRef.current.focus()
      }
    }, [isSelected, menuRef])

    function handleClick(event) {
      props.onSelect && props.onSelect(event)
      setIsOpen(false)
    }

    function handleKeyDown(event) {
      switch (event.key) {
        case 'Enter':
          props.onSelect && props.onSelect(event)
          setIsOpen(false)
          break
        default:
          break
      }
    }

    function handleMouseEnter() {
      setActiveIndex(index)
    }

    return (
      <div
        role="menuitem"
        {...props}
        ref={ref}
        onClick={wrapEvent(onClick, handleClick)}
        onMouseEnter={wrapEvent(onMouseEnter, handleMouseEnter)}
        onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
        data-menu-item=""
        data-selected={isSelected ? '' : undefined}
        tabIndex={-1}
      >
        {children}
      </div>
    )
  }
)

MenuItem.displayName = 'MenuItem'
Menu.propTypes = {
  onSelect: PropTypes.func,
}
