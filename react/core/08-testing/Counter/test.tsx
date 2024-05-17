import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Test Component
import { Counter } from './Counter'

describe('Counter', () => {
  it('should display initial count of 0', () => {
    render(<Counter count={0} setCount={() => null} />)
    const input = screen.getByTestId<HTMLInputElement>('input')
    expect(input.value).toEqual('0')
  })

  it('should not allow subtraction when count is already 0 and min is 0', () => {
    render(<Counter count={0} setCount={() => null} />)
    const input = screen.getByTestId<HTMLInputElement>('input')
    const subtract = screen.getByTestId('subtract')
    fireEvent.click(subtract)
    expect(input.value).toEqual('0')
  })

  it('should add', () => {
    const setCount = jest.fn()
    render(<Counter count={0} setCount={setCount} />)
    const add = screen.getByTestId('add')
    fireEvent.click(add)
    expect(setCount).toHaveBeenCalledWith(1)
  })

  it('should subtract', () => {
    const setCount = jest.fn()
    render(<Counter count={1} setCount={setCount} />)
    const subtract = screen.getByTestId('subtract')
    fireEvent.click(subtract)
    expect(setCount).toHaveBeenCalledWith(0)
  })
})
