import React from 'react'
import * as ReactDOM from 'react-dom/client'
// import { LessonBody, LessonCard } from '~/Lesson'
// import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function App() {
  return (
    <Tabs>
      <TabList>
        <div>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </div>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
