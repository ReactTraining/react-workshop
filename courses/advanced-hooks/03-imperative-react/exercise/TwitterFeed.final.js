import React, { useEffect, useState, useRef, useCallback } from 'react'

let queueTweets = []

const Tweet = React.memo(({ id }) => {
  const tweetRef = useRef()

  useEffect(() => {
    function renderTweet() {
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current)
    }

    if (!window.twttr) {
      if (queueTweets.length === 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js')
        document.body.appendChild(script)
        script.onload = () => {
          queueTweets.forEach(cb => cb())
          queueTweets = []
        }
      }
      queueTweets.push(renderTweet)
    } else {
      renderTweet()
    }
  }, [id])

  return <div ref={tweetRef} />
})

function TwitterFeed() {
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

export default TwitterFeed
