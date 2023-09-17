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
      <h1 className="heading size-1">Courses</h1>
      <div className="spacing">
        {courses.map((course) => {
          return (
            <div key={course.id} className="course-listing flex-split">
              <h2 className="heading size-3">{course.name}</h2>
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
