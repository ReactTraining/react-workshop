import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

/**
 * Which one do you want to teach?
 */

// Demonstrate useMemo Hook
// import App from './useMemo'

// Demonstrate shouldComponentUpdate vs PureComponent vs React.memo
// Then how useCallback helps
import App from './reactMemo'

ReactDOM.render(<App />, document.getElementById('root'))
