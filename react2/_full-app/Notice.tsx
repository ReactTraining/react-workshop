import classnames from 'classnames'

type Props = {
  type?: 'default' | 'error' | 'success'
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Notice({ children, className, type = 'default', ...props }: Props) {
  return (
    <div
      {...props}
      className={classnames(
        className,
        'py-1 px-3 rounded',
        { 'bg-slate-100 text-slate-500 border border-slate-300': type === 'default' },
        { 'bg-red-500 text-white': type === 'error' },
        { 'bg-green-500 text-white': type === 'success' }
      )}
    >
      {children}
    </div>
  )
}
