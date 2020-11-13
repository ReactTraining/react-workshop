import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

/**
 * Which one do you want to teach?
 */

// 1. Demonstrate useMemo Hook
// import App from './useMemo'

// 2. Demonstrate shouldComponentUpdate vs PureComponent vs React.memo
//    Then how useCallback helps
// import App from './reactMemo'

// 3. Demonstrate Code Splitting
import App from './code-splitting'

ReactDOM.render(<App />, document.getElementById('root'))
