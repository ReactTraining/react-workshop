import { useId } from 'react'
import { Icon } from './Icon'
import { Link, useSearchParams } from 'react-router'

/****************************************
 Filter Link
 *****************************************/

type Props = {
  children: React.ReactNode
  url: string
  filter: string
  value: string
}

export function FilterLink({ children, url, filter, value }: Props) {
  const [search] = useSearchParams()

  // The current URL
  const urlValue = search.get(filter)?.toLowerCase().split(',')
  const on = Array.isArray(urlValue) && urlValue.includes(value.toLowerCase())

  // The next URL
  const nextSearch = new URLSearchParams(search.toString())
  const valuesFiltered = Array.isArray(urlValue) ? urlValue.filter((v) => v && v !== value) : []

  if (on) {
    nextSearch.set(filter, valuesFiltered.join(','))
  } else {
    nextSearch.set(filter, valuesFiltered.concat(value).join(','))
  }

  return <FilterLinkUI on={on} to={`${url}?${nextSearch.toString()}`} children={children} />
}

/****************************************
  Filter Link All
*****************************************/

export function FilterLinkAll({ children, url, filter }: Omit<Props, 'value'>) {
  const [search] = useSearchParams()
  const on = [null, ''].includes(search.get(filter))
  const nextSearch = new URLSearchParams(search.toString())
  nextSearch.delete(filter)

  return <FilterLinkUI on={on} to={`${url}?${nextSearch.toString()}`} children={children} />
}

/****************************************
 UI for both the Filter Links Above
 *****************************************/

type FilterLinkUIProps = {
  children: React.ReactNode
  on: boolean
  to: string
}

function FilterLinkUI({ children, on, to }: FilterLinkUIProps) {
  const id = useId()
  return (
    <Link to={to} className="block">
      <input id={id} type="checkbox" className="hidden" />
      <span className="text-brandColor mr-2">
        {on ? <Icon name="checkboxOn" /> : <Icon name="checkboxOff" />}
      </span>
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
    </Link>
  )
}

// // The current URL
// const urlValue = search.get(filter)?.toLowerCase()
// const on = urlValue === value.toLowerCase()

// // The next URL
// const nextSearch = new URLSearchParams(search.toString())
// nextSearch.set(filter, value)
