import React, { useState, useRef, useEffect } from 'react'
import { MdModeEdit } from 'react-icons/md'
import 'ProjectPlanner/EditTitle.scss'

type Props = {
  title: string
  placeholder?: string
  onSave(title: string): void
}

export const EditTitle: React.FC<Props> = ({ title, placeholder, onSave }) => {
  const [edit, setEdit] = useState(false)
  const editTitleRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function saveTitle() {
    setEdit(false)
    if (inputRef.current && inputRef.current.value.trim() !== title) {
      onSave(inputRef.current.value.trim())
    }
  }

  function handleFocusOnEnter(event: React.KeyboardEvent) {
    if (event.key === 'Enter') setEdit(true)
  }

  function handleInputKeyDown(event: React.KeyboardEvent) {
    if (inputRef.current && event.key === 'Enter') {
      event.stopPropagation()
      // inputRef.current.blur()
      if (editTitleRef.current) {
        editTitleRef.current.focus()
      }
    }
  }

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.select()
    }
  }, [edit])

  return (
    <div
      ref={editTitleRef}
      className="edit-title icon-text"
      tabIndex={0}
      onKeyDown={handleFocusOnEnter}
    >
      <input
        type="text"
        tabIndex={-1}
        ref={inputRef}
        defaultValue={title.trim()}
        placeholder={placeholder}
        onBlur={saveTitle}
        onKeyDown={handleInputKeyDown}
      />
      <MdModeEdit />
    </div>
  )
}
