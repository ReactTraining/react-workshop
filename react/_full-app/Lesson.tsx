import classNames from 'classnames'

type LessonBodyProps = {
  children: React.ReactNode
}

export function LessonBody({ children }: LessonBodyProps) {
  return <div className="lesson-body flex-1 min-h-screen py-16 px-32">{children}</div>
}

type LessonCardProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function LessonCard({ children, className, ...props }: LessonCardProps) {
  return (
    <div
      {...props}
      className={classNames(
        'ml-auto mr-auto max-w-[1200px] min-h-[250px] space-y-6 p-6 bg-white rounded-2xl shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
