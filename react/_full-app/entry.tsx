import 'spa/index'

const showErrorOverlay = (err) => {
  // must be within function call because that's when the element is defined for sure.
  const ErrorOverlay = customElements.get('vite-error-overlay')
  // don't open outside vite environment
  if (!ErrorOverlay) {
    return
  }
  const overlay = new ErrorOverlay(err)
  document.body.appendChild(overlay)
}

window.addEventListener('error', showErrorOverlay)
window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason))
