import { useState, useEffect, useRef } from 'react'
import { api } from 'react/_full-app/utils/api'
import { Avatar } from 'react2/_full-app/src/Avatar'
import { useAuthContext } from '~/AuthContext'
import type { ChatMessage } from 'react/_full-app/utils/types'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const { user } = useAuthContext()
  const chatBoardRef = useRef<HTMLDivElement>(null!)

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [messagesLoaded, setMessagesLoaded] = useState(false)
  const [subscribeCreatedAt, setSubscribeCreatedAt] = useState<number | null>(null)
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

  // Get Initial Messages
  useEffect(() => {
    let isCurrent = true
    api.chat.getMessages().then((messages) => {
      if (isCurrent) {
        setMessages(messages)
        setMessagesLoaded(true)
        setSubscribeCreatedAt(Date.now())
      }
    })
    return () => {
      isCurrent = false
    }
  }, [])

  // Once we've loaded initial messages in the above effect, it will
  // set the `subscribeCreatedAt` timestamp that will tell this effect
  // to create a subscription for any new message after that time:
  useEffect(() => {
    if (subscribeCreatedAt) {
      const cleanup = api.chat.subscribe(subscribeCreatedAt, (newMessages: ChatMessage[]) => {
        setMessages((messages) => {
          return (messages || []).concat(newMessages)
        })
        // Renew this timestamp to cause the next render
        // to destroy the previous subscription and create
        // a new one
        setSubscribeCreatedAt(Date.now())
      })
      return cleanup
    }
  }, [subscribeCreatedAt])

  useEffect(() => {
    if (scrolledToBottom) {
      chatBoardRef.current.scrollTop = chatBoardRef.current.scrollHeight
    }
  }, [messages, scrolledToBottom])

  function onBoardScroll(event: any) {
    const e = event.target
    // See if the user scrolled to the bottom
    const bottom = e.scrollHeight <= Math.ceil(e.scrollTop + e.clientHeight)
    // If the user is in a different scroll position from what we have
    // in state, update the state
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
                  <b className="block">{message.user}</b>
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
