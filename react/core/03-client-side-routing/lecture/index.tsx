import * as ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { App } from '~/App'
import '~/styles/all.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
