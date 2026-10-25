import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { useMedia } from './useMedia'

function installMatchMedia(matchesFor: (query: string) => boolean) {
  const listeners = new Set<() => void>()

  const matchMedia = vi.fn((query: string) => {
    return {
      get matches() {
        return matchesFor(query)
      },
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener(_type: string, listener: () => void) {
        listeners.add(listener)
      },
      removeEventListener(_type: string, listener: () => void) {
        listeners.delete(listener)
      },
      dispatchEvent() {
        return true
      },
    } as unknown as MediaQueryList
  })

  vi.stubGlobal('matchMedia', matchMedia)

  return {
    matchMedia,
    emit() {
      listeners.forEach((listener) => listener())
    },
  }
}

describe('useMedia', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns whether the query matches', () => {
    installMatchMedia((query) => query === '(min-width: 800px)')

    const { result } = renderHook(() => useMedia('(min-width: 800px)'))

    expect(result.current).toBe(true)
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 800px)')
  })

  it('updates when the media query changes', () => {
    let matches = false
    const media = installMatchMedia(() => matches)
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))

    expect(result.current).toBe(false)

    act(() => {
      matches = true
      media.emit()
    })

    expect(result.current).toBe(true)
  })

  it('re-reads the match when the query changes', () => {
    installMatchMedia((query) => query === '(min-width: 800px)')

    const { result, rerender } = renderHook(({ query }) => useMedia(query), {
      initialProps: { query: '(min-width: 800px)' },
    })

    expect(result.current).toBe(true)

    rerender({ query: '(max-width: 400px)' })

    expect(result.current).toBe(false)
  })
})
