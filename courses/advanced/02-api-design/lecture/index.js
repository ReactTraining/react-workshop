import React from 'react'
import ReactDOM from 'react-dom'
import { Disclosure } from './Disclosure'
import './styles.scss'

function App() {
  return <Disclosure summary="Click Me">Panel Contents</Disclosure>
}

/*
✅ It works, but needs some improvements...
❌ No ARIA.
❌ We can't rearrange to put the panel above the button or side-by-side.
❌ We can't add extra DOM container among the button and/or panel (like a `div` around the button).
❌ We can't pass the underlying button own props (like className, id, etc) unless we do strange API things like `buttonProps={}`
❌ We can't forward refs to the panel or button. Even if we did do `forwardRef`, how would we know what element it goes to?
❌ We don't get to choose the icon or its position (to the left or right of text). Or what if we want no icon?
*/

ReactDOM.render(<App />, document.getElementById('root'))
