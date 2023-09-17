type LessonBodyProps = {
  children: React.ReactNode
}

export function LessonBody({ children }: LessonBodyProps) {
  return (
    <div className="min-h-screen pt-16 pr-32 pl-32 bg-gradient-to-tr from-blue-100 to-pink-50">
      {children}
    </div>
  )
}

type LessonCardProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function LessonCard({ children, className, ...props }: LessonCardProps) {
  return (
    <div
      {...props}
      className={`m-auto max-w-[1200px] min-h-[50vh] space-y-6 p-6 bg-white rounded-2xl shadow-lg ${className}`}
    >
      {children}
    </div>
  )
}
