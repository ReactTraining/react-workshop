import { useState, useEffect, useRef } from 'react'
import { api } from '~/utils/api'
import { Avatar } from '~/Avatar'

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

  // You'll use Date.now() for this state (which is a number)
  const [startSubscription, setStartSubscription] = useState<number | null>(null)

  // // Get initial messages
  useEffect(() => {
    api.chat.getMessages(THREAD_NAME).then((messages) => {
      setMessages(messages)
      setStartSubscription(Date.now())
    })
  }, [])

  useEffect(() => {
    if (startSubscription) {
      const cleanup = api.chat.subscribe(
        startSubscription,
        (newMessages) => {
          setMessages((messages) => [...messages, ...newMessages])
          // setMessages((messages) => messages.concat(newMessages))
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
    setInput('')
    inputRef.current.focus()
    api.chat.postMessage(input, user.id, user.name, user.avatarUrl, THREAD_NAME).then(() => {
      // noop (no operation)
      if (input === 'clear') {
        setMessages([])
      }
    })
  }

  function onBoardScroll(event: any) {
    const e = event.target
    // See if the user scrolled to the bottom
    const bottom = e.scrollHeight <= Math.ceil(e.scrollTop + e.clientHeight)
    // ⭐️⭐️⭐️ Let's talk about this if-statement and why it's actually not needed
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
