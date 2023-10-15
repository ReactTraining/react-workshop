import * as ReactDOM from 'react-dom/client'

// 1. The closure of useEffect "captures" state (basic example)
import { App } from './closure-basics'

// 2. Another capturing example (Stopwatch)
// import { App } from './stopwatch'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
