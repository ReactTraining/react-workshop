import React from 'react'
import { MdModeComment } from 'react-icons/md'
import { FaCalendar, FaTrash } from 'react-icons/fa'
import './Card.scss'

type Props = {
  cardId: number
}

export const Card: React.FC<Props> = ({ cardId, children }) => {
  // useEffect(() => {
  //   console.log('effect', cardId)
  // }, [])

  return (
    <div className="card">
      <div className="card-body">{children}</div>
      <footer className="flex-split">
        <div className="horizontal-spacing">
          <span className="text-icon text-small text-light">
            <MdModeComment color="#04b3ff" />
            <span>4</span>
          </span>
          <span className="text-icon text-small text-light">
            <FaCalendar color="#696ad8" />
            <span>May 13th</span>
          </span>
        </div>
        <div>
          <button className="text-small">
            <FaTrash color="#696ad8" />
          </button>
        </div>
      </footer>
    </div>
  )
}
