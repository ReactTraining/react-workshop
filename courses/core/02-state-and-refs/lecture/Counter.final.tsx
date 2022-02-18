import { Icon } from 'course-platform/Icon'

type CounterProps = {
  count: number
  setCount(count: number): void
  min?: number
}

export function Counter({ count, setCount, min = 0 }: CounterProps) {
  function subtract() {
    if (count > min) {
      setCount(count - 1)
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <div className="inline-flex flex-gap items-center">
      <div>
        <button onClick={subtract} className="button button-small">
          <Icon name="minus" />
        </button>
      </div>
      <input
        type="text"
        value={count}
        onChange={(event) => setCount(parseInt(event.target.value))}
      />
      <div>
        <button onClick={add} className="button button-small">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}
