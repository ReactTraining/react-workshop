import * as React from 'react'

let queueRenders = []

function Tweet({ id, options = {} }) {
  const tweetRef = React.useRef()

  React.useEffect(() => {
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

  return <div ref={tweetRef} />
}

function TwitterFeed() {
  const [show, setShow] = React.useState(true)
  const [theme, setTheme] = React.useState('light')

  const options = React.useMemo(() => {
    return {
      theme,
    }
  }, [theme])

  return (
    <>
      <div className="horizontal-spacing">
        <button onClick={() => setShow(!show)} className="button">
          Show Tweets: {show ? 'On' : 'Off'}
        </button>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">
          Theme
        </button>
      </div>
      {show && (
        <div>
          <Tweet id="1274126046648864768" options={options} />
          <Tweet id="1294327194009952256" options={options} />
        </div>
      )}
    </>
  )
}

export default TwitterFeed
