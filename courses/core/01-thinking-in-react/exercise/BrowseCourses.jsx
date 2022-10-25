// import { Heading } from './Heading'

const addOne = (n1) => n1 + 1

export function BrowseCourses() {
  const courses = [
    { id: 1, name: 'React', lessons: 5 },
    { id: 2, name: 'JavaScript', lessons: 4 },
    { id: 3, name: 'CSS', lessons: 3 },
  ]

  return (
    <div className="card spacing">
      <h1 className="heading size-1">Courses</h1>
      <div className="spacing">
        {courses.map((course) => {
          return (
            <CourseListing
              key={course.id}
              id={course.id}
              name={course.name}
              lessons={course.lessons}
              className="foo"
            />
          )
        })}
      </div>
    </div>
  )
}

function CourseListing({ id, name, lessons, className }) {
  function removeCourse(courseId) {
    console.log('Remove', courseId)
  }

  return (
    <div className={`course-listing flex-split ${className}`}>
      <h2 className="heading size-3">{name}</h2>
      <div className="flex-split flex-gap-large">
        <div>Lessons: {lessons}</div>
        <div>
          <Button id="special-button" onClick={() => removeCourse(id)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

function Button({ onClick, children, ...props }) {
  return (
    <button {...props} className="button" onClick={onClick}>
      {children}
    </button>
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
