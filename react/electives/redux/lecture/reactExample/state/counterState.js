import { createReducer, createAction } from '@reduxjs/toolkit'

export const actions = {
  increment: createAction('INCREMENT'),
  decrement: createAction('DECREMENT'),
}

const initialState = { count: 5 }

export const counterReducer = createReducer(initialState, {
  [actions.increment]: (state, action) => {
    return { ...state, count: state.count + 1 }
  },
  [actions.decrement]: (state, action) => {
    return { ...state, count: state.count - 1 }
  },
})
