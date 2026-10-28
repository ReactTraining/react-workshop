import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { api } from '~/utils/api'

export const fetchVacations = createAsyncThunk(
  'vacations/fetchAll',
  () => api.vacations.getAll(),
  {
    // Our own "caching": skip the request if we already have the list or are
    // currently fetching it
    condition: (_, { getState }) => {
      const { listStatus } = getState().vacations
      return listStatus === 'idle' || listStatus === 'failed'
    },
  }
)

export const fetchVacation = createAsyncThunk(
  'vacations/fetchOne',
  (id) => api.vacations.getVacation(id),
  {
    // If the list was already loaded, we already have this vacation
    condition: (id, { getState }) => !getState().vacations.byId[id],
  }
)

const initialState = {
  // Normalized: vacations are stored by id so the list and the details page
  // can share the same data
  byId: {},
  listIds: [],
  listStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  listError: '',
  detailStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  detailError: '',
}

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchVacations.pending, (state) => {
        state.listStatus = 'loading'
        state.listError = ''
      })
      .addCase(fetchVacations.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        state.listIds = action.payload.map((vacation) => vacation.id)
        action.payload.forEach((vacation) => {
          state.byId[vacation.id] = vacation
        })
      })
      .addCase(fetchVacations.rejected, (state, action) => {
        state.listStatus = 'failed'
        state.listError = action.error.message
      })
      // Details
      .addCase(fetchVacation.pending, (state) => {
        state.detailStatus = 'loading'
        state.detailError = ''
      })
      .addCase(fetchVacation.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.byId[action.payload.id] = action.payload
      })
      .addCase(fetchVacation.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.detailError = action.error.message
      })
  },
})

export const vacationsReducer = vacationsSlice.reducer

// Selectors

// https://redux-toolkit.js.org/api/createSelector
// Memoized so `useSelector` doesn't get a new array (and re-render) every
// time any part of the store changes
export const selectAllVacations = createSelector(
  [(state) => state.vacations.listIds, (state) => state.vacations.byId],
  (listIds, byId) => listIds.map((id) => byId[id])
)

export const selectVacationById = (state, id) => state.vacations.byId[id]
