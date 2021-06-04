import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
// https://www.w3.org/TR/wai-aria-practices-1.2/examples/accordion/accordion.html

const AccordionContext = React.createContext<AccordionContextValue>({} as any)
const AccordionItemContext = React.createContext<AccordionItemContextValue>({} as any)
const ItemRegistrationContext = React.createContext<ItemRegistrationContextValue>({} as any)
const ItemsContext = React.createContext<ItemsContextValue>({} as any)

interface ItemData {
  value: string
  buttonElement: HTMLButtonElement
}

interface ItemsContextValue {
  items: ItemData[]
}

interface ItemRegistrationContextValue {
  addItem(item: ItemData): void
  removeItem(value: string): void
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    { children, value: externalValue, defaultValue, onValueChange, className, ...domProps },
    forwardedRef
  ) => {
    let [items, setItems] = React.useState<ItemData[]>([])

    const addItem = React.useCallback(function addItem(item: ItemData) {
      setItems((items) =>
        items.map((i) => i.value).includes(item.value) ? items : [...items, item]
      )
    }, [])

    const removeItem = React.useCallback(function removeItem(value: string) {
      setItems((items) => items.filter((item) => item.value !== value))
    }, [])

    let [buttonFocused, setButtonFocused] = React.useState(false)
    let id = makeId('accordion', useId())

    let isControlled = React.useRef(externalValue !== undefined).current
    let isCurrentlyControlled = externalValue !== undefined
    let controlledStateChanged = isControlled !== isCurrentlyControlled

    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        if (controlledStateChanged) {
          console.warn(
            `Heyyyyy that custom Accordion is changing between controlled and uncontrolled states. You shouldn't do that or you're going to have a bad time! Check the value prop and make sure you're doing it right.`
          )
        }
      }
    }, [controlledStateChanged])

    let [internalValue, setInternalValue] = React.useState(defaultValue)
    let value = isControlled ? externalValue : internalValue

    function setValue(newValue: string | null) {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      if (onValueChange && newValue !== value) {
        onValueChange(newValue)
      }
    }

    let context: AccordionContextValue = {
      value,
      accordionId: id,
      setValue,
      buttonFocused,
      setButtonFocused,
    }

    return (
      <div
        id={id}
        className={composeClassNames(className, 'accordion')}
        ref={forwardedRef}
        data-button-focused={buttonFocused ? '' : undefined}
        {...domProps}
      >
        <ItemRegistrationContext.Provider value={{ addItem, removeItem }}>
          <ItemsContext.Provider value={{ items }}>
            <AccordionContext.Provider value={context}>{children}</AccordionContext.Provider>
          </ItemsContext.Provider>
        </ItemRegistrationContext.Provider>
      </div>
    )
  }
)

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, className, onChange, ...domProps }, forwardedRef) => {
    let { accordionId, value: accordionValue, setValue: setAccordionValue } = React.useContext(
      AccordionContext
    )
    let { addItem, removeItem } = React.useContext(ItemRegistrationContext)
    let buttonId = makeId(accordionId, 'button', useId())
    let buttonRef = React.useRef<HTMLButtonElement>()

    let context: AccordionItemContextValue = {
      value,
      buttonId,
      buttonRef,
    }

    React.useLayoutEffect(() => {
      let buttonElement = buttonRef.current
      addItem({ value, buttonElement })
      return () => {
        removeItem(value)
      }
    }, [addItem, removeItem, value])

    return (
      <Disclosure
        className={composeClassNames(className, 'accordion__item')}
        ref={forwardedRef}
        open={accordionValue === value}
        onChange={(isOpen) => {
          setAccordionValue(value)
        }}
        {...domProps}
      >
        <AccordionItemContext.Provider value={context}>{children}</AccordionItemContext.Provider>
      </Disclosure>
    )
  }
)

