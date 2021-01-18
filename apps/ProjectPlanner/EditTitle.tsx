import React, { useState, useRef, useEffect } from 'react'
import { MdModeEdit } from 'react-icons/md'
import './EditTitle.scss'

type Props = {
  title: string
  onSave(title: string): void
}

export const EditTitle: React.FC<Props> = ({ title, onSave }) => {
  const [edit, setEdit] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  function saveTitle() {
    setEdit(false)
    if (titleRef.current && titleRef.current.value.trim() !== title) {
      onSave(titleRef.current.value.trim())
    }
  }

  function startEdit() {
    setEdit(true)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (titleRef.current && event.key === 'Enter') {
      titleRef.current.blur()
    }
  }

  useEffect(() => {
    if (edit && titleRef.current) {
      titleRef.current.focus()
      titleRef.current.select()
    }
  }, [edit])

  return (
    <div className="edit-title icon-text">
      {edit ? (
        <input
          type="text"
          ref={titleRef}
          defaultValue={title.trim()}
          onBlur={saveTitle}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span onClick={startEdit}>{title}</span>
      )}
      <MdModeEdit />
    </div>
  )
}
