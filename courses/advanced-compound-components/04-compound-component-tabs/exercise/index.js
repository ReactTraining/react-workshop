// import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'
import { TaskOne, TaskTwo, TaskThree } from './Tasks'
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
          <h3>Primary Tasks</h3>
          <TaskOne />
        </TabPanel>
        <TabPanel className="spacing">
          <h3>Bonus Tasks</h3>
          <TaskTwo />
        </TabPanel>
        <TabPanel className="spacing">
          <h3>Bonus Tasks</h3>
          <TaskThree />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
