import { useState, useEffect, useRef } from 'react'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { useAuthContext } from 'course-platform/AuthContext'
import type { ChatMessage } from 'course-platform/utils/types'
import styles from '../../../../apps/course-platform/ChatPage/ChatPage.module.scss'

export function ChatPage() {
  const { user } = useAuthContext()
  const chatBoardRef = useRef<HTMLDivElement>(null!)

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [subscribeCreatedAt, setSubscribeCreatedAt] = useState(() => Date.now())
  const [scrolledToBottom, setScrolledToBottom] = useState(true)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !input) return
    api.chat.postMessage(input, user.id, user.name, user.avatarUrl).then(() => {
      // What do you want to do here?
    })
  }

  // 🟢 useEffect Here
  // api.chat.getMessages().then((messages) => {
  //   setMessages(messages)
  // })

  // 🔵 useEffect Here

  // The issue is we're unsubscribing and re-subscribing on every new message

  // useEffect(() => {
  //   if (messagesLoaded) {
  //     const cleanup = api.chat.subscribe(subscribeCreatedAt, (newMessages: ChatMessage[]) => {
  //       setMessages((messages) => {
  //         return (messages || []).concat(newMessages)
  //       })
  //       setSubscribeCreatedAt(Date.now())
  //     })
  //     return cleanup
  //   }
  // }, [messagesLoaded, subscribeCreatedAt])

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
