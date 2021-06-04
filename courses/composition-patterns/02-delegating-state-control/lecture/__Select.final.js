/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

const SelectContext = React.createContext({})
const OptionsContext = React.createContext({})

function SelectBase({
  value: externalValue,
  defaultValue,
  onValueChange,
  children,
  className,
  ...domProps
}) {
  let [options, setOptions] = React.useState([])

  const addOption = React.useCallback(function addOption(string) {
    setOptions((opts) => (opts.includes(string) ? opts : [...opts, string]))
  }, [])

  const removeOption = React.useCallback(function removeOption(string) {
    setOptions((opts) => opts.filter((opt) => opt !== string))
  }, [])

  let [value, setValue, isControlled] = useControlledState(
    externalValue,
    defaultValue,
    onValueChange
  )
  let [isOpen, setIsOpen] = React.useState(false)
  let listRef = React.useRef()
  let buttonRef = React.useRef()

  if (!isControlled && value === undefined && options.length > 0) {
    setValue(options[0])
  }

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
      <OptionsContext.Provider value={{ addOption, removeOption }}>
        <SelectContext.Provider
          value={{
            listRef,
            buttonRef,
            isOpen,
            setIsOpen,
            value,
            onValueChange: setValue,
          }}
        >
          {children}
        </SelectContext.Provider>
      </OptionsContext.Provider>
    </div>
  )
}

const SelectButton = React.forwardRef(({ className, onClick, children, ...domProps }, ref) => {
  let { buttonRef, listRef, setIsOpen, value } = React.useContext(SelectContext)
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
      {value}
    </button>
  )
})

const SelectList = React.forwardRef(
  ({ children, className, onBlur, onKeyDown, ...domProps }, ref) => {
    let { isOpen, listRef, setIsOpen, value } = React.useContext(SelectContext)
    return (
      <div
        id="select-list"
        className={composeClassNames(className, 'select-list')}
        role="listbox"
        tabIndex={-1}
        hidden={!isOpen}
        // This is the ID of the selected option
        aria-activedescendant={value ? `option-${slugify(value)}` : undefined}
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
    let { onValueChange, setIsOpen, value: selectedValue } = React.useContext(SelectContext)
    let { addOption, removeOption } = React.useContext(OptionsContext)

    React.useLayoutEffect(() => {
      addOption(value)
      return () => {
        removeOption(value)
      }
    }, [addOption, removeOption, value])
    return (
      <div
        ref={ref}
        role="option"
        id={`option-${slugify(value)}`}
        className={composeClassNames(className, 'select-option')}
        onClick={composeEventHandlers(onClick, (event) => {
          event.preventDefault()
          onValueChange(value)
          setIsOpen(false)
        })}
        aria-selected={value === selectedValue || undefined}
        {...domProps}
      >
        {value}
      </div>
    )
  }
)

export function Select({ value, onValueChange, defaultValue, children }) {
  return (
    <SelectBase value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
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

function useControlledState(externalValue, defaultValue, onValueChange) {
  let isControlled = React.useRef(externalValue !== undefined).current

  let isCurrentlyControlled = externalValue !== undefined
  let controlledStateChanged = isControlled !== isCurrentlyControlled

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (controlledStateChanged) {
        console.warn(
          `Heyyyyy that custom select is changing between controlled and uncontrolled states. You shouldn't do that or you're going to have a bad time! Check the value prop and make sure you're doing it right.`
        )
      }
    }
  }, [controlledStateChanged])

  let [internalValue, setInternalValue] = React.useState(defaultValue)
  let value = isControlled ? externalValue : internalValue

  function setValue(newValue) {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    if (onValueChange && newValue !== value) {
      onValueChange(newValue)
    }
  }
  return [value, setValue, isControlled]
}
