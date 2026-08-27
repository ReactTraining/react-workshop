import { useRef, useEffect, useMemo } from 'react'

const queueRenders = []

function Tweet({ id }) {
  const tweetRef = useRef()

  useEffect(() => {
    function renderTweet() {
      const options = {} // if we were to want to pass options
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    if (!window.twttr) {
      if (queueRenders.length === 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js')
        document.body.appendChild(script)
        // When this script loads, the twitter API will be at `window.twttr`
        script.onload = () => {
          queueRenders.forEach((cb) => cb())
        }
      }
      queueRenders.push(renderTweet)
    } else {
      renderTweet()
    }
  }, [id])

  return <div ref={tweetRef} className="flex-1" />
}

export function Page({ theme }) {
  const options = { theme }

  return (
    <div className="flex gap-6">
      <Tweet id="1274126046648864768" />
      <Tweet id="1294327194009952256" />
    </div>
  )
}
