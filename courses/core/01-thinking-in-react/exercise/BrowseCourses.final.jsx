import { Heading } from './Heading'

export function BrowseCourses() {
  const courses = [
    { id: 1, name: 'React', lessons: 5 },
    { id: 2, name: 'JavaScript', lessons: 4 },
    { id: 3, name: 'CSS', lessons: 3 },
  ]

  function removeCourse(courseId) {
    console.log('Remove', courseId)
  }

  return (
    <div className="card spacing">
      <Heading>Courses</Heading>
      <div className="spacing">
        {courses.map((course) => {
          return (
            <div key={course.id} className="course-listing flex-split">
              <Heading as="h2" size={2}>
                {course.name}
              </Heading>
              <div className="flex-split flex-gap-large">
                <div>Lessons: {course.lessons}</div>
                <div>
                  <button className="button" onClick={() => removeCourse(course.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
