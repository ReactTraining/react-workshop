import { useState } from 'react'
import { Heading } from 'course-platform/Heading'
import { Icon } from 'course-platform/Icon'
import { AddCourse } from './AddCourse.final'

export function BrowseCourses() {
  const [minLessons, setMinLessons] = useState(0)
  const [courses, setCourses] = useState([
    { id: 1, name: 'React', lessons: 3 },
    { id: 2, name: 'JavaScript', lessons: 2 },
    { id: 3, name: 'CSS', lessons: 4 },
  ])

  function onSubmit(course: any) {
    const id = courses.length + 1
    const newCourse = { ...course, id }
    setCourses(courses.concat(newCourse))
  }

  return (
    <div className="card spacing">
      <AddCourse onSubmit={onSubmit} />
      <hr />
      <div className="flex-split">
        <Heading size={1}>Courses</Heading>
        <div className="text-center spacing">
          <div className="text-small">At least {minLessons} lessons</div>
          <Counter count={minLessons} setCount={setMinLessons} />
        </div>
      </div>
      <div className="spacing">
        {courses
          .filter((course) => course.lessons >= minLessons)
          .map((course) => {
            return <CourseListing key={course.id} name={course.name} lessons={course.lessons} />
          })}
      </div>
    </div>
  )
}

/**
 * Counter
 */

type CounterProps = {
  count: number
  setCount(count: number): void
  min?: number
}

function Counter({ count, setCount, min = 0 }: CounterProps) {
  function subtract() {
    if (count > min) {
      setCount(count - 1)
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <div className="inline-flex flex-gap items-center">
      <div>
        <button onClick={subtract} className="button button-small">
          <Icon name="minus" />
        </button>
      </div>
      <input
        type="text"
        value={count}
        onChange={(event) => setCount(parseInt(event.target.value))}
      />
      <div>
        <button onClick={add} className="button button-small">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}

/**
 * CourseListing
 */

type CourseListingProps = {
  name: string
  lessons: number
}

function CourseListing({ name, lessons }: CourseListingProps) {
  return (
    <div className="course-listing flex-split">
      <Heading as="h2" size={3}>
        {name}
      </Heading>
      <div>Lessons: {lessons}</div>
    </div>
  )
}
