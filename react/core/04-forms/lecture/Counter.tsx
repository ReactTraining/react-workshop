import { Icon } from '~/Icon'

type Props = {
  count: number
  setCount(count: number): void
  minCount?: number
}

export function Counter({ count, setCount, minCount = 0 }: Props) {
  function subtract() {
    if (count > minCount) {
      setCount(count - 1)
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <div className="flex gap-2">
      <button onClick={subtract} className="button flex-1">
        <Icon name="minus" />
      </button>
      <input
        className="form-field align-middle px-6 w-24 text-center"
        value={count}
        onChange={(event) => {
          setCount(parseInt(event.target.value) + 1)
        }}
      />
      <button onClick={add} className="button flex-1">
        <Icon name="plus" />
      </button>
    </div>
  )
}
