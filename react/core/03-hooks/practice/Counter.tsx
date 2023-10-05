import { Icon } from '~/Icon'

type Props = {
  count: number
  setCount(count: number): void
}

// This file doesn't need changes for the practice

export function Counter({ count, setCount }: Props) {
  const subtract = () => setCount(count - 1)
  const add = () => setCount(count + 1)

  return (
    <div className="inline-flex">
      <button className="button flex-1" onClick={subtract}>
        <Icon name="minus" />
      </button>
      <span className="align-middle text-3xl px-6">{count}</span>
      <button className="button flex-1" onClick={add}>
        <Icon name="plus" />
      </button>
    </div>
  )
}
