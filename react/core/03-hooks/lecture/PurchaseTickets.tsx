import { useState, useId, useRef, useMemo, useCallback, memo } from 'react'
import computeTicketPrices from './utils/slowFunction'

export function PurchaseTickets() {
  const [tickets, setTickets] = useState(3)
  const [comments, setComments] = useState('')

  const ticketsId = useId()
  const commentsId = useId()

  // const prices = computeTicketPrices(tickets)
  // const onUpdate = (name: string, tickets: number) => {
  //   console.log(name, tickets)
  // }

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
          // Not a good id since it can't guarantee uniqueness
          const id = number

          return (
            <div key={number} className="flex items-center gap-2 bg-slate-100 p-2">
              <div className="w-20">Ticket {number + 1}</div>
              <div className="flex-1">
                <input
                  type="text"
                  className="form-field"
                  placeholder="Name"
                  required
                  aria-label={`${id}-name`}
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  className="form-field"
                  placeholder="Email"
                  required
                  aria-label={`${id}-email`}
                />
              </div>
              <button className="button" type="button">
                Clear
              </button>
            </div>
          )
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
  const id = 0

  function clear() {}

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-2">
      <div className="w-20">Ticket {ticketNumber}</div>
      <div className="flex-1">
        <input
          type="text"
          className="form-field"
          placeholder="Name"
          required
          aria-label={`${id}-name`}
        />
      </div>
      <div className="flex-1">
        <input
          type="email"
          className="form-field"
          placeholder="Email"
          required
          aria-label={`${id}-email`}
        />
      </div>
      <button className="button" type="button" onClick={clear}>
        Clear
      </button>
    </div>
  )
}
