import { Heading } from '~/Heading'
import { LessonCard } from '~/Lesson'
import { useCheckoutStore } from './checkoutStore'
import { StepContact } from './StepContact'
import { StepShipping } from './StepShipping'
import { StepPayment } from './StepPayment'

const steps = [
  { title: 'Contact', Component: StepContact },
  { title: 'Shipping', Component: StepShipping },
  { title: 'Payment', Component: StepPayment },
]

export function Checkout() {
  const step = useCheckoutStore((store) => store.step)
  const totalSteps = useCheckoutStore((store) => store.totalSteps)

  const { title, Component } = steps[step - 1]

  return (
    <LessonCard>
      <Heading size={3}>
        Checkout: {title} (Step {step} of {totalSteps})
      </Heading>
      <Component />
    </LessonCard>
  )
}
