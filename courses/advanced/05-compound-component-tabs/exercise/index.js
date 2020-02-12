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

/*
✅ It renders

// Round One
❌ Get some state working with context. Use `activeIndex`
❌ Each `Tab` will be unaware if it's index unless you do a `React.Children.map` on the
   parent `TabList` (similar to what the instructor encountered with `Accordion`).
❌ Add ARIA role for: tablist, tab, and tabpanel appropriately.
❌ Add aria-selected="true" (or false) for each tab.

// Round Two
❌ Implement an `onChange` with the `Tabs` component.
❌ Implement an onClick with the `Tab` component. Be sure to wrap with `wrapEvent`.

// Route Three
❌ Implement an `index` prop to `Tabs` which can be used to control the tabs from the owner.
*/

ReactDOM.render(<App />, document.getElementById('root'))
