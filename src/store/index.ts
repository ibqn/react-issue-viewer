import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './local-storage'

import throttle from 'lodash.throttle'

import searchReducer from './search/searchSlice'

const persistedState = loadState()

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  preloadedState: persistedState,
})

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000)
)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
