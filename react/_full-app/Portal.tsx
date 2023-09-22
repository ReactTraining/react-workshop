import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
}

export function Portal({ children }: Props) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    setNode(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? createPortal(children, node) : null
}
