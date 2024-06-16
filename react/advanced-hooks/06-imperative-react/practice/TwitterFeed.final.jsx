import { useRef, useEffect, useMemo } from 'react'

let queueRenders = []

function Tweet({ id, options = {} }) {
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
          queueRenders.forEach((cb) => cb())
          queueRenders = []
        }
      }
      queueRenders.push(renderTweet)
    } else {
      renderTweet()
    }

    // The linter will complain if we use tweetRef.current in the cleanup function,
    // saying that the "current" value can change from when the effect runs to when
    // the cleanup runs, this is their recommended approach
    const node = tweetRef.current
    return () => {
      node.innerHTML = ''
    }
  }, [id, options])

  return <div ref={tweetRef} className="flex-1" />
}

export function Page({ theme }) {
  const options = useMemo(() => {
    return {
      theme,
    }
  }, [theme])

  return (
    <div className="flex gap-6">
      <Tweet id="1274126046648864768" options={options} />
      <Tweet id="1294327194009952256" options={options} />
    </div>
  )
}
