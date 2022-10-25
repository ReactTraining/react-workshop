import * as ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { App } from 'course-platform/App'
import 'course-platform/styles/all.scss'

// React 18
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
