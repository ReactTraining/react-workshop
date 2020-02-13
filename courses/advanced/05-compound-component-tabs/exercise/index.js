import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Accordion.final'
import './styles.scss'

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab></Tab>
        <Tab></Tab>
      </TabList>
      <TabPanels>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
