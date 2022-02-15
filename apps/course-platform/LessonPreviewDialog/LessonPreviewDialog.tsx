import MarkdownIt from 'markdown-it'
import { Dialog as ReachDialog } from '@reach/dialog'
import { Centered } from 'course-platform/Centered'
import { Icon } from 'course-platform/Icon'
import type { Lesson } from 'course-platform/utils/types'
import styles from './LessonPreviewDialog.module.scss'

const md = new MarkdownIt()

type Props = {
  lesson: Lesson
  onClose(): void
}

export function LessonPreviewDialog({ lesson, onClose }: Props) {
  return (
    <ReachDialog aria-label="Lesson Preview" onDismiss={onClose} className={styles.component}>
      <button className="close-dialog" onClick={onClose}>
        <Icon name="close" size={2} />
      </button>
      <Centered>
        {!lesson.content ? (
          <div>
            <em>This lesson doesn't have published content</em>
          </div>
        ) : (
          <div
            className="spacing-large"
            dangerouslySetInnerHTML={{ __html: md.render(lesson.content) }}
          />
        )}
      </Centered>
    </ReachDialog>
  )
}
