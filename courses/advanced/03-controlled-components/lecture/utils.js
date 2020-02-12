export function wrapEvent(theirHandler, ourHandler) {
  return event => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}
