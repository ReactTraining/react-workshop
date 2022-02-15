import * as React from 'react'
import { createPortal } from 'react-dom'

// Checkout the real Reach Portal
// https://github.com/reach/reach-ui/blob/develop/packages/portal/src/index.tsx

// This component will create a DOM element called <reach-portal /> and append
// it to the DOM, then we will mount the `children` to that <reach-portal />.
// Why such a strange custom element? Why not. You can use a div but there's
// a chance you'll collide with someone's styling or other code that might
// be looking for root-level divs.

export const Portal = React.forwardRef(({ children, type = 'reach-portal' }, forwardedRef) => {
  const mountNode = React.useRef(null)
  const portalNode = React.useRef(null)
  let [, forceUpdate] = React.useState()

  React.useLayoutEffect(() => {
    const ownerDocument = mountNode.current.ownerDocument
    portalNode.current = ownerDocument.createElement(type)
    ownerDocument.body.appendChild(portalNode.current)
    forceUpdate({})
    return () => {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current)
      }
    }
  }, [type])

  return portalNode.current ? createPortal(children, portalNode.current) : <div ref={mountNode} />
})

Portal.displayName = 'Portal'
