import { useParams } from 'react-router-dom'
import MarkdownIt from 'markdown-it'
import { Heading } from 'spa/Heading'
import { useCoursesContext } from 'spa/CoursesContext'
import styles from './WebsiteCourseLesson.module.scss'

const md = new MarkdownIt()

export function WebsiteCourseLesson() {
  const courseSlug = useParams().courseSlug!
  const lessonSlug = useParams().lessonSlug!

  // Data
  const { getCourse, getLesson, isLoading } = useCoursesContext()
  const course = getCourse(courseSlug)
  const lesson = getLesson(courseSlug, lessonSlug)

  return (
    <div className="spacing">
      <header>
        <Heading size={3}>
          Course: <span className="text-blue">{course?.name}</span>
        </Heading>
        <Heading>{lesson?.name}</Heading>
      </header>
      <hr />
      {lesson && (
        <div
          className={`${styles.contentPreview} spacing-large`}
          dangerouslySetInnerHTML={{ __html: md.render(lesson.content) }}
        />
      )}
    </div>
  )
}
