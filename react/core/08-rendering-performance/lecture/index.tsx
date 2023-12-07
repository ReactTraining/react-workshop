import * as ReactDOM from 'react-dom/client'
import { MainLayout } from './helpers/MainLayout'
import { App } from './Transitions'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MainLayout>
    <App />
  </MainLayout>
)
