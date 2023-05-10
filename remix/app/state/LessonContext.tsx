import { useContext, createContext } from 'react'

type ContextType = {
  selectedLesson: string
}

type Props = {
  children: React.ReactNode
  selectedLesson: string
}

const LessonContext = createContext<ContextType>(null!)

export function LessonProvider({ children, selectedLesson }: Props) {
  const context: ContextType = {
    selectedLesson,
  }
  return <LessonContext.Provider value={context} children={children} />
}

export function useLessonContext() {
  const context = useContext(LessonContext)
  if (!context) throw Error("You're not using a LessonProvider")
  return context || {}
}

export function SelectedLesson() {
  const { selectedLesson } = useLessonContext()
  return <>{selectedLesson}</>
}
