import { renderHook, act } from '@testing-library/react-hooks'
import useMedia from './useMedia'

// Mock window.matchMedia
// https://github.com/Ayc0/mock-match-media-examples/blob/master/create-react-app/src/App.test.js
import 'mock-match-media/polyfill'
import { setMedia } from 'mock-match-media'

/**
 * This code needs react-test-renderer installed as a peer dependency at the
 * same version as react itself
 */

describe('useMedia', () => {
  it('should match which the screen is wide', async () => {
    setMedia({ width: '1000px' })
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))
    expect(result.current).toBe(true)
  })

  it('should match which the screen is narrow', async () => {
    setMedia({ width: '500px' })
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))
    expect(result.current).toBe(false)
  })

  it('should match after window resize', async () => {
    setMedia({ width: '500px' })
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))
    expect(result.current).toBe(false)

    // Change the media after the hook has starting running (requires act)
    act(() => {
      setMedia({ width: '1000px' })
    })

    expect(result.current).toBe(true)
  })
})
