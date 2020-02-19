import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'
import { TaskOne, TaskTwo, TaskThree } from './Tasks'
import Heading from 'YesterTech/Heading'
import './styles.scss'

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Task One</Tab>
        <Tab>Task Two</Tab>
        <Tab>Task Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="spacing">
          <Heading size={3}>Primary Tasks</Heading>
          <TaskOne />
        </TabPanel>
        <TabPanel className="spacing">
          <Heading size={3}>Bonus Tasks</Heading>
          <TaskTwo />
        </TabPanel>
        <TabPanel className="spacing">
          <Heading size={3}>Bonus Tasks</Heading>
          <TaskThree />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