export const AccordionButton = React.forwardRef<HTMLButtonElement, AccordionButtonProps>(
  ({ children, className, onBlur, onFocus, onKeyDown, ...domProps }, forwardedRef) => {
    let { buttonId, buttonRef, value } = React.useContext(AccordionItemContext)
    let { setButtonFocused, accordionId, setValue: setAccordionValue } = React.useContext(
      AccordionContext
    )
    let { items } = React.useContext(ItemsContext)

    return (
      <DisclosureButton
        className={composeClassNames(className, 'accordion__button')}
        ref={useComposedRefs(buttonRef, forwardedRef)}
        id={buttonId}
        data-accordion-button=""
        onFocus={composeEventHandlers(onFocus, () => setButtonFocused(true))}
        onBlur={composeEventHandlers(onBlur, (event) => {
          let rootElement = document.querySelector<HTMLDivElement>('#' + accordionId)
          let elementGainingFocus = event.relatedTarget as HTMLElement
          if (!isButtonInCurrentAccordion(elementGainingFocus, rootElement)) {
            setButtonFocused(false)
          }
        })}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          switch (event.key) {
            case 'ArrowDown': {
              // prevent scroll
              event.preventDefault()

              // select the next item
              let nextOption = findNextItem(items, value)
              if (nextOption) {
                nextOption.buttonElement.focus()
              }
              break
            }
            case 'ArrowUp': {
              // prevent scroll
              event.preventDefault()

              // select the previous item
              let previousOption = findPreviousItem(items, value)
              if (previousOption) {
                previousOption.buttonElement.focus()
              }
              break
            }
            case 'Home': {
              // prevent scroll
              event.preventDefault()

              // select the first item
              let firstOption = items[0]
              if (firstOption) {
                firstOption.buttonElement.focus()
              }
              break
            }
            case 'End': {
              // prevent scroll
              event.preventDefault()

              // select the last item
              let lastOption = items[items.length - 1]
              if (lastOption) {
                lastOption.buttonElement.focus()
              }
              break
            }
            case 'Enter': {
              setAccordionValue(value)
              break
            }
            default:
              break
          }
        })}
        {...domProps}
      >
        {children}
      </DisclosureButton>
    )
  }
)

export const AccordionPanel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ children, className, ...domProps }, forwardedRef) => {
    let { buttonId } = React.useContext(AccordionItemContext)
    return (
      <DisclosurePanel
        className={composeClassNames(className, 'accordion__panel')}
        ref={forwardedRef}
        id={buttonId}
        aria-labelledby={buttonId}
        role="region"
        {...domProps}
      >
        {children}
      </DisclosurePanel>
    )
  }
)

interface AccordionContextValue {
  accordionId: string
  setValue(newValue: string): void
  value: string | null
  buttonFocused: boolean
  setButtonFocused: React.Dispatch<React.SetStateAction<boolean>>
}

interface AccordionItemContextValue {
  buttonId: string
  value: string
  buttonRef: React.RefObject<HTMLButtonElement>
}

interface AccordionOwnProps {
  children: React.ReactNode
  value?: string | null
  defaultValue?: string | null
  onValueChange?(newValue: string | null): void
}

interface AccordionItemOwnProps {
  value: string
}

interface AccordionButtonOwnProps {}

interface AccordionButtonOwnProps {}

interface AccordionPanelOwnProps {}

type AccordionProps = Omit<React.ComponentPropsWithRef<'div'>, keyof AccordionOwnProps> &
  AccordionOwnProps

type AccordionItemProps = Omit<DisclosureProps, keyof AccordionItemOwnProps> & AccordionItemOwnProps

type AccordionButtonProps = Omit<DisclosureButtonProps, keyof AccordionButtonOwnProps> &
  AccordionButtonOwnProps

type AccordionPanelProps = Omit<DisclosurePanelProps, keyof AccordionPanelOwnProps> &
  AccordionPanelOwnProps

///////////////////////////////////////////////////////////////////////////////

