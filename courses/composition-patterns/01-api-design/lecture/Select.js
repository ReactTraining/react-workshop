/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

export function Select() {
  let [isOpen, setIsOpen] = React.useState(false)
  let [selectedOption, setSelectedOption] = React.useState('Banana')
  let listRef = React.useRef()
  let buttonRef = React.useRef()

  // Re-focus the select button when the menu closes, but since it's initially
  // closed we need to skip the initial render
  let rendered = React.useRef(false)
  React.useEffect(() => {
    if (rendered.current && !isOpen) {
      window.requestAnimationFrame(() => {
        buttonRef.current?.focus()
      })
    }

    rendered.current = true
  }, [isOpen])

  return (
    <div className="select">
      <p>What is your favorite fruit?</p>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen((state) => !state)
          window.requestAnimationFrame(() => {
            listRef.current?.focus()
          })
        }}
        className="select-button"
        aria-haspopup="listbox"
        id="select-button"
      >
        {selectedOption}
      </button>
      <div
        id="select-list"
        className="select-list"
        role="listbox"
        tabindex={-1}
        hidden={!isOpen}
        // This is the ID of the selected option
        aria-activedescendant={`option-${slugify(selectedOption)}`}
        ref={listRef}
        onBlur={() => {
          setIsOpen(false)
        }}
        onKeyDown={(event) => {
          switch (event.key) {
            case 'Escape':
              setIsOpen(false)
              break
            default:
              break
          }
        }}
      >
        <div
          role="option"
          id={`option-${slugify('Banana')}`}
          className="select-option"
          onClick={(event) => {
            event.preventDefault()
            setSelectedOption('Banana')
            setIsOpen(false)
          }}
          aria-selected={selectedOption === 'Banana' || undefined}
        >
          Banana
        </div>
        <div
          role="option"
          id={`option-${slugify('Apple')}`}
          className="select-option"
          onClick={(event) => {
            event.preventDefault()
            setSelectedOption('Apple')
            setIsOpen(false)
          }}
          aria-selected={selectedOption === 'Apple' || undefined}
        >
          Apple
        </div>
        <div
          role="option"
          id={`option-${slugify('Kiwi')}`}
          className="select-option"
          onClick={(event) => {
            event.preventDefault()
            setSelectedOption('Kiwi')
            setIsOpen(false)
          }}
          aria-selected={selectedOption === 'Kiwi' || undefined}
        >
          Kiwi
        </div>
      </div>
    </div>
  )
}

function slugify(string) {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}
