import { Icon } from 'spa/Icon'

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
        <button onClick={subtract} className="button button-small" data-testid="subtract">
          <Icon name="minus" />
        </button>
      </div>
      <input
        className="form-field w-15 text-center"
        type="text"
        value={count}
        onChange={(event) => setCount(parseInt(event.target.value))}
        data-testid="input"
      />
      <div>
        <button onClick={add} className="button button-small" data-testid="add">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}
