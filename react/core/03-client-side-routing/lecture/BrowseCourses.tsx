import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heading } from 'spa/Heading'
import { DataGrid, Row, Col } from 'spa/DataGrid'

export function BrowseCourses() {
  const courses = [
    { id: 1, name: 'React', slug: 'react', lessons: 3 },
    { id: 2, name: 'JavaScript', slug: 'javascript', lessons: 2 },
    { id: 3, name: 'CSS', slug: 'css', lessons: 4 },
  ]

  return (
    <div className="card spacing">
      <Heading>Courses</Heading>
      <DataGrid>
        {courses?.map((course) => {
          return (
            <Row key={course.id}>
              <Col flex>
                <Link to={`${course.slug}`} state={{ name: 'JavaScript' }} className="text-large">
                  <b>{course.name}</b>
                </Link>
              </Col>
              <Col width={150}>Lessons: {course.lessons}</Col>
            </Row>
          )
        })}
      </DataGrid>
    </div>
  )
}
