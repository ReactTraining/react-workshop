import { create } from 'zustand'

export type CheckoutData = {
  // Step 1: Contact
  firstName: string
  lastName: string
  email: string
  phone: string
  // Step 2: Shipping
  address: string
  city: string
  state: string
  zip: string
  // Step 3: Payment
  cardName: string
  cardNumber: string
  expiration: string
  cvv: string
}

type CheckoutStore = {
  step: number
  totalSteps: number
  data: CheckoutData
  setField: (field: keyof CheckoutData, value: string) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

const initialData: CheckoutData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  cardName: '',
  cardNumber: '',
  expiration: '',
  cvv: '',
}

const TOTAL_STEPS = 3

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  step: 1,
  totalSteps: TOTAL_STEPS,
  data: initialData,
  setField: (field, value) =>
    set((store) => ({ data: { ...store.data, [field]: value } })),
  nextStep: () => set((store) => ({ step: Math.min(store.step + 1, TOTAL_STEPS) })),
  prevStep: () => set((store) => ({ step: Math.max(store.step - 1, 1) })),
  reset: () => set({ step: 1, data: initialData }),
}))
