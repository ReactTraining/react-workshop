import React, { useRef, useState, useId, createContext, useContext } from 'react'
import { wrapEvent } from '../../utils'

// You know what to do 😉

// Hint: You probably need three contexts
const TabsContext = createContext() // For passing general top-level info down
const TabListContext = createContext() // For passing index down from TabList to Tab
const TabPanelsContext = createContext() // Same but index down from TabPanels to TabPanel

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
    <button {...props} data-tab="" role="tab">
      {children}
    </button>
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
