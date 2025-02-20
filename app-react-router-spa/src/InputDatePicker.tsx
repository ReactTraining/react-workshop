import { useState } from 'react'
import { usePopper } from 'react-popper'
import { Popover } from '@headlessui/react'
import { SelectDateRange } from '~/SelectDateRange'
import { Icon } from '~/Icon'

type Props = {
  name?: string
  value?: string
  onSelectDates(start: string, end: string): void
} & React.HTMLAttributes<HTMLElement>

export function InputDatePicker({ onSelectDates, value, ...props }: Props) {
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <div className="form-field inline-flex items-center ">
      <input
        {...props}
        value={value}
        readOnly
        type="text"
        className="flex-1 border-none focus:outline-none"
      />

      <Popover className="relative">
        <Popover.Button ref={setReferenceElement}>
          <Icon name="calendar" size={1} className="mb-1" />
        </Popover.Button>

        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="absolute z-10 w-[600px] rounded-md shadow-lg p-3 bg-white border border-slate-200/60"
        >
          {({ close }) => {
            return (
              <SelectDateRange
                onSelect={(start, end) => {
                  onSelectDates(start, end)
                  setTimeout(close, 500)
                }}
              />
            )
          }}
        </Popover.Panel>
      </Popover>
    </div>
  )
}
