import { FormEvent, useState } from 'react'
import { Heading } from '~/Heading'
import { LessonCard } from '~/Lesson'
import { StepContact } from './StepContact'
import { StepShipping } from './StepShipping'
import { StepPayment } from './StepPayment'

const steps = [
  { title: 'Contact', Component: StepContact },
  { title: 'Shipping', Component: StepShipping },
  { title: 'Payment', Component: StepPayment },
]

export function Checkout() {
  const [step, setStep] = useState(1)
  const totalSteps = steps.length
  const { title } = steps[step - 1]

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < totalSteps) {
      setStep((s) => s + 1)
      return
    }

    const formData = new FormData(event.currentTarget)
    console.log(Object.fromEntries(formData))
  }

  return (
    <LessonCard>
      <Heading size={3}>
        Checkout: {title} (Step {step} of {totalSteps})
      </Heading>
      <form onSubmit={onSubmit} className="space-y-3 max-w-96">
        {steps.map(({ Component }, index) => (
          <div key={index} className={step === index + 1 ? 'space-y-3' : 'hidden'}>
            <Component />
          </div>
        ))}

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="button"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
          >
            Previous
          </button>
          <button type="submit" className="button">
            {step < totalSteps ? 'Next' : 'Submit'}
          </button>
        </div>
      </form>
    </LessonCard>
  )
}
