import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs.final'
import './styles.scss'

function App() {
  return (
    <div className="spacing">
      <button className="button block">Start Focus Here</button>
      <Tabs>
        <TabList>
          <Tab>Events and Focus</Tab>
          <Tab>Login Form</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            Using your keyboard only, you should be able to move the focus in and out of the Tabs
            component and also change tabs in a way that the user would anticipate.
          </TabPanel>
          <TabPanel className="spacing">
            <div className="form-field">
              <input type="text" placeholder="Email" />
            </div>
            <div className="form-field">
              <input type="text" placeholder="Password" />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <hr />
      <button className="button block">End Focus Here</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
