import React, {
  useState,
  useContext,
  forwardRef,
  useRef
} from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

// You know what to do 😉

export const Tabs = ({ children, ...props }) => {
  return (
    <div {...props} data-tabs="">
      {children}
    </div>
  )
}

export const TabList = ({ children, ...props }) => {
  // This is where we need to map over children to discover the Tab's
  // index. Aside from the main TabsContext you'll create, you could have
  // a special TabContext just for passing the index of each tab down.
  return (
    <div {...props} data-tab-list="">
      {children}
    </div>
  )
}

export const Tab = ({ children, ...props }) => {
  return (
    <div {...props} data-tab="">
      {children}
    </div>
  )
}

export const TabPanels = ({ children, ...props }) => {
  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  return (
    <div {...props} data-tab-panel="">
      {children}
    </div>
  )
}
