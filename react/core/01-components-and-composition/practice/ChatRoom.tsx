import { useState, useEffect, useRef } from 'react'
import { api } from '~/utils/api'
import { Avatar } from './Avatar'

type Props = {
  user: {
    id: number
    name: string
    avatarUrl: string
  }
}

type ChatMessage = {
  id: string
  user: string
  userId: number
  text: string
  created: number
  avatarUrl: string
}

const THREAD_NAME = 'all'

export function ChatRoom({ user }: Props) {
  const chatBoardRef = useRef<HTMLDivElement>(null!)
  const inputRef = useRef<HTMLInputElement>(null!)

  const [input, setInput] = useState('')
  const [scrolledToBottom, setScrolledToBottom] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [startSubscription, setStartSubscription] = useState<number | null>(null)

  // Get Initial Messages
  useEffect(() => {
    let isCurrent = true
    api.chat.getMessages(THREAD_NAME).then((messages) => {
      if (isCurrent) {
        setMessages(messages)
        setStartSubscription(Date.now())
      }
    })
    return () => {
      isCurrent = false
    }
  }, [])

  // Once we've loaded initial messages in the above effect, it will
  // set the `startSubscription` timestamp that will tell this effect
  // to create a subscription for any new message after that time:
  useEffect(() => {
    if (startSubscription) {
      const cleanup = api.chat.subscribe(
        startSubscription,
        (newMessages: ChatMessage[]) => {
          setMessages((messages) => {
            return (messages || []).concat(newMessages)
          })

          // Renew this timestamp to cause the next render
          // to destroy the previous subscription and create
          // a new one
          setStartSubscription(Date.now())
        },
        THREAD_NAME
      )
      return cleanup
    }
  }, [startSubscription])

  useEffect(() => {
    if (scrolledToBottom) {
      chatBoardRef.current.scrollTop = chatBoardRef.current.scrollHeight
    }
  }, [messages, scrolledToBottom])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !input) return
    const clear = input.toLowerCase().trim() === 'clear'
    setInput('')
    inputRef.current.focus()
    api.chat.postMessage(input, user.id, user.name, user.avatarUrl, THREAD_NAME).then(() => {
      if (clear) {
        setMessages([])
      }
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
    <>
      <div
        className="p-2 rounded-lg border space-y-3 h-[400px] overflow-scroll"
        ref={chatBoardRef}
        onScroll={onBoardScroll}
      >
        {messages.length > 0 &&
          messages.map((message) => {
            return (
              <div key={message.id} className="flex gap-3">
                <div>
                  <Avatar src={message.avatarUrl} size={3} />
                </div>
                <div className="flex-1">
                  <b className="block">{message.user}</b>
                  <div>{message.text}</div>
                </div>
              </div>
            )
          })}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          className="form-field flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="button">
          Send
        </button>
      </form>
    </>
  )
}
