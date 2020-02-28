import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuPopover,
  MenuItems,
  MenuItem
} from './Menu'
import './styles.scss'

function App() {
  const logged = true

  return (
    <Menu>
      <MenuButton className="button">Menu</MenuButton>
      <MenuPopover>
        <MenuItems data-menu-list="">
          <MenuItem onSelect={() => console.log('one')}>
            Item One
          </MenuItem>
          <MenuItem onSelect={() => console.log('two')}>
            Item Two
          </MenuItem>
          {logged && <AuthenticatedMenuItems />}
        </MenuItems>
      </MenuPopover>
    </Menu>
  )
}

// Since we're using `useDescendants`, we can now make abstractions like this:
function AuthenticatedMenuItems() {
  return (
    <Fragment>
      <MenuItem onSelect={() => console.log('three')}>
        Item Three
      </MenuItem>
      <MenuItem onSelect={() => console.log('four')}>
        Item Four
      </MenuItem>
    </Fragment>
  )
}

/*
✅ It uses a popup that knows how to avoid collisions with the viewport. It also
   makes use of dynamic portals.
✅ We can finally add extra DOM containers. The problem before was all those cases
   of doing React.Children.map to manage indexes. But now we are using `useDescendants`
   so each MenuItem will "register" itself and announce it's index to `Menu`.
❌ Add Keyboard Events
*/

ReactDOM.render(<App />, document.getElementById('root'))
