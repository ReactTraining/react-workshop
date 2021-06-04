import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

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
        tabIndex={-1}
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
