import { Icon } from '~/Icon'

type Props = {
  count?: number
  setCount(count: number): void
}

export function Counter({ count = 0, setCount }: Props) {
  return (
    <>
      <button className="button" onClick={() => setCount(count - 1)}>
        <Icon name="minus" />
      </button>
      <span className="align-middle text-3xl px-6">0</span>
      <button className="button" onClick={() => setCount(count + 1)}>
        <Icon name="plus" />
      </button>
    </>
  )
}
