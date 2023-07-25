type CenterContentProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Lesson({ children, ...props }: CenterContentProps) {
  return (
    <div className="min-h-screen pt-24 bg-lesson pr-10 pl-10">
      <div className="m-auto max-w-[1200px] min-h-[50vh] p-6 bg-white rounded-2xl shadow-lg">
        {children}
      </div>
    </div>
  )
}
