import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from '~/utils/api'
import { Icon } from '~/components/Icon'

type Props = {
  courseId?: number
}

export function PreviousNextCourse({ courseId }: Props) {
  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery('courses', () => api.courses.getAll(), {
    staleTime: 1000 * 30,
  })

  if (isLoading) return null

  // Previous and Next
  const i = (courses?.map((c) => c.id) || []).indexOf(courseId || -1)
  const count = courses?.length || 0
  const previousCourse = courses && i > 0 ? courses[i - 1] : undefined
  const nextCourse = courses && i < count ? courses[i + 1] : undefined

  return (
    <div className="horizontal-spacing">
      {previousCourse ? (
        <Link
          aria-label="Previous Lesson"
          to={`/admin/courses/${previousCourse.slug}`}
          title="Previous Course"
        >
          <Icon size={2} name="circleArrowLeft" color="var(--blue2)" />
        </Link>
      ) : (
        <Icon size={2} name="circleArrowLeft" />
      )}
      {nextCourse ? (
        <Link aria-label="Next Lesson" to={`/admin/courses/${nextCourse.slug}`} title="Next Course">
          <Icon size={2} name="circleArrowRight" color="var(--blue2)" />
        </Link>
      ) : (
        <Icon size={2} name="circleArrowRight" />
      )}
    </div>
  )
}
