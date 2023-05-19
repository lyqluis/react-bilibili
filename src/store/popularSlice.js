import { createSlice } from "@reduxjs/toolkit"

const popularSlice = createSlice({
  name: 'find',
  initialState: {
    // find page
    list: [],
    page: 1,
    hasMore: true,
    // weekly
    allWeeklyList: [],
    weekly: [],
    weeklyInfo: {},
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload
    },
    setAllWeeklyList: (state, action) => {
      state.allWeeklyList = action.payload
    },
    setWeekly: (state, action) => {
      state.weekly = action.payload
    },
    setWeeklyInfo: (state, action) => {
      state.weeklyInfo = action.payload
    }
  }
})

// selectors
export const selectPopularState = key => state => state.popular[key]
export const selectList = state => state.popular.list
export const selectPage = state => state.popular.page
export const selectHasMore = state => state.popular.hasMore

// actions
export const {
  setList,
  setPage,
  setHasMore,
  setWeekly,
  setWeeklyInfo,
  setAllWeeklyList,
} = popularSlice.actions

export default popularSlice.reducer