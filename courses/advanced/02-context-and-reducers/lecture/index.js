import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, MenuButton, MenuList, MenuItem } from './Menu'
import './styles.scss'

function App() {
  return (
    <Menu>
      <MenuButton className="button">Menu</MenuButton>
      <MenuList>
        <MenuItem onSelect={() => console.log('one')}>Item One</MenuItem>
        <MenuItem onSelect={() => console.log('two')}>Item Two</MenuItem>
      </MenuList>
    </Menu>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
