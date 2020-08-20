import React, { useRef, forwardRef } from 'react'
import { Portal } from './Portal'
import { useRect } from '@reach/rect'
import { useForkedRef } from '../../utils'

// Checkout the real Reach Popover
// https://github.com/reach/reach-ui/blob/master/packages/popover/src/index.tsx

// Why should popups be portalled? We're trying to get around the problems that
// arise in CSS when you try to position a floating box next to a target (like
// a button). Placing the popup at the root of the document means we'll have to
// figure out the target's position to make the popup relative to it, but that's
// going to give us a lot more freedom and the ability to move the popup away from
// the edge of the viewport.

export const Popover = forwardRef((props, forwardedRef) => {
  return (
    <Portal>
      <PopoverImpl ref={forwardedRef} {...props} />
    </Portal>
  )
})

Popover.displayName = 'Popover'

/**
 * PopoverImpl
 *
 * Popover is conditionally rendered so we can't start measuring until it shows
 * up, so useRect needs to live down here not up in Popover
 */
const PopoverImpl = forwardRef(
  (
    { targetRef, style, position = positionDefault, ...props },
    forwardedRef
  ) => {
    const popoverRef = useRef(null)
    const popoverRect = useRect(popoverRef)
    const targetRect = useRect(targetRef)

    // Combine Refs
    const ref = useForkedRef(popoverRef, forwardedRef)

    return (
      <div
        data-popover=""
        ref={ref}
        style={{
          ...style,
          position: 'absolute',
          ...getStyles(position, targetRect, popoverRect)
        }}
        {...props}
      />
    )
  }
)

/**
 * getStyles
 */

function getStyles(position, targetRect, popoverRect) {
  const needToMeasurePopup = !popoverRect
  if (needToMeasurePopup) {
    return { visibility: 'hidden' }
  }
  return position(targetRect, popoverRect)
}

/**
 * positionDefault
 */

export const positionDefault = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {}
  }

  const { directionUp, directionRight } = getCollisions(
    targetRect,
    popoverRect
  )
  return {
    left: directionRight
      ? `${targetRect.right -
          popoverRect.width +
          window.pageXOffset}px`
      : `${targetRect.left + window.pageXOffset}px`,
    top: directionUp
      ? `${targetRect.top -
          popoverRect.height +
          window.pageYOffset}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset}px`
  }
}

/**
 * getCollisions
 */

function getCollisions(
  targetRect,
  popoverRect,
  offsetLeft = 0,
  offsetBottom = 0
) {
  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right:
      window.innerWidth <
      targetRect.left + popoverRect.width - offsetLeft,
    bottom:
      window.innerHeight <
      targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left - popoverRect.width < 0
  }

  const directionRight = collisions.right && !collisions.left
  const directionUp = collisions.bottom && !collisions.top

  return { directionRight, directionUp }
}
