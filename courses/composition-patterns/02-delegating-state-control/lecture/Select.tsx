/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

const SelectContext = React.createContext<SelectContextValue>({} as any)

function SelectBase({
  selectedOption,
  setSelectedOption,
  children,
  className,
  ...domProps
}: SelectBaseProps) {
  let [isOpen, setIsOpen] = React.useState(false)
  let listRef = React.useRef<HTMLDivElement>()
  let buttonRef = React.useRef<HTMLButtonElement>()

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

const SelectButton = React.forwardRef<HTMLButtonElement, SelectButtonBaseProps>(
  ({ className, onClick, children, ...domProps }, ref) => {
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
  }
)

const SelectList = React.forwardRef<HTMLDivElement, SelectListBaseProps>(
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

const SelectOptionBase = React.forwardRef<HTMLDivElement, SelectOptionBaseProps>(
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

export function Select({ selectedOption, setSelectedOption, children }: SelectProps) {
  return (
    <SelectBase selectedOption={selectedOption} setSelectedOption={setSelectedOption}>
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

function composeClassNames(...classNames: string[]): string {
  return classNames.filter(Boolean).join(' ')
}

function composeEventHandlers<
  EventType extends React.SyntheticEvent<any>,
  Handler extends React.EventHandler<EventType>
>(userEventHandler: Handler, internalEventHandler: Handler) {
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
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}

interface SelectOwnProps {
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  children: React.ReactNode
}

type SelectBaseProps = Omit<React.ComponentPropsWithoutRef<'div'>, keyof SelectOwnProps> &
  SelectOwnProps

type SelectProps = SelectOwnProps

type SelectButtonBaseProps = React.ComponentPropsWithRef<'button'>

type SelectListBaseProps = React.ComponentPropsWithRef<'div'>

interface SelectOptionOwnProps {
  value: string
}

type SelectOptionBaseProps = Omit<React.ComponentPropsWithRef<'div'>, keyof SelectOptionOwnProps> &
  SelectOptionOwnProps

type SelectOptionProps = SelectOptionOwnProps
