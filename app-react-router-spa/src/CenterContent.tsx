type CenterContentProps = {
  children: React.ReactNode
  className?: string
  maxWidth?: number
}

export function CenterContent({ children, className, maxWidth = 1200 }: CenterContentProps) {
  return (
    <div className={className}>
      <div className="ml-auto mr-auto pl-3 pr-3" style={{ maxWidth: `${maxWidth}px` }}>
        {children}
      </div>
    </div>
  )
}