const DisclosureContext = React.createContext<DisclosureContextValue>({} as any)

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(
  (
    { children, open: externalOpen, defaultOpen = false, onChange, className, ...domProps },
    forwardedRef
  ) => {
    let id = makeId('disclosure', useId())
    let panelId = makeId('panel', id)

    let isControlled = React.useRef(externalOpen !== undefined).current
    let isCurrentlyControlled = externalOpen !== undefined
    let controlledStateChanged = isControlled !== isCurrentlyControlled

    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        if (controlledStateChanged) {
          console.warn(
            `Heyyyyy that custom disclosure is changing between controlled and uncontrolled states. You shouldn't do that or you're going to have a bad time! Check the value prop and make sure you're doing it right.`
          )
        }
      }
    }, [controlledStateChanged])

    let [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    let open = isControlled ? externalOpen! : internalOpen

    function setOpen(newState: boolean) {
      if (!isControlled) {
        setInternalOpen(newState)
      }
      if (onChange && newState !== open) {
        onChange(newState)
      }
    }

    function toggle() {
      setOpen(!open)
    }

    let context: DisclosureContextValue = {
      disclosureId: id,
      panelId,
      toggle,
      open,
    }

    return (
      <div className={composeClassNames(className, 'disclosure')} ref={forwardedRef} {...domProps}>
        <DisclosureContext.Provider value={context}>{children}</DisclosureContext.Provider>
      </div>
    )
  }
)

export const DisclosureButton = React.forwardRef<HTMLButtonElement, any>(
  ({ children, className, onClick, ...domProps }, forwardedRef) => {
    let { open, panelId, toggle } = React.useContext(DisclosureContext)
    return (
      <button
        type="button"
        aria-controls={panelId}
        aria-expanded={open}
        data-state={open ? 'open' : 'collapsed'}
        className={composeClassNames(className, 'disclosure__button')}
        onClick={composeEventHandlers(onClick, toggle)}
        ref={forwardedRef}
        {...domProps}
      >
        <span className="disclosure__button-icon" aria-hidden>
          {open ? <FaAngleDown /> : <FaAngleRight />}
        </span>
        {children}
      </button>
    )
  }
)

export const DisclosurePanel = React.forwardRef<HTMLDivElement, DisclosurePanelProps>(
  function DisclosurePanel({ children, className, id, ...domProps }, forwardedRef) {
    let { panelId, open } = React.useContext(DisclosureContext)
    return (
      <div
        hidden={!open}
        data-state={open ? 'open' : 'collapsed'}
        id={panelId}
        ref={forwardedRef}
        className={composeClassNames(className, 'disclosure__panel')}
        {...domProps}
      >
        {children}
      </div>
    )
  }
)

interface DisclosureContextValue {
  disclosureId: string
  toggle(): void
  open: boolean
  panelId: string
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
      if (typeof ref === 'function') {
        // @ts-ignore
        ref(node)
      } else if (ref != null) {
        // @ts-ignore
        ref.current = node
      }
    }
  }
}

function makeId(...parts: string[]) {
  return parts.map(slugify).join('-')
}

let instance = -1
function useId() {
  let value = React.useMemo(() => String(++instance), [])
  return value
}

interface DisclosureOwnProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onChange?(newState: boolean): void
}

type DisclosureProps = Omit<React.ComponentPropsWithRef<'div'>, keyof DisclosureOwnProps> &
  DisclosureOwnProps

interface DisclosureButtonOwnProps {
  children: React.ReactNode
}

type DisclosureButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  keyof DisclosureButtonOwnProps
> &
  DisclosureButtonOwnProps

interface DisclosurePanelOwnProps {
  children: React.ReactNode
}

type DisclosurePanelProps = Omit<
  React.ComponentPropsWithRef<'div'>,
  keyof DisclosurePanelOwnProps
> &
  DisclosurePanelOwnProps

function isButtonInCurrentAccordion(elementToCheck: Element, accordionElement: HTMLElement) {
  return (
    accordionElement.contains(elementToCheck) &&
    elementToCheck &&
    elementToCheck instanceof HTMLButtonElement &&
    elementToCheck.hasAttribute('data-accordion-button')
  )
}

function findPreviousItem(items: ItemData[], selectedItem: string): ItemData {
  let currentOptionIndex = items.map((i) => i.value).indexOf(selectedItem)

  if (currentOptionIndex > -1 && currentOptionIndex > 0) {
    return items[currentOptionIndex - 1]
  } else {
    return items[items.length - 1]
  }
}

function findNextItem(items: ItemData[], selectedItem: string): ItemData {
  let currentOptionIndex = items.map((i) => i.value).indexOf(selectedItem)

  if (currentOptionIndex > -1 && currentOptionIndex < items.length - 1) {
    return items[currentOptionIndex + 1]
  } else {
    return items[0]
  }
}
