import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, MenuButton, MenuList, MenuPopover, MenuItems, MenuItem } from './Menu.final'
import './styles.scss'

function App() {
  return (
    <div>
      <Menu>
        <MenuButton className="button">Menu</MenuButton>
        <MenuPopover>
          <MenuItems data-menu-list="">
            <MenuItem onSelect={() => console.log('one')}>Item One</MenuItem>
            <MenuItem onSelect={() => console.log('two')}>Item Two</MenuItem>
          </MenuItems>
        </MenuPopover>
      </Menu>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
