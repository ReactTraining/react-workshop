import { useRef, useState, useLayoutEffect } from 'react'
import { Portal } from 'spa/PortalX'
import { position } from 'spa/utils/position'
import styles from './Popover.module.css'

type Props = {
  children: React.ReactNode
  targetRef: React.MutableRefObject<HTMLElement>
  onClose?: () => void
}

export function Popover({ children, onClose, targetRef }: Props) {
  const popoverRef = useRef<HTMLDivElement>()
  const [inlineStyles, setInlineStyles] = useState({})

  useLayoutEffect(() => {
    const listener = (event: any) => {
      onClose && onClose()
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function initPopoverRef(el: HTMLDivElement) {
    if (el && !popoverRef.current) {
      popoverRef.current = el
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()

      setInlineStyles(position(targetRect, popoverRect))
    }
  }

  return (
    <Portal>
      <div
        ref={initPopoverRef}
        className={styles.component}
        onClick={(e) => e.stopPropagation()}
        style={inlineStyles}
      >
        {children}
      </div>
    </Portal>
  )
}
