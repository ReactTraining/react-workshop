import React, { useState, useContext } from 'react'

export function Tabs({ data, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div data-reach-tabs>
      <div data-reach-tab-list>
        {data.map((tab, index) => {
          const selected = index === selectedIndex
          return (
            <button
              key={index}
              role="tab"
              {...props}
              aria-selected={selected}
              data-reach-tab=""
              data-selected={selected ? '' : undefined}
              onClick={() => setSelectedIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div data-reach-tab-panels="">
        <div data-reach-tab-panel="">
          {data[selectedIndex].content}
        </div>
      </div>
    </div>
  )
}
