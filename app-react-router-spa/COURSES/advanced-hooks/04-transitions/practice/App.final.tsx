import { useState, useTransition } from 'react'

export function App() {
  const [nextTabIndex, setNextTabIndex] = useState(0)
  const [tabIndex, setTabIndex] = useState(0)

  const [pending, start] = useTransition()

  function onChange(index: number) {
    setNextTabIndex(index) // high
    start(() => {
      setTabIndex(index) // low
    })
  }

  return (
    <div>
      <div className="bg-slate-100 rounded-md p-2 mb-5">
        <Tab onClick={() => onChange(0)} selected={nextTabIndex === 0}>
          Tab
        </Tab>
        <Tab onClick={() => onChange(1)} selected={nextTabIndex === 1}>
          Slow Tab
        </Tab>
        <Tab onClick={() => onChange(2)} selected={nextTabIndex === 2}>
          Tab
        </Tab>
      </div>
      <div>
        {!pending ? (
          <>
            {tabIndex === 0 && <div>First Tab</div>}
            {tabIndex === 1 && <SlowContent />}
            {tabIndex === 2 && <div>Last Tab</div>}
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

function Tab({ children, selected, onClick }: any) {
  return (
    <button
      className={
        selected ? 'py-3 px-5 bg-slate-300 hover:bg-amber-400' : 'py-3 px-5 hover:bg-lime-600'
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function SlowContent() {
  return (
    <div>
      {[...Array(10).keys()].map((n) => (
        <Item key={n} />
      ))}
    </div>
  )
}

function Item() {
  // Artificially slow
  const startTime = performance.now()
  while (performance.now() - startTime < 300) {}
  return <div className="text-red-500">Slow content</div>
}
