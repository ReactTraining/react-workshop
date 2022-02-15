import ReactDOM from 'react-dom'
import './styles.scss'

// 1. Demonstrate useMemo Hook
import { App } from './useMemo'

// 2. Demonstrate shouldComponentUpdate vs PureComponent vs React.memo
//    Then how useCallback helps
// import { App } from './reactMemo'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
