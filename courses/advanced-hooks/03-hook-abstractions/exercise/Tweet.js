import React, { useRef, useEffect } from 'react'

let queueRenders = []

function Tweet({ id, options }) {
  const tweetRef = useRef()

  useEffect(() => {
    function renderTweet() {
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    if (!window.twttr) {
      if (queueRenders.length === 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js')
        document.body.appendChild(script)
        script.onload = () => {
          queueRenders.forEach(cb => cb())
          queueRenders = []
        }
      }
      queueRenders.push(renderTweet)
    } else {
      renderTweet()
    }

    return () => {
      tweetRef.current.innerHTML = ''
    }
  }, [id, options])

  return <div ref={tweetRef} />
}

export default Tweet
