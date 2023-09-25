import { useState, useId, useRef, useMemo, useCallback, memo } from 'react'

/**
 * 1. We can't call hooks while we map, so move attendee inputs to a separate component
 * 2. Now we can do useId and useRef (refs to clear the form)
 * 3. Demo useMemo with the slow running `computeTicketPrices`
 * 4. Demo the comments causing re-renders that cascade down to the attendee fields
 *    and how we can use React.memo to mitigate re-renders
 * 5. Demo useCallback on the onUpdate function if a fn is passed to a memoized component
 * 6. If there's time, demo useEffect for focusing the first attendee input on page load
 */

export function PurchaseTickets() {
  const [tickets, setTickets] = useState(3)
  const [comments, setComments] = useState('')

  const ticketsId = useId()
  const commentsId = useId()

  // Demo useMemo and useCallback
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

// Mimic having a very slow function...
function computeTicketPrices(tickets: number) {
  for (let index = 0; index < 800_000_000; index++) {}
}
