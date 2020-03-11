import React from 'react'
import ReactDOM from 'react-dom'
import { Disclosure } from './Disclosure'
import './styles.scss'

function App() {
  return <Disclosure summary="Click Me">Panel Contents</Disclosure>
}

/*
✅ It works, but needs some improvements...
❌ Be able to rearrange the panel above the button or side-by-side.
❌ Be able to choose the icon and its position (to the left or right of text). Or what if we want no icon?
❌ Be able to pass the underlying button own props (like className, id, etc) unless we do strange API things like `buttonProps={}`
❌ Convert class-names to data-attributes
❌ Be able to forward refs to the panel or button.
❌ Add ARIA (aria-expanded and aria-controls on button).
*/

ReactDOM.render(<App />, document.getElementById('root'))
