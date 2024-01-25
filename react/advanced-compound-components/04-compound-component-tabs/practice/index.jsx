import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs.final'
import { TaskOne, TaskTwo, TaskThree } from './Tasks'
import './styles.css'

function App() {
  return (
    <LessonBody>
      <Tabs>
        <TabList>
          <Tab>Primary Task</Tab>
          <Tab>Bonus Tasks 1</Tab>
          <Tab>Bonus Tasks 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="spacing">
            <h3>Primary Tasks</h3>
            <TaskOne />
          </TabPanel>
          <TabPanel className="spacing">
            <h3>Bonus Tasks 1</h3>
            <TaskTwo />
          </TabPanel>
          <TabPanel className="spacing">
            <h3>Bonus Tasks 2</h3>
            <TaskThree />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
