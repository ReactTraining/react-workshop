import React from 'react'
import { wrapEvent } from '../../utils'
import { useId } from '../../useId'

// You know what to do 😉

export const Tabs = ({ children }) => {
  return <div data-tabs="">{children}</div>
}

export const TabList = ({ children }) => {
  return <div data-tab-list="">{children}</div>
}

export const Tab = ({ children, isDisabled, ...props }) => {
  return <div data-reach-tab="">{children}</div>
}

export const TabPanels = ({ children }) => {
  const activeIndex = 0
  return <div data-reach-tab-panels="">{children[activeIndex]}</div>
}

export const TabPanel = ({ children }) => {
  return <div data-reach-tab-panel="">{children}</div>
}
