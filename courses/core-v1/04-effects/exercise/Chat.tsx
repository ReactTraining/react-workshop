import * as React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsFillChatFill } from 'react-icons/bs'

const ChatContext = React.createContext<ChatContextValue>(null!)

interface ChatState {
  messages: ChatMessageType[]
  chatInput: string
}

type ChatAction =
  | { type: 'SET_INPUT'; value: string }
  | { type: 'SUBMIT'; sender: string }
  | { type: 'RECEIVE'; message: string }
  | { type: 'CLEAR_CHAT' }

function reducer(state: ChatState, action: ChatAction): ChatState {
  function getNextMessageId() {
    let lastMessage = state.messages[state.messages.length - 1]
    let id = lastMessage ? lastMessage.id + 1 : 0
    return id
  }

  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        chatInput: action.value,
      }
    case 'SUBMIT': {
      let id = getNextMessageId()
      return {
        ...state,
        messages: [
          ...state.messages,
          { id, content: state.chatInput, sender: action.sender, which: 'sent' },
        ],
        chatInput: '',
      }
    }
    case 'RECEIVE': {
      let id = getNextMessageId()
      return {
        ...state,
        messages: [
          ...state.messages,
          { id, content: action.message, sender: 'ChatBot', which: 'received' },
        ],
      }
    }
    case 'CLEAR_CHAT': {
      return {
        ...state,
        messages: [],
      }
    }
  }
}

export function Chat({ sender }: { sender: string }) {
  let [isOpen, setIsOpen] = React.useState(true)
  let [{ chatInput, messages }, dispatch] = React.useReducer(reducer, {
    chatInput: '',
    messages: [],
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    dispatch({ type: 'SUBMIT', sender })
  }

  useMessageResponder({
    messages,
    sender,
    respond: React.useCallback((message: string) => {
      dispatch({ type: 'RECEIVE', message })
    }, []),
  })

  return (
    <aside className={`chat chat--${isOpen ? 'open' : 'closed'}`}>
      <header className="chat__header">
        <h1 className="chat__heading">Chat with us!</h1>
        <button
          className="chat__close-button"
          aria-label={isOpen ? 'Close the chat' : 'Open the chat'}
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? <AiOutlineClose aria-hidden /> : <BsFillChatFill aria-hidden />}
        </button>
      </header>
      <div className="chat__area">
        <ChatContext.Provider value={{ messages }}>
          {messages.map((message, i) => (
            <ChatMessage key={message.id} index={i} {...message} />
          ))}
        </ChatContext.Provider>
      </div>
      <div className="chat__entry">
        <form className="chat__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat__input"
            value={chatInput}
            onChange={(e) => dispatch({ type: 'SET_INPUT', value: e.target.value })}
            placeholder="Write a message..."
            aria-label="Your message"
            required
          />
          <button className="chat__submit" type="submit" aria-label="Send" disabled={!chatInput}>
            <SendIcon aria-hidden className="chat__submit-icon" />
          </button>
        </form>
      </div>
    </aside>
  )
}

function ChatMessage({ which, sender, content, index }: ChatMessageProps) {
  let allMessages = React.useContext(ChatContext).messages
  let lastMessage = allMessages[index - 1]
  let lastSender: null | string = null
  if (lastMessage) {
    lastSender = lastMessage.sender
  }

  return (
    <div className={`chat-message chat-message--${which}`}>
      {lastSender !== sender ? <div className="text-small chat-message__name">{sender}</div> : null}
      <div className="chat-message__content">{content}</div>
    </div>
  )
}

function SendIcon(props: any) {
  return (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M6.4,5.6l21,9.5c0.5,0.2,0.7,0.8,0.5,1.3c-0.1,0.2-0.3,0.4-0.5,0.5l-21,9.5	c-0.5,0.2-1.1,0-1.3-0.5c-0.1-0.3-0.1-0.6,0-0.8L8.6,18L20.5,16L8.6,14.1L5.1,6.9c-0.2-0.5,0-1.1,0.5-1.3C5.8,5.5,6.1,5.5,6.4,5.6z"></path>
    </svg>
  )
}

interface ChatMessageProps extends ChatMessageType {
  index: number
}

interface ChatMessageType {
  which: 'sent' | 'received'
  sender: string
  content: string
  id: number
}

interface ChatContextValue {
  messages: ChatMessageType[]
}

export default Chat

function useMessageResponder({ messages, sender, respond }) {
  let hasResponded = React.useRef(false)

  React.useEffect(() => {
    let isCurrent = true
    let chatLength = messages.length
    let lastMessage = messages[messages.length - 1]

    if (!lastMessage || lastMessage?.which === 'sent') {
      let timeoutId = window.setTimeout(
        () => {
          let message = `That's a great question! We will ask our expert YesterTech team and get back to you soon.`
          if (!hasResponded.current) {
            hasResponded.current = true
            message = `Welcome, ${sender}! Let us know if you have any questions about this product.`
          }
          if (isCurrent) {
            respond(message)
          }
        },
        chatLength > 0 ? 4000 : 1000
      )

      return () => {
        isCurrent = false
        window.clearTimeout(timeoutId)
      }
    }
  }, [messages, sender, respond])
}
