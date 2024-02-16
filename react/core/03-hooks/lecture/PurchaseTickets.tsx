import { useState, useId, useRef, useMemo, useCallback, memo } from 'react'
import { slowFunction } from '~/utils/helpers'

export function PurchaseTickets() {
  const [tickets, setTickets] = useState(3)
  const [comments, setComments] = useState('')

  const ticketsId = useId()
  const commentsId = useId()

  const x = useMemo(() => slowFunction(tickets), [tickets]) // old === new

  const onUpdate = useCallback((name: string, tickets: number) => {
    // work with props and state
  }, [])

  return (
    <form className="space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor={commentsId} className="text-sm">
          Comments
        </label>
        <textarea
          id={commentsId}
          value={comments}
          className="form-field"
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
        {[...Array(tickets).keys()].map((number) => {
          return <AddAttendeeFields key={number} onUpdate={onUpdate} ticketNumber={number + 1} />
        })}
      </div>
    </form>
  )
}

type AddAttendeeFieldsProps = {
  ticketNumber: number
  onUpdate(name: string, tickets: number): void
}

const AddAttendeeFields = memo(({ ticketNumber, onUpdate }: AddAttendeeFieldsProps) => {
  const inputRef = useRef<HTMLInputElement>(null!)

  function clear() {
    inputRef.current.value = ''
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
})
