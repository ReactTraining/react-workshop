import { createContext, useContext } from 'react'
import dayjs from 'dayjs'

const DateContext = createContext()

export function DateDisplay({ children, date = '' }) {
  const context = {
    date: dayjs(date || new Date()),
  }

  // This is a valid way to pass a the above children prop to the children prop
  // of another component:
  return <DateContext.Provider value={context} children={children} />
}

export function DateYear({ format = 'YYYY' }) {
  const { date } = useContext(DateContext)
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  const { date } = useContext(DateContext)
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  const { date } = useContext(DateContext)
  return <>{date.format(format)}</>
}
