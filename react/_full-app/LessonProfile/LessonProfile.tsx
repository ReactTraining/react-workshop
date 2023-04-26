import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useParams, Link } from 'react-router-dom'
import MarkdownIt from 'markdown-it'
import { api } from 'spa/utils/api'
import { useDelayedCallback } from 'spa/hooks/useDelayedCallback'
import { useCoursesContext } from 'spa/CoursesContext'
import { Heading } from 'spa/Heading'
import * as localStorage from 'spa/utils/localStorage'
import styles from './LessonProfile.module.scss'

const md = new MarkdownIt()

export function LessonProfile() {
  const courseSlug = useParams().courseSlug!
  const lessonSlug = useParams().lessonSlug!

  const [contentChanged, setContentChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [showPublishedNotice, setShowPublishedNotice] = useState(false)
  const delaySetPublishedNotice = useDelayedCallback<boolean>(setShowPublishedNotice)

  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(false)

  // Data
  const { getCourse, getLesson, isLoading } = useCoursesContext()
  const course = getCourse(courseSlug)
  const lesson = getLesson(courseSlug, lessonSlug)

  // Determine if the loaded lesson is in draft content mode
  useEffect(() => {
    if (lesson) {
      if (lesson.draftContent) {
        setIsDraft(true)
        setContent(lesson.draftContent || '')
      } else {
        setContent(lesson.content || '')
      }
    }
  }, [lesson])

  // Save Lesson Content
  useEffect(() => {
    if (contentChanged && lesson && isDraft) {
      setIsSaving(true)
      const id = setTimeout(() => {
        const draft = true
        api.courses.saveLessonContent(lesson.id, content, draft).then(() => {
          setIsDraft(true)
          setIsSaving(false)
        })
      }, 1000)
      return () => clearTimeout(id)
    }
  }, [content, contentChanged, lesson, isDraft])

  // Recent Lessons
  useEffect(() => {
    if (lesson) {
      localStorage.setRecentLesson(courseSlug, lessonSlug, lesson.name)
    }
  }, [courseSlug, lesson, lessonSlug])

  function onChangeContent(content: string) {
    setContent(content)
    setContentChanged(true)
    setIsDraft(true)
  }

  function publish() {
    if (!lesson) return
    api.courses.saveLessonContent(lesson.id, content).then(() => {
      setIsDraft(false)
      setIsSaving(false)
      setShowPublishedNotice(true)
      delaySetPublishedNotice(false, 3000)
    })
  }

  return (
    <>
      <section className="card spacing">
        <header>
          <Heading size={3}>
            Course: <span className="text-blue">{course?.name}</span>
          </Heading>
          <Heading>{lesson?.name}</Heading>
        </header>

        <nav className="horizontal-spacing vertical-middle">
          {course && (
            <Link className="button button-small button-outline" to={`../${course.slug}`}>
              Back To Lessons
            </Link>
          )}
          {content.length > 0 && (
            <button
              className={classNames('button button-small', { 'button-outline': !preview })}
              onClick={() => setPreview(!preview)}
            >
              {!preview ? 'Preview' : 'Close Preview'}
            </button>
          )}
          {isDraft && (
            <button className="button button-small" onClick={publish}>
              Publish Draft
            </button>
          )}
          {isSaving && <i>Saving Draft...</i>}
          {!isSaving && !isDraft && showPublishedNotice && <b>Published 🎉</b>}
        </nav>

        <div style={{ minHeight: '500px' }}>
          {!isLoading && (
            <>
              {isLoading || !preview ? (
                <textarea
                  className={styles.contentInputField}
                  placeholder="Type Lesson Content Here"
                  value={content}
                  onChange={(e) => onChangeContent(e.target.value)}
                />
              ) : (
                <div
                  className={`${styles.contentPreview} spacing-large`}
                  dangerouslySetInnerHTML={{ __html: md.render(content) }}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
