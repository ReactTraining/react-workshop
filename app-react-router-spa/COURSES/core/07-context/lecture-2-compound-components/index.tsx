import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
// import { DateDisplay, DateYear, DateMonth, DateDay } from './DateDisplay.final'
import { DateDisplay, DateYear, DateMonth, DateDay } from './DateDisplay'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <Tabs>
          <TabList>
            <div>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </div>
            <Tab>Three</Tab>
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

        <div className="text-lg space-x-2 p-2 bg-slate-100 w-fit m-auto rounded-sm -skew-x-6">
          <DateDisplay date="">
            <span className="bg-slate-300 py-1 px-2 rounded">
              <DateMonth format="MMMM" />
            </span>
            <span className="bg-slate-300 py-1 px-2 rounded">
              <DateDay />
            </span>
            <span className="bg-slate-300 py-1 px-2 rounded">
              <DateYear />
            </span>
          </DateDisplay>
        </div>

        <p>
          A "compound component" is a pattern where one visual component is actually made with
          several React components being composed together. The React components are closely related
          and were specifically designed to be used together. The value of each being their own
          component means we can "compose" them in different orders and with our own choice of
          wrapping markup in the UI. In this case, Date, DateMonth, DateDay, and DateYear make a
          compound component.
        </p>
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
