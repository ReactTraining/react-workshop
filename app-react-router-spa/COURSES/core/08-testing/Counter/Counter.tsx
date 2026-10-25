import { Icon } from '~/Icon'

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
        <button
          type="button"
          onClick={subtract}
          className="button button-small"
          aria-label="Subtract"
          disabled={count <= min}
        >
          <Icon name="minus" />
        </button>
      </div>
      <input
        className="form-field w-15 text-center"
        type="text"
        aria-label="Count"
        value={count}
        onChange={(event) => {
          const next = parseInt(event.target.value, 10)
          if (!Number.isNaN(next)) setCount(next)
        }}
      />
      <div>
        <button type="button" onClick={add} className="button button-small" aria-label="Add">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}
