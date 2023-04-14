type MainLayoutProps = {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      layout
      {children}
    </div>
  )
}
