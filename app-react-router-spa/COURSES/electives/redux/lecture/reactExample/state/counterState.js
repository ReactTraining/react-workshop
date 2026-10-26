import { createReducer, createAction } from '@reduxjs/toolkit'

export const actions = {
  increment: createAction('INCREMENT'),
  decrement: createAction('DECREMENT'),
}

const initialState = { count: 0 }

export const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.increment, (state, action) => {
    return { ...state, count: state.count + 1 }
  })
  builder.addCase(actions.decrement, (state, action) => {
    return { ...state, count: state.count - 1 }
  })
})
