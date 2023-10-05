import { useState, useId, useRef, useMemo, useCallback, useEffect, memo } from 'react'
import { slowFunction } from '~/utils/helpers'

export function PurchaseTickets() {
  const [tickets, setTickets] = useState(3)
  const [comments, setComments] = useState('')

  const ticketsId = useId()
  const commentsId = useId()

  const prices = useMemo(() => slowFunction(tickets), [tickets])

  const onUpdate = useCallback((name: string, tickets: number) => {
    console.log(name, tickets)
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
          return <AddAttendeeFields key={number} ticketNumber={number + 1} onUpdate={onUpdate} />
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
  const nameRef = useRef<HTMLInputElement>(null!)
  const emailRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (ticketNumber === 1) {
      nameRef.current.focus()
    }
  }, [ticketNumber])

  function clear() {
    nameRef.current.value = ''
    emailRef.current.value = ''
    nameRef.current.focus()
  }

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-2">
      <div className="w-20">Ticket {ticketNumber}</div>
      <div className="flex-1">
        <input
          type="text"
          className="form-field"
          placeholder="Name"
          required
          aria-label={`Ticket ${ticketNumber} Name`}
          ref={nameRef}
        />
      </div>
      <div className="flex-1">
        <input
          type="email"
          className="form-field"
          placeholder="Email"
          required
          aria-label={`Ticket ${ticketNumber} Name`}
          ref={emailRef}
        />
      </div>
      <button className="button" type="button" onClick={clear}>
        Clear
      </button>
    </div>
  )
})
