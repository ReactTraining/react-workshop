import { useState, useRef } from 'react'

export function BlackBox() {
  // const spanRef = useRef()
  const [position, setPosition] = useState([0, 0])

  return (
    <div
      className="black-box"
      onMouseMove={(e) => {
        const currentTargetRect = e.currentTarget.getBoundingClientRect()
        const x = e.pageX - currentTargetRect.left
        const y = e.pageY - currentTargetRect.top
        // spanRef.current.innerHTML = `${x} - ${y}`
        setPosition([x, y])
      }}
    >
      <span>
        {position[0]} - {position[1]}
      </span>
      {/* <BigTree /> */}
    </div>
  )
}

// function BigTree() {
//   console.log('render')
//   return (
//     <>
//       {[...Array(10000).keys()].map((n, i) => {
//         return <div key={i}></div>
//       })}
//     </>
//   )
// }
