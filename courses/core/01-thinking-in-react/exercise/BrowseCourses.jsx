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
              <Heading as="h2" size={3}>
                {course.name}
              </Heading>
              <div className="flex-split flex-gap-large">
                <div>Lessons: {course.lessons}</div>
                <div>
                  <button className="button" onClick={(e) => removeCourse(course.id)}>
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

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

/**
 * Need Help?
 */

// How to map an array in JSX:

// <div>
//   {courses.map(fn)}
// </div>

// You can do a function expression two ways:

// <div>
//   {courses.map(function(courses, index) {
//
//   })}
// </div>

// <div>
//   {courses.map((courses, index) => {
//
//   })}
// </div>

// We don't need the index, and we want to return JSX
// so lets write return with parenthesis to get ready

// <div>
//   {courses.map((courses) => {
//     return (
//
//     )
//   })}
// </div>

// Now you can put the JSX you want to create on every
// iteration in the parens. See BrowseCourses.final.jsx
