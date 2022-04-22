import * as ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App
    onSubmit={(values) => {
      console.log(values)
    }}
  />
)
