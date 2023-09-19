import { Avatar } from '~/Avatar'
import { BrowseVacations } from '~/BrowseVacations'
import { Icon } from '~/Icon'
import { Logo } from '~/Logo'

export function App() {
  return (
    <div className="lesson-body min-h-screen p-6 flex">
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-lg overflow-hidden">
        <header className="border-b p-6 bg-white flex justify-between items-center">
          <div>
            <Logo />
          </div>
          <nav className="flex items-center gap-3">
            <span>Welcome Back</span>
            <Avatar src="" />
          </nav>
        </header>
        <div className="border-b px-6 bg-white">
          <nav className="text-sm">
            <a href="/" className="inline-block text-textColor py-2 pr-4 border-r">
              <span>Categories</span>
              <Icon name="chevronDown" />
            </a>
            <a href="/" className="inline-block text-textColor py-2 px-4">
              <span>Sandy Beaches</span>
            </a>
            <a href="/" className="inline-block text-textColor py-2 px-4">
              <span>Open Spaces</span>
            </a>
            <a href="/" className="inline-block text-textColor py-2 px-4">
              <span>Our Favorites</span>
            </a>
          </nav>
        </div>
        <div>
          <BrowseVacations />
        </div>
      </div>
    </div>
  )
}
