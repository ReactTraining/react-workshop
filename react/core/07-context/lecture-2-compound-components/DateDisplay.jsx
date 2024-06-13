import { createContext, use } from 'react'
import dayjs from 'dayjs'

const Context = createContext()

export function DateDisplay({ children, date = '' }) {
  const context = {
    date: dayjs(date || new Date()),
  }
  return <Context value={context}>{children}</Context>
}

export function DateYear({ format = 'YYYY' }) {
  const { date } = use(Context)
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  const { date } = use(Context)
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  const { date } = use(Context)
  return <>{date.format(format)}</>
}
