import * as ReactDOM from 'react-dom/client'
import { MainLayout } from './MainLayout'
import { BrowseUsers } from './BrowseUsers'

function App() {
  return (
    <MainLayout>
      <BrowseUsers />
    </MainLayout>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
