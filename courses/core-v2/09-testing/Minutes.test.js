import React from 'react'
import { Minutes } from './Minutes'

/**
 * With React Testing Library
 * See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
 */

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Minutes', () => {
  it('should display initial value of 0', () => {
    render(<Minutes minutes={0} />)
    const minutes = screen.getByTestId('minutes-input')
    expect(minutes.value).toEqual('0')
  })

  it('should not allow subtraction when quantity is already 0', () => {
    render(<Minutes minutes={0} />)
    const minutes = screen.getByTestId('minutes-input')
    const subtract = screen.getByTestId('subtract-button')
    expect(minutes.value).toEqual('0')
    fireEvent.click(subtract)
    expect(minutes.value).toEqual('0')
  })

  it('should add', () => {
    const onChange = jest.fn()
    render(<Minutes minutes={0} onChange={onChange} />)
    const add = screen.getByTestId('add-button')
    fireEvent.click(add)
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('should subtract', () => {
    const onChange = jest.fn()
    render(<Minutes minutes={1} onChange={onChange} />)
    const subtract = screen.getByTestId('subtract-button')
    fireEvent.click(subtract)
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('should add (up arrow)', () => {
    const onChange = jest.fn()
    render(<Minutes minutes={0} onChange={onChange} />)
    const minutes = screen.getByTestId('minutes-input')
    fireEvent.keyDown(minutes, { key: 'ArrowUp' })
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('should subtract (down arrow)', () => {
    const onChange = jest.fn()
    render(<Minutes minutes={1} onChange={onChange} />)
    const minutes = screen.getByTestId('minutes-input')
    fireEvent.keyDown(minutes, { key: 'ArrowDown' })
    expect(onChange).toHaveBeenCalledWith(0)
  })
})

/**
 * The same tests with React Test-Utils
 */

import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

describe('Quantity', () => {
  let container
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  it('should start with 0', () => {
    act(() => {
      ReactDOM.render(<Minutes minutes={0} />, container)
    })
    const input = container.querySelector('[data-testid="minutes-input"]')
    expect(input.value).toBe('0')
  })

  it('should not allow subtraction when quantity is 0', () => {
    act(() => {
      ReactDOM.render(<Minutes minutes={0} />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const input = container.querySelector('[data-testid="minutes-input"]')
    expect(input.value).toBe('0')
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  it('should add', () => {
    const onChange = jest.fn()
    act(() => {
      ReactDOM.render(<Minutes minutes={0} onChange={onChange} />, container)
    })
    const addButton = container.querySelector('[data-testid=add-button]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('should subtract', () => {
    const onChange = jest.fn()
    act(() => {
      ReactDOM.render(<Minutes minutes={1} onChange={onChange} />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('should add (up arrow)', () => {
    const onChange = jest.fn()
    act(() => {
      ReactDOM.render(<Minutes minutes={0} onChange={onChange} />, container)
    })
    const input = container.querySelector('[data-testid="minutes-input"]')
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
        })
      )
    })
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('should add (down arrow)', () => {
    const onChange = jest.fn()
    act(() => {
      ReactDOM.render(<Minutes minutes={1} onChange={onChange} />, container)
    })
    const input = container.querySelector('[data-testid="minutes-input"]')
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
    })
    expect(onChange).toHaveBeenCalledWith(0)
  })
})
