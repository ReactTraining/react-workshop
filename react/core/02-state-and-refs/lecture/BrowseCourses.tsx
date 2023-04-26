import { useState } from 'react'
import { Heading } from '~/Heading'
import { Counter } from './Counter'
import { AddCourse } from './AddCourse'

export function BrowseCourses() {
  const minLessons = 0

  const courses = [
    { id: 1, name: 'React', lessons: 5 },
    { id: 2, name: 'JavaScript', lessons: 4 },
    { id: 3, name: 'CSS', lessons: 3 },
  ]

  return (
    <div className="card spacing">
      <AddCourse
        onSubmit={(values) => {
          console.log(values)
        }}
      />
      <hr />
      <div className="flex-split">
        <Heading size={1}>Courses</Heading>
        <div className="text-center spacing">
          <div className="text-small">At least {minLessons} lessons</div>
          <Counter />
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
