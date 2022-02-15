import { useMedia } from 'course-platform/hooks/useMedia'

export const AppSidebar: React.FC = ({ children }) => {
  const isWide = useMedia('(min-width: 1200px)')
  return isWide ? <aside className="card w-130">{children}</aside> : null
}
