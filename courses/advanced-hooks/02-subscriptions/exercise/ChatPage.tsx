import { useState, useEffect, useRef } from 'react'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { useAuthContext } from 'course-platform/AuthContext'
import type { ChatMessage } from 'course-platform/utils/types'
import styles from '../../../../apps/course-platform/ChatPage/ChatPage.module.scss'

const THREAD_NAME = 'all'

export function ChatPage() {
  const { user } = useAuthContext()
  const chatBoardRef = useRef<HTMLDivElement>(null!)

  const [input, setInput] = useState('')
  const [scrolledToBottom, setScrolledToBottom] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // You'll use Date.now() for this state (which is a number)
  const [startSubscription, setStartSubscription] = useState<number | null>(null)

  // Get initial messages
  // api.chat.getMessages(THREAD_NAME).then((messages) => {
  // })

  // Subscribe to new messages
  // const cleanup = api.chat.subscribe(
  //   Date.now(),
  //   (newMessages) => {
  //   },
  //   THREAD_NAME
  // )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !input) return
    api.chat.postMessage(input, user.id, user.name, user.avatarUrl, THREAD_NAME).then(() => {
      // noop (no operation)
      // We don't need to do anything when we post a message here to get it added to state. The
      // subscription will do that for us
    })
  }

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
        {messages.length > 0 &&
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
        <input className="form-field" value={input} onChange={(e) => setInput(e.target.value)} />
        <div>
          <button type="submit" className="button">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
