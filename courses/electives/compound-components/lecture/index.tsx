import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

export function Tabs({ data, ...props }: React.ComponentProps<'button'> & DataTabsProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <div className="tabs">
      <div className="tab-list">
        {data.map((tab, index) => {
          const selected = index === selectedIndex
          return (
            <button
              key={index}
              role="tab"
              {...props}
              aria-selected={selected}
              className="tab"
              data-selected={selected ? '' : undefined}
              onClick={() => setSelectedIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="tab-panels">
        <div className="tab-panel">{data[selectedIndex].content}</div>
      </div>
    </div>
  )
}

function App() {
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />,
    },
    {
      label: 'Signup',
      content: <SignupForm />,
    },
  ]

  return <Tabs data={tabData} />
}

ReactDOM.render(<App />, document.getElementById('root'))

interface TabsContextValue {
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

interface TabContextValue {
  index: number
}

interface PanelContextValue {
  index: number
}

interface TabsProps extends React.ComponentProps<'div'> {}
interface TabListProps extends React.ComponentProps<'div'> {}
interface TabProps extends React.ComponentProps<'button'> {
  disabled?: boolean
}
interface TabPanelsProps extends React.ComponentProps<'div'> {}
interface DataTabsProps {
  data: { label: string; content: React.ReactNode }[]
}
