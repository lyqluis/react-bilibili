import { createSlice } from "@reduxjs/toolkit"
import { setHistoryKeywords, getHistoryKeywords } from '../utils/store'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    placeholder: '',
    hotSearches: [],
    keyword: '',
    isFocused: false,
    suggestions: [],
    searchData: {},
    historyKeywords: getHistoryKeywords(),
  },
  reducers: {
    setPlaceholder: (state, action) => {
      state.placeholder = action.payload
    },
    setHotSearches: (state, action) => {
      state.hotSearches = action.payload
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
    setIsFocused: (state, action) => {
      state.isFocused = action.payload
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload
    },
    addHistoryKeyword: (state, action) => {
      const word = action.payload
      const index = state.historyKeywords.findIndex(w => w === word)
      if (index > -1) {
        state.historyKeywords.splice(index, 1)
      }
      state.historyKeywords.unshift(word)
      setHistoryKeywords(state.historyKeywords)
    },
    removeHistoryKeyword: (state, action) => {
      state.historyKeywords = setHistoryKeywords(state.historyKeywords.filter(word => word !== action.payload))
    },
    clearHistoryKeywords: (state) => {
      state.historyKeywords = setHistoryKeywords([])
    },
  }
})

// selectors
export const selectSearchState = key => state => state.search[key]

// actions
export const {
  setPlaceholder,
  setHotSearches,
  setKeyword,
  setIsFocused,
  setSuggestions,
  setSearchData,
  addHistoryKeyword,
  removeHistoryKeyword,
  clearHistoryKeywords
} = searchSlice.actions

export default searchSlice.reducer
