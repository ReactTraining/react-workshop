import * as React from 'react'
import { useLocation } from 'react-router-dom'

const content = {
  '/': 'Welcome to our website!',
  '/about': `We are a great company, let's do business.`,
  '/contact': `Wanna do business? Contact us!`,
}

let apiCallCount = 0

async function getRecordData(pathname) {
  console.log(`API CALL # ${++apiCallCount}`)
  // this makes a network call
  return await new Promise((res, rej) =>
    window.setTimeout(() => {
      try {
        res({ content: content[pathname] })
      } catch (err) {
        rej('Oh no, something when wrong!')
      }
    }, 1500)
  )
}

/**
 * @param {string} pathname
 * @return {*}
 */
export function useRecordData(pathname) {
  const [data, setData] = React.useState({})

  // Mary says: we use a temp URL variable to prevent fetching data twice due to
  // a re-render
  const [oldPathname, setOldPathname] = React.useState('')

  React.useEffect(() => {
    let cancelled = false
    if (pathname && pathname !== oldPathname) {
      if (Object.keys(data).length) {
        setData({})
      }
      getRecordData(pathname)
        .then((recordData) => {
          if (!cancelled) {
            setOldPathname(pathname)
            setData(recordData)
          }
        })
        .catch(sendError)
    }
    return () => {
      cancelled = true
    }

    function sendError(response) {
      if (!cancelled) {
        setOldPathname(pathname)
        setData({ error: response })
      }
    }
  }, [pathname, oldPathname, data])

  return data
}
