import { createContext, use, useContext } from 'react'
import dayjs from 'dayjs'

const DateDisplayContext = createContext()

export function DateDisplay({ children, date = '' }) {
  const context = {
    date: dayjs(date || new Date()),
  }
  return <DateDisplayContext.Provider value={context}>{children}</DateDisplayContext.Provider>
}

export function DateYear({ format = 'YYYY' }) {
  const { date } = useContext(DateDisplayContext)
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  const { date } = useContext(DateDisplayContext)
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  const { date } = useContext(DateDisplayContext)
  return <>{date.format(format)}</>
}
