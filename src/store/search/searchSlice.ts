import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface SearchState {
  searchInput: string
  issueState: string
}

const initialState = {
  searchInput: '',
  issueState: 'state:open state:closed',
} as SearchState

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearchInput: (state) => {
      return { ...state, searchInput: '' }
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      return { ...state, searchInput: action.payload }
    },
    setIssueState: (state, action: PayloadAction<string>) => {
      return { ...state, issueState: action.payload }
    },
  },
})

export const { resetSearchInput, setSearchInput, setIssueState } =
  searchSlice.actions

export const selectSearchInput = (state: RootState) => state.search.searchInput
export const selectState = (state: RootState) => state.search.issueState

export default searchSlice.reducer
