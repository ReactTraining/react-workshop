import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = { children: React.ReactNode }
function Portal({ children }: PortalProps) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const portalNode = document.createElement('div')
    document.body.appendChild(portalNode)
    setPortalNode(portalNode)
    return () => {
      document.body.removeChild(portalNode)
    }
  }, [])

  return portalNode ? createPortal(children, portalNode) : null
}

type PopoverProps = {
  children: React.ReactNode
  anchorId: string
} & React.HTMLAttributes<HTMLDivElement>

function Popover({ children, anchorId, ...props }: PopoverProps) {
  return (
    <Portal>
      <div
        {...props}
        className="my-popover bg-black text-white rounded py-1 px-3"
        popover="auto"
        anchor={anchorId}
      >
        {children}
      </div>
    </Portal>
  )
}

function Define({ children }: { children: React.ReactNode }) {
  const popoverId = useId()
  const buttonId = useId()
  return (
    <>
      <button className="button-define text-sky-600" popoverTarget={popoverId} id={buttonId}>
        {children}
      </button>
      <Popover id={popoverId} anchorId={buttonId}>
        Hooks are a way to compose behavior into components
      </Popover>
    </>
  )
}

export function App() {
  return (
    <div>
      <p>
        Modern React is filled with <Define>Hooks</Define>. They work with function-components and
        they give us an ability to use state and other React features similarly to class-based
        components.
      </p>
    </div>
  )
}
