import React from 'react'
import ReactDOM from 'react-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

function App() {
  return (
    <Disclosure>
      <DisclosureButton>Click Me</DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

/*
✅ It works, but needs some improvements...
❌ ARIA: Can only use one per page (with a static ID).
❌ Can't add extra DOM container among the button or panel.
❌ The way we refactored using `React.cloneElement` means that we could experience
   prop collisions with the owner. And mixed with how we're forwarding props means
   that we're sending props to DOM elements we didn't mean to. Can be fixed but it's
   a little bit of a pain.
❌ We don't know the state of `Disclosure` in the owner. So we can't change an icon
   depending on open or not.
❌ What if the owner wants to pass their on `onClick` to `DisclosureButton`? How do
   we mix that with our onClick and how do we honor their `event.preventDefault` if
   they do one?
*/

ReactDOM.render(<App />, document.getElementById('root'))
