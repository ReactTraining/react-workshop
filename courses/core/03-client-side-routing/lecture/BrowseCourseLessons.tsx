import { useParams, useLocation } from 'react-router-dom'
import { Heading } from 'course-platform/Heading'

export function BrowseCourseLessons() {
  const courseSlug = useParams().courseSlug!
  const { state } = useLocation()

  // If the user navigates directly to this page, it will
  // not have any location state
  const courseName = (state && state.name) || '[Unknown Course Name]'

  return (
    <div className="card">
      <Heading>{courseName} Lessons</Heading>
      <div>Slug: {courseSlug}</div>
    </div>
  )
}
