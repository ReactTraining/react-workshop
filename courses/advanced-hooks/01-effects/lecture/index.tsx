import ReactDOM from 'react-dom'

// 1. The closure of useEffect "captures" state (basic example)
import { App } from './closure-basics'

// 2. Another capturing example (Stopwatch)
// import { App } from './stopwatch'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
