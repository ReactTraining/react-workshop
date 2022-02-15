import React, { useState, useEffect, useRef } from 'react'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { useAuthContext } from 'course-platform/AuthContext'
import type { ChatMessage } from 'course-platform/utils/types'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const { user } = useAuthContext()
  const chatBoardRef = useRef<HTMLDivElement>(null!)

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [messagesLoaded, setMessagesLoaded] = useState(false)
  const [subscribeCreatedAt, setSubscribeCreatedAt] = useState(() => Date.now())
  const [scrolledToBottom, setScrolledToBottom] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null!)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !input) return
    const clear = input.toLowerCase().trim() === 'clear'
    setInput('')
    inputRef.current.focus()
    api.chat.postMessage(input, user.id, user.name, user.avatarUrl).then(() => {
      if (clear) {
        setMessages([])
      }
    })
  }

  useEffect(() => {
    let isCurrent = true
    api.chat.getMessages().then((messages) => {
      if (isCurrent) {
        setMessages(messages)
        setMessagesLoaded(true)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [])

  useEffect(() => {
    if (messagesLoaded) {
      const cleanup = api.chat.subscribe(subscribeCreatedAt, (newMessages: ChatMessage[]) => {
        setMessages((messages) => {
          return (messages || []).concat(newMessages)
        })
        setSubscribeCreatedAt(Date.now())
      })
      return cleanup
    }
  }, [messagesLoaded, subscribeCreatedAt])

  useEffect(() => {
    if (scrolledToBottom) {
      chatBoardRef.current.scrollTop = chatBoardRef.current.scrollHeight
    }
  }, [messages, scrolledToBottom])

  function onBoardScroll(event: any) {
    const e = event.target
    const bottom = e.scrollHeight === e.scrollTop + e.clientHeight
    if (scrolledToBottom !== bottom) {
      setScrolledToBottom(bottom)
    }
  }

  return (
    <div className={styles.component}>
      <div className="chat-board spacing" ref={chatBoardRef} onScroll={onBoardScroll}>
        {messagesLoaded &&
          messages.length > 0 &&
          messages.map((message) => {
            return (
              <div key={message.id} className="chat-message flex flex-gap">
                <div>
                  <Avatar src={message.avatarUrl} size={4} />
                </div>
                <div className="spacing-small">
                  <div>
                    <b>{message.user}</b>
                  </div>
                  <div>{message.text}</div>
                </div>
              </div>
            )
          })}
      </div>
      <form onSubmit={onSubmit} className="chat-controls spacing">
        <input
          ref={inputRef}
          className="form-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div>
          <button type="submit" className="button">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
