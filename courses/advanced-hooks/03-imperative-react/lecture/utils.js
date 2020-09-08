export function position(targetRect, popoverRect) {
  if (!targetRect || !popoverRect) {
    return {}
  }

  const { directionUp, directionRight } = getCollisions(targetRect, popoverRect)
  return {
    left: directionRight
      ? `${targetRect.right - popoverRect.width + window.pageXOffset}px`
      : `${targetRect.left + window.pageXOffset}px`,
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset}px`
  }
}

function getCollisions(targetRect, popoverRect, offsetLeft = 0, offsetBottom = 0) {
  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom: window.innerHeight < targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left - popoverRect.width < 0
  }

  const directionRight = collisions.right && !collisions.left
  const directionUp = collisions.bottom && !collisions.top

  return { directionRight, directionUp }
}
