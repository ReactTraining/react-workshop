import { useRef, useEffect, useMemo } from 'react'

const queueRenders = []

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
        // When this script loads, the twitter API will be at `window.twttr`
        script.onload = () => {
          queueRenders.forEach((cb) => cb())
        }
      }
      queueRenders.push(renderTweet)
    } else {
      renderTweet()
    }

    const div = tweetRef.current
    return () => {
      div.innerHTML = ''
    }
  }, [id, options])

  return <div ref={tweetRef} className="flex-1" />
}

export function Page({ options }) {
  return (
    <div className="flex gap-6">
      <Tweet id="1274126046648864768" options={options} />
      <Tweet id="1294327194009952256" options={options} />
    </div>
  )
}
