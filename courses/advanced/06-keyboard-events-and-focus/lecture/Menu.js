import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useContext
} from 'react'
import PropTypes from 'prop-types'
import { Popover } from './Popover'
import { useId } from '../../useId'
import { wrapEvent, useForkedRef } from '../../utils'
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants
} from '@reach/descendants'

const DescendantContext = createDescendantContext('DescendantContext')
const MenuContext = React.createContext()

/**
 * Menu
 */

export function Menu({ children, id, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [descendants, setDescendants] = useDescendants()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const popoverRef = useRef(null)

  const context = {
    buttonId: `menu-button-${useId(id)}`,
    isOpen,
    setIsOpen,
    menuRef,
    buttonRef,
    popoverRef,
    activeIndex,
    setActiveIndex
  }

  return (
    <DescendantProvider
      context={DescendantContext}
      items={descendants}
      set={setDescendants}
    >
      <MenuContext.Provider value={context} children={children} />
    </DescendantProvider>
  )
}

Menu.propTypes = {
  onChange: PropTypes.func
}

/**
 * Menu Button
 */

export const MenuButton = forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const {
      buttonId,
      isOpen,
      setIsOpen,
      setActiveIndex,
      buttonRef
    } = useContext(MenuContext)

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

    // Handle onKeyDown for: ArrowDown

    return (
      <button
        ref={ref}
        {...props}
        id={buttonId}
        onClick={wrapEvent(onClick, handleClick)}
        data-menu-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {children}
      </button>
    )
  }
)

MenuButton.displayName = 'MenuButton'
MenuButton.propTypes = {
  onClick: PropTypes.func
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

export const MenuPopover = forwardRef(
  ({ onBlur, ...props }, forwardedRef) => {
    const {
      isOpen,
      setIsOpen,
      menuRef,
      popoverRef,
      buttonRef
    } = useContext(MenuContext)
    const ref = useForkedRef(popoverRef, forwardedRef)

    function handleBlur() {
      const ownerDocument =
        popoverRef.current?.ownerDocument || document
      requestAnimationFrame(() => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(ownerDocument.activeElement) &&
          ownerDocument.activeElement !== menuRef.current &&
          ownerDocument.activeElement !== buttonRef.current
        ) {
          setIsOpen(false)
        }
      })
    }

    return isOpen ? (
      <Popover
        {...props}
        ref={ref}
        onBlur={wrapEvent(onBlur, handleBlur)}
        targetRef={buttonRef}
      />
    ) : null
  }
)

MenuPopover.displayName = 'MenuPopover'

/**
 * Menu Items
 */

export const MenuItems = forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { buttonId, menuRef, isOpen } = useContext(MenuContext)
    const ref = useForkedRef(menuRef, forwardedRef)

    // Notice how we can get all the MenuItem descendants
    const { descendants } = useContext(DescendantContext)
    const totalItems = descendants.length

    // Handle onkeyDown for: Escape, Home, End, ArrowUp, ArrowDown, Tab
    // The tab should just do event.preventDefault() to prevent tabbing out

    return (
      <div
        role="menu"
        {...props}
        aria-labelledby={buttonId}
        hidden={!isOpen}
        data-menu-items=""
        data-state={isOpen ? 'open' : 'collapsed'}
        ref={ref}
        tabIndex={-1}
      >
        {children}
      </div>
    )
  }
)

MenuItems.displayName = 'MenuItems'

/**
 * Menu Item
 */

export const MenuItem = forwardRef(
  ({ children, onClick, onMouseEnter, ...props }, forwardedRef) => {
    const {
      menuRef,
      activeIndex,
      setIsOpen,
      setActiveIndex
    } = useContext(MenuContext)
    const menuItemRef = useRef(null)

    // Combine Refs
    const ref = useForkedRef(menuItemRef, forwardedRef)

    const index = useDescendant({
      context: DescendantContext,
      element: menuItemRef.current
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

    function handleMouseEnter() {
      setActiveIndex(index)
    }

    // Handle onkeyDown for: Enter (same outcome as click)

    return (
      <div
        role="menuitem"
        {...props}
        ref={ref}
        onClick={wrapEvent(onClick, handleClick)}
        onMouseEnter={wrapEvent(onMouseEnter, handleMouseEnter)}
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
  onSelect: PropTypes.func
}
