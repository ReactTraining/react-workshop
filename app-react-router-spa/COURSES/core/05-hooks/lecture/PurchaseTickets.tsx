import { useState, useId, useRef, useMemo, useCallback, memo } from 'react'
import { slowFunction } from '~/utils/helpers'

export function App({ y }) {
  const [tickets, setTickets] = useState(3)
  const [comments, setComments] = useState('')

  // Makes an array like [1,2,3...] to the number of tickets
  const attendees = [...Array(tickets).keys()]

  const ticketsId = useId()
  const commentsId = useId()

  console.time()
  const x = useMemo(() => slowFunction(y), [y])
  console.timeEnd()

  return (
    <form className="space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor={commentsId} className="text-sm">
          Comments
        </label>
        <textarea
          id={commentsId}
          className="form-field"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <div className="text-xs">Characters: {comments.length}</div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={ticketsId} className="text-sm">
          Tickets
        </label>
        <input
          id={ticketsId}
          type="range"
          min={0}
          max={4}
          value={tickets}
          className="w-40"
          onChange={(e) => setTickets(parseInt(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        {attendees.map((number) => {
          // The "clear" button wants to use refs to clear the inputs
          // but we can't use useRef() dynamically

          return <AddAttendeeFields key={number} ticketNumber={number + 1} />
        })}
      </div>
    </form>
  )
}

type AddAttendeeFieldsProps = {
  ticketNumber: number
  // onUpdate(name: string, tickets: number): void
}

const AddAttendeeFields = ({ ticketNumber }: AddAttendeeFieldsProps) => {
  const inputRef = useRef<HTMLInputElement>(null!)

  function clear() {
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-2">
      <div className="w-20">Ticket {ticketNumber}</div>
      <div className="flex-1">
        <input
          ref={inputRef}
          type="text"
          className="form-field"
          placeholder="Name"
          required
          aria-label={`Ticket ${ticketNumber} Name`}
        />
      </div>
      <div className="flex-1">
        <input
          type="email"
          className="form-field"
          placeholder="Email"
          required
          aria-label={`Ticket ${ticketNumber} Email`}
        />
      </div>
      <button className="button" type="button" onClick={clear}>
        Clear
      </button>
    </div>
  )
}
