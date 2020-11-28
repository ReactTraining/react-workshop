export function position<R1 extends PartialRect, R2 extends PartialRect>(
  targetRect: R1 | null | undefined,
  popoverRect: R2 | null | undefined
) {
  if (!targetRect || !popoverRect) {
    return { left: 0, top: 0 };
  }

  const { directionUp, directionRight } = getCollisions(
    targetRect,
    popoverRect
  );
  return {
    left: directionRight
      ? `${targetRect.right - popoverRect.width + window.pageXOffset}px`
      : `${targetRect.left + window.pageXOffset}px`,
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset}px`,
  };
}

function getCollisions<R1 extends PartialRect, R2 extends PartialRect>(
  targetRect: R1 | null | undefined,
  popoverRect: R2 | null | undefined,
  offsetLeft = 0,
  offsetBottom = 0
): { directionRight: boolean; directionUp: boolean } {
  if (!targetRect || !popoverRect) {
    return { directionRight: false, directionUp: false };
  }

  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom:
      window.innerHeight <
      targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left - popoverRect.width < 0,
  };

  const directionRight = collisions.right && !collisions.left;
  const directionUp = collisions.bottom && !collisions.top;

  return { directionRight, directionUp };
}

type PartialRect = Pick<
  DOMRect,
  "width" | "height" | "right" | "left" | "top" | "bottom"
>;
