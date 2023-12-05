import { useRef, useEffect, useMemo } from 'react'

const renderQueue = []

function Tweet({ id, options }) {
  const tweetRef = useRef()

  useEffect(() => {
    function renderTweet() {
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    if (!window.twttr) {
      if (renderQueue.length === 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js')
        document.body.appendChild(script)
        script.onload = () => {
          renderQueue.forEach((cb) => cb())
        }
      }
      renderQueue.push(renderTweet)
    } else {
      renderTweet()
    }

    const node = tweetRef.current

    return () => {
      node.innerHTML = ''
    }
  }, [id, options])

  return <div ref={tweetRef} className="flex-1" />
}

export function Page({ theme }) {
  const options = useMemo(() => {
    return { theme }
  }, [theme])

  return (
    <div className="flex gap-6">
      <Tweet id="1274126046648864768" options={options} />
      <Tweet id="1294327194009952256" options={options} />
    </div>
  )
}
