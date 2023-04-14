import { useId } from 'react'
import { Icon } from './Icon'

type Props = {
  children: React.ReactNode
  filter: string
}

export function FilterByCheckbox({ children, filter }: Props) {
  const on = true
  const id = useId()
  return (
    <div className="cursor-pointer">
      <input id={id} type="checkbox" className="hidden" onChange={() => {}} />
      <span className="text-brandColor mr-2">
        {on ? <Icon name="checkboxOn" /> : <Icon name="checkboxOn" />}
      </span>
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
    </div>
  )
}
