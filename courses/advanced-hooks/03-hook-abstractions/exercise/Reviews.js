import React from 'react'
import Heading from 'YesterTech/Heading'
import Tweet from './Tweet'
import { useTheme } from './ThemeState'

function Reviews() {
  const { scheme } = useTheme()
  return (
    <div className="spacing">
      <Heading>Reviews</Heading>
      <Tweet id="1274126046648864768" options={{ theme: scheme }} />
      <Tweet id="1294327194009952256" options={{ theme: scheme }} />
    </div>
  )
}

export default Reviews
