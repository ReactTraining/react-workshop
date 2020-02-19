import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'
import './styles.scss'

function App() {
  return (
    <>
      <input type="text" />
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>One</TabPanel>
          <TabPanel>
            <input type="text" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <input type="text" />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
