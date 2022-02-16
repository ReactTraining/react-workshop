import { useState } from 'react'
import { Heading } from 'course-platform/Heading'
import { Icon } from 'course-platform/Icon'
// import { AddCourse } from './AddCourse'

export function BrowseCourses() {
  const minLessons = 0

  const courses = [
    { id: 1, name: 'React', lessons: 5 },
    { id: 2, name: 'JavaScript', lessons: 4 },
    { id: 3, name: 'CSS', lessons: 3 },
  ]

  return (
    <div className="card spacing">
      [Add Course Form]
      <hr />
      <div className="flex-split">
        <Heading size={1}>Courses</Heading>
        <div className="counter text-center spacing">
          <div className="text-small">At least {minLessons} lessons</div>
          <div className="inline-flex flex-gap">
            <div>
              <button className="button button-small">
                <Icon name="minus" />
              </button>
            </div>
            <div className="input">{minLessons}</div>
            <div>
              <button className="button button-small">
                <Icon name="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing">
        {courses.map((course) => {
          return (
            <div key={course.id} className="course-listing flex-split">
              <Heading as="h2" size={3}>
                {course.name}
              </Heading>
              <div>Lessons: {course.lessons}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
