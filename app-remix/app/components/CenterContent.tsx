type CenterContentProps = {
  className?: string
  children: React.ReactNode
}

export function CenterContent({ children, className }: CenterContentProps) {
  return (
    <div className={className}>
      <div className="ml-auto mr-auto max-w-[1200px] pl-3 pr-3">{children}</div>
    </div>
  )
}
