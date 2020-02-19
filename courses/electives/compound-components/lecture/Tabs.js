import React, { useState, useContext } from 'react'

export function Tabs({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div data-reach-tabs>
      <div data-reach-tab-list>
        {data.map((tab, index) => {
          const selected = index === selectedIndex
          return (
            <button
              data-reach-tab=""
              key={index}
              className={selected ? 'active' : ''}
              onClick={() => setSelectedIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div data-reach-tab-panels="">
        <div data-reach-tab-panel="">{data[selectedIndex].content}</div>
      </div>
    </div>
  )
}
