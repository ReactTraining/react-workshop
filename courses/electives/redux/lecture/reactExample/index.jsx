import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'
import PrimaryLayout from './PrimaryLayout'

function App() {
  return (
    <ReduxProvider store={store}>
      <PrimaryLayout />
    </ReduxProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
