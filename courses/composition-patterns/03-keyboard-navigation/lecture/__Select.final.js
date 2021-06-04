/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

const SelectContext = React.createContext({})
const OptionsRegistrationContext = React.createContext({})
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

  const addOption = React.useCallback(function addOption(value) {
    setOptions((opts) => (opts.includes(value) ? opts : [...opts, value]))
  }, [])

  const removeOption = React.useCallback(function removeOption(value) {
    setOptions((opts) => opts.filter((opt) => opt !== value))
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
    if (rendered.current) {
      if (isOpen) {
        window.requestAnimationFrame(() => {
          listRef.current?.focus()
        })
      } else {
        window.requestAnimationFrame(() => {
          buttonRef.current?.focus()
        })
      }
    }

    rendered.current = true
  }, [isOpen])

  return (
    <div className={composeClassNames(className, 'select')} {...domProps}>
      <OptionsRegistrationContext.Provider value={{ addOption, removeOption }}>
        <OptionsContext.Provider value={{ options }}>
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
      </OptionsRegistrationContext.Provider>
    </div>
  )
}

const SelectButton = React.forwardRef(
  ({ className, onClick, onKeyDown, children, ...domProps }, ref) => {
    let { buttonRef, listRef, isOpen, setIsOpen, onValueChange, value } = React.useContext(
      SelectContext
    )
    let { options } = React.useContext(OptionsContext)

    return (
      <button
        ref={useComposedRefs(buttonRef, ref)}
        onClick={composeEventHandlers(onClick, () => setIsOpen(true))}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          switch (event.key) {
            case 'ArrowDown': {
              // select the next item, expand the list
              let nextOption = findNextOption(options, value)
              if (nextOption) {
                onValueChange(nextOption)
              }
              setIsOpen(true)
              break
            }
            case 'ArrowUp': {
              // select the previous item, expand the list
              let previousOption = findPreviousOption(options, value)
              if (previousOption) {
                onValueChange(previousOption)
              }
              setIsOpen(true)
              break
            }
            case 'Enter': {
              // expand the list
              setIsOpen(true)
              break
            }
            default: {
              // not a char key if key isn't a single character!
              if (event.key.length !== 1) {
                break
              }

              let optionToSelect = findOptionFromCharKey(options, value, event.key)
              if (optionToSelect) {
                onValueChange(optionToSelect)
              }
              break
            }
          }
        })}
        className={composeClassNames(className, 'select-button')}
        aria-haspopup="listbox"
        id="select-button"
        {...domProps}
      >
        {value}
      </button>
    )
  }
)

const SelectList = React.forwardRef(
  ({ children, className, onBlur, onKeyDown, ...domProps }, ref) => {
    let { isOpen, listRef, setIsOpen, value, onValueChange } = React.useContext(SelectContext)
    let { options } = React.useContext(OptionsContext)
    return (
      <div
        id="select-list"
        className={composeClassNames(className, 'select-list')}
        role="listbox"
        tabIndex={-1}
        hidden={!isOpen}
        // This is the ID of the selected option
        aria-activedescendant={value ? getOptionId(value) : undefined}
        ref={useComposedRefs(listRef, ref)}
        onBlur={composeEventHandlers(onBlur, () => {
          setIsOpen(false)
        })}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          switch (event.key) {
            case 'ArrowDown': {
              // select the next item
              let nextOption = findNextOption(options, value)
              if (nextOption) {
                onValueChange(nextOption)
              }
              break
            }
            case 'ArrowUp': {
              // select the previous item
              let previousOption = findPreviousOption(options, value)
              if (previousOption) {
                onValueChange(previousOption)
              }
              break
            }
            case 'Home': {
              // select the first item
              let firstOption = options[0]
              if (firstOption) {
                onValueChange(firstOption)
              }
              break
            }
            case 'End': {
              // select the last item
              let lastOption = options[options.length - 1]
              if (lastOption) {
                onValueChange(lastOption)
              }
              break
            }
            case 'Enter': {
              setIsOpen(false)
              break
            }

            case 'Escape': {
              setIsOpen(false)
              break
            }
            default: {
              // Character keys:
              //  - Type a character: focus moves to the next item with a name
              //    that starts with the typed character
              //  - Type multiple characters in rapid succession: focus moves to
              //    the next item with a name that starts with the string of
              //    characters typed

              // not a char key if key isn't a single character!
              if (event.key.length !== 1) {
                break
              }

              let optionToSelect = findOptionFromCharKey(options, value, event.key)
              if (optionToSelect) {
                onValueChange(optionToSelect)
              }
              break
            }
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
    let { addOption, removeOption } = React.useContext(OptionsRegistrationContext)

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
        id={getOptionId(value)}
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

function getOptionId(value) {
  return `option-${slugify(value)}`
}

// This is fine for the workshop but we probably don't want singleton state like
// this hanging out outside the component scope!
let keysSoFar = ''

function findOptionFromCharKey(options, selectedOption, key) {
  let selectedOptionId = getOptionId(selectedOption)
  let searchIndex = 0
  if (!keysSoFar) {
    for (let i = 0; i < options.length; i++) {
      if (getOptionId(options[i]) === selectedOptionId) {
        searchIndex = i
      }
    }
  }
  keysSoFar += key
  clearKeysSoFarAfterDelay()

  let nextMatch = findOptionMatchInRange(options, searchIndex + 1, options.length)
  if (!nextMatch) {
    nextMatch = findOptionMatchInRange(options, 0, searchIndex)
  }
  return nextMatch
}

function findPreviousOption(options, selectedOption) {
  let currentOptionIndex = options.indexOf(selectedOption)
  let previousOption = null

  if (currentOptionIndex > -1 && currentOptionIndex > 0) {
    previousOption = options[currentOptionIndex - 1]
  }

  return previousOption
}

function findNextOption(options, selectedOption) {
  let currentOptionIndex = options.indexOf(selectedOption)
  let nextOption = null

  if (currentOptionIndex > -1 && currentOptionIndex < options.length - 1) {
    nextOption = options[currentOptionIndex + 1]
  }

  return nextOption
}

function findOptionMatchInRange(options, startIndex, endIndex) {
  // Find the first item starting with the keysSoFar substring, searching in the
  // specified range of items
  for (let n = startIndex; n < endIndex; n++) {
    let value = options[n]
    if (value && value.toUpperCase().indexOf(keysSoFar.toUpperCase()) === 0) {
      return options[n]
    }
  }
  return null
}

let keyClear
function clearKeysSoFarAfterDelay() {
  if (keyClear) {
    window.clearTimeout(keyClear)
    keyClear = null
  }
  keyClear = window.setTimeout(() => {
    keysSoFar = ''
    keyClear = null
  }, 700)
}
