import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from 'course-platform/utils/api'
// import { Heading } from 'course-platform/Heading'
// import { DataGrid, Row, Col } from 'course-platform/DataGrid'
// import { CreateLessonDialog } from 'course-platform/CreateLessonDialog'
// import { Loading } from 'course-platform/Loading'
// import { NoResults } from 'course-platform/NoResults'
// import { PreviousNextCourse } from 'course-platform/PreviousNextCourse'

// Setting state on unmounted components
// https://github.com/facebook/react/pull/22114

function BrowseCourseLessons() {
  const courseSlug = useParams().courseSlug // v6
  return <BrowseCourseLessonsUI courseSlug={courseSlug} />
}

export { BrowseCourseLessons }

/// ignore above

////// FetchCourseLessons.js

function withFetchCourseLessons(Comp) {
  return class FetchCourseLessons extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        course: null,
      }
      this.getCourse = this.getCourse.bind(this)
    }

    componentDidMount() {
      this.getCourse()
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.courseSlug !== this.props.courseSlug) {
        this.getCourse()
      }
    }

    getCourse() {
      api.courses.getCourse(this.props.courseSlug).then((course) => {
        this.setState({ course })
      })
    }

    render() {
      return <Comp {...this.props} course={this.state.course} />
    }
  }
}

//// BrowseCourseLessonsUI.js

class BrowseCourseLessonsUI extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.courseSlug}</h1>
        <header>
          <Link to="/admin/courses/react">React</Link> |
          <Link to="/admin/courses/javascript">JavaScript</Link>
        </header>
        {this.props.course &&
          this.props.course.lessons.map((lesson) => {
            return <div key={lesson.id}>{lesson.name}</div>
          })}
      </div>
    )
  }
}

// HoC
export default withFetchCourseLessons(BrowseCourseLessonsUI)
