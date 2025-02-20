import * as ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'
import { LessonBody, LessonCard } from '~/Lesson'
import PrimaryLayout from './PrimaryLayout'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <ReduxProvider store={store}>
          <PrimaryLayout />
        </ReduxProvider>
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
