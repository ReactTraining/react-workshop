import { createContext, use } from 'react'
import dayjs from 'dayjs'

// 1. Create a Context

export function DateDisplay({ children, date = '' }) {
  // const context = {
  //   date: dayjs(date || new Date()),
  // }

  // 2. Use the context variable to create a provider around the children
  return children
}

export function DateYear({ format = 'YYYY' }) {
  // 3. (for this and all components below):
  //    consume the context with use

  const date = dayjs()
  return <>{date.format(format)}</>
}

export function DateMonth({ format = 'MM' }) {
  // 3. Consume context
  const date = dayjs()
  return <>{date.format(format)}</>
}

export function DateDay({ format = 'DD' }) {
  // 3. Consume context
  const date = dayjs()
  return <>{date.format(format)}</>
}
