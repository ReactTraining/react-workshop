import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Menu, MenuButton, MenuList, MenuPopover, MenuItems, MenuItem } from './Menu'
import './styles.scss'

function App() {
  const logged = true
  return (
    <div>
      <Menu>
        <MenuButton className="button">Menu</MenuButton>
        <MenuPopover>
          <MenuItems data-menu-list="">
            <MenuItem onSelect={() => console.log('one')}>Item One</MenuItem>
            <MenuItem onSelect={() => console.log('two')}>Item Two</MenuItem>
            {logged && <AuthenticatedMenuItems />}
          </MenuItems>
        </MenuPopover>
      </Menu>
    </div>
  )
}

function AuthenticatedMenuItems() {
  return (
    <Fragment>
      <MenuItem onSelect={() => console.log('three')}>Item Three</MenuItem>
      <MenuItem onSelect={() => console.log('four')}>Item Four</MenuItem>
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
