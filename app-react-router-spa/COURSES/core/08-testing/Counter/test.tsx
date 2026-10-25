import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Counter } from './Counter'

// Counter is controlled, so rendering it with `setCount={() => {}}` can never
// show a click. The count only changes when a parent stores the next value.
function renderCounter(initial = 0, min = 0) {
  function Harness() {
    const [count, setCount] = useState(initial)
    return <Counter count={count} setCount={setCount} min={min} />
  }

  return render(<Harness />)
}

describe('Counter', () => {
  it('shows the count it was given', () => {
    renderCounter(0)
    expect(screen.getByRole('textbox', { name: /count/i })).toHaveValue('0')
  })

  it('increases the count when add is clicked', async () => {
    const user = userEvent.setup()
    renderCounter(0)

    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(screen.getByRole('textbox', { name: /count/i })).toHaveValue('1')
  })

  it('decreases the count when subtract is clicked', async () => {
    const user = userEvent.setup()
    renderCounter(1)

    await user.click(screen.getByRole('button', { name: /subtract/i }))

    expect(screen.getByRole('textbox', { name: /count/i })).toHaveValue('0')
  })

  it('does not go below the minimum', async () => {
    const user = userEvent.setup()
    renderCounter(0)
    const subtract = screen.getByRole('button', { name: /subtract/i })

    expect(subtract).toBeDisabled()

    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(subtract).toBeEnabled()

    await user.click(subtract)
    expect(screen.getByRole('textbox', { name: /count/i })).toHaveValue('0')
    expect(subtract).toBeDisabled()
  })
})
