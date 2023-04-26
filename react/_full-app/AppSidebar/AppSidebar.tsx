import { useMedia } from '~/hooks/useMedia'

type Props = {
  children: React.ReactNode
}

export function AppSidebar({ children }: Props) {
  const isWide = useMedia('(min-width: 1200px)')
  return isWide ? <aside className="card w-130">{children}</aside> : null
}
