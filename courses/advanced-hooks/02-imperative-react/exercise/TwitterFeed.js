import React, { useState, useRef, useEffect } from 'react'

const Tweet = React.memo(({ id }) => {
  const tweetRef = useRef()

  useEffect(() => {
    // function renderTweet() {} 👈 leave this until you see why in the README
    // ..
    // finish this
    // ..
  }, [])

  return <div ref={tweetRef} />
})

export default function TwitterFeed() {
  const [show, setShow] = useState(true)

  return (
    <>
      <div>
        <button onClick={() => setShow(!show)} className="button">
          Show Tweets: {show ? 'On' : 'Off'}
        </button>
      </div>
      {show && (
        <div>
          <Tweet id="1274126046648864768" />
          <Tweet id="1294327194009952256" />
        </div>
      )}
    </>
  )
}
