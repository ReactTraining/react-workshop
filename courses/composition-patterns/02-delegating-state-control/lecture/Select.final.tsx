/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

const SelectContext = React.createContext<SelectContextValue>({} as any)
const OptionsContext = React.createContext<OptionsContextValue>({} as any)

interface OptionsContextValue {
  addOption(value: string): void
  removeOption(value: string): void
}

function SelectBase({
  value: externalValue,
  defaultValue,
  onValueChange,
  children,
  className,
  ...domProps
}: SelectBaseProps) {
  let [options, setOptions] = React.useState<string[]>([])

  const addOption = React.useCallback(function addOption(string: string) {
    setOptions((opts) => (opts.includes(string) ? opts : [...opts, string]))
  }, [])

  const removeOption = React.useCallback(function removeOption(string: string) {
    setOptions((opts) => opts.filter((opt) => opt !== string))
  }, [])

  let [value, setValue, isControlled] = useControlledState(
    externalValue,
    defaultValue,
    onValueChange
  )
  let [isOpen, setIsOpen] = React.useState(false)
  let listRef = React.useRef<HTMLDivElement>(null)
  let buttonRef = React.useRef<HTMLButtonElement>(null)

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

const SelectButton = React.forwardRef<HTMLButtonElement, SelectButtonBaseProps>(
  ({ className, onClick, children, ...domProps }, ref) => {
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
  }
)

const SelectList = React.forwardRef<HTMLDivElement, SelectListBaseProps>(
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

const SelectOptionBase = React.forwardRef<HTMLDivElement, SelectOptionBaseProps>(
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

export function Select({ value, onValueChange, defaultValue, children }: SelectProps) {
  return (
    <SelectBase value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectButton />
      <SelectList>{children}</SelectList>
    </SelectBase>
  )
}

export function SelectOption({ value }: SelectOptionProps) {
  return <SelectOptionBase value={value} />
}

function slugify(string: string): string {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}

function composeClassNames(...classNames: (string | null | undefined)[]): string {
  return classNames.filter(Boolean).join(' ')
}

function composeEventHandlers<
  EventType extends React.SyntheticEvent<any>,
  Handler extends React.EventHandler<EventType>
>(userEventHandler: Handler | undefined | null, internalEventHandler: Handler) {
  return function (event: EventType): void {
    userEventHandler?.(event)
    if (!event.defaultPrevented) {
      internalEventHandler?.(event)
    }
  }
}

function useComposedRefs<Ref extends React.Ref<Value>, Value = any>(...refs: Ref[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}

function composeRefs<Ref extends React.Ref<Value>, Value = any>(...refs: Ref[]) {
  // accept multiple refs and return a singular callback ref
  return function composedCallbackRef(node: Value) {
    for (let ref of refs) {
      if (isCallbackRef(ref)) {
        ref(node)
      } else if (ref != null) {
        ;(ref as any).current = node
      }
    }
  }
}

function isCallbackRef<T = any>(v: React.Ref<T>): v is React.RefCallback<T> {
  return typeof v === 'function'
}

interface SelectContextValue {
  listRef: React.RefObject<HTMLDivElement>
  buttonRef: React.RefObject<HTMLButtonElement>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  onValueChange(newValue: string): void
}

interface SelectOwnProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?(newValue: string): void
}

type SelectBaseProps = Omit<React.ComponentPropsWithoutRef<'div'>, keyof SelectOwnProps> &
  SelectOwnProps & {
    defaultValue?: string
  }

type SelectProps = SelectOwnProps

type SelectButtonBaseProps = React.ComponentPropsWithRef<'button'>

type SelectListBaseProps = React.ComponentPropsWithRef<'div'>

interface SelectOptionOwnProps {
  value: string
}

type SelectOptionBaseProps = Omit<React.ComponentPropsWithRef<'div'>, keyof SelectOptionOwnProps> &
  SelectOptionOwnProps

type SelectOptionProps = SelectOptionOwnProps

function useControlledState<T>(
  externalValue: T | undefined,
  defaultValue: T | undefined,
  onValueChange: ((T: T) => void) | undefined
): [T, (T: T) => void, boolean] {
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
  let value = isControlled ? externalValue! : internalValue!

  function setValue(newValue: T) {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    if (onValueChange && newValue !== value) {
      onValueChange(newValue)
    }
  }
  return [value, setValue, isControlled]
}
