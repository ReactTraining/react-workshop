import { createContext, useContext } from 'react'
import dayjs from 'dayjs'

const Context = createContext()

export function DateDisplay({ children, date = '' }) {
  const context = {
    date: dayjs(date || new Date()),
  }
  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function DateYear({ format = 'YYYY' }) {
  const { date } = useContext(Context)
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  const { date } = useContext(Context)
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  const { date } = useContext(Context)
  return <>{date.format(format)}</>
}
