import classnames from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: Props) {
  return <div className={classnames('bg-white border p-3', className)}>{children}</div>
}
