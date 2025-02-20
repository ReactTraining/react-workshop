import { createContext, use } from 'react'
import dayjs from 'dayjs'

export function DateDisplay({ children, date = '' }) {
  // const context = {
  //   date: dayjs(date || new Date()),
  // }
  return children
}

export function DateYear({ format = 'YYYY' }) {
  const date = dayjs()
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  const date = dayjs()
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  const date = dayjs()
  return <>{date.format(format)}</>
}
