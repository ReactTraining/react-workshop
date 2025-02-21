import { useMemo } from 'react'

// These utils are similar (or identical) to the ones Reach UI uses

export function wrapEvent(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}
