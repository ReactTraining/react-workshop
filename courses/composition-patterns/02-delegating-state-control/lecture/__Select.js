/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

const SelectContext = React.createContext({})

function SelectBase({ selectedOption, setSelectedOption, children, className, ...domProps }) {
  let [isOpen, setIsOpen] = React.useState(false)
  let listRef = React.useRef()
  let buttonRef = React.useRef()

  // Re-focus the select button when the menu closes, but since it's initially
  // closed we need to skip the initial render
  let rendered = React.useRef(false)
  React.useEffect(() => {
    if (rendered.current && !isOpen) {
      window.requestAnimationFrame(() => {
        buttonRef.current?.focus()
      })
    }

    rendered.current = true
  }, [isOpen])

  return (
    <div className={composeClassNames(className, 'select')} {...domProps}>
      <SelectContext.Provider
        value={{
          listRef,
          buttonRef,
          isOpen,
          setIsOpen,
          selectedOption,
          setSelectedOption,
        }}
      >
        {children}
      </SelectContext.Provider>
    </div>
  )
}

const SelectButton = React.forwardRef(({ className, onClick, children, ...domProps }, ref) => {
  let { buttonRef, listRef, setIsOpen, selectedOption } = React.useContext(SelectContext)
  return (
    <button
      ref={useComposedRefs(buttonRef, ref)}
      onClick={composeEventHandlers(onClick, () => {
        setIsOpen((state) => !state)
        window.requestAnimationFrame(() => {
          listRef.current?.focus()
        })
      })}
      className={composeClassNames(className, 'select-button')}
      aria-haspopup="listbox"
      id="select-button"
      {...domProps}
    >
      {selectedOption}
    </button>
  )
})

const SelectList = React.forwardRef(
  ({ children, className, onBlur, onKeyDown, ...domProps }, ref) => {
    let { isOpen, listRef, setIsOpen, selectedOption } = React.useContext(SelectContext)
    return (
      <div
        id="select-list"
        className={composeClassNames(className, 'select-list')}
        role="listbox"
        tabIndex={-1}
        hidden={!isOpen}
        // This is the ID of the selected option
        aria-activedescendant={`option-${slugify(selectedOption)}`}
        ref={useComposedRefs(listRef, ref)}
        onBlur={composeEventHandlers(onBlur, () => {
          setIsOpen(false)
        })}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          switch (event.key) {
            case 'Escape':
              setIsOpen(false)
              break
            default:
              break
          }
        })}
        {...domProps}
      >
        {children}
      </div>
    )
  }
)

const SelectOptionBase = React.forwardRef(
  ({ value, className, onClick, children, ...domProps }, ref) => {
    let { setSelectedOption, setIsOpen, selectedOption } = React.useContext(SelectContext)
    return (
      <div
        ref={ref}
        role="option"
        id={`option-${slugify(selectedOption)}`}
        className={composeClassNames(className, 'select-option')}
        onClick={composeEventHandlers(onClick, (event) => {
          event.preventDefault()
          setSelectedOption(value)
          setIsOpen(false)
        })}
        aria-selected={selectedOption === value || undefined}
        {...domProps}
      >
        {value}
      </div>
    )
  }
)

export function Select({ selectedOption, setSelectedOption, children }) {
  return (
    <SelectBase selectedOption={selectedOption} setSelectedOption={setSelectedOption}>
      <SelectButton />
      <SelectList>{children}</SelectList>
    </SelectBase>
  )
}

export function SelectOption({ value }) {
  return <SelectOptionBase value={value} />
}

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
      if (isCallbackRef(ref)) {
        ref(node)
      } else if (ref != null) {
        ref.current = node
      }
    }
  }
}

function isCallbackRef(v) {
  return typeof v === 'function'
}
