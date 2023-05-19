import { createSlice } from "@reduxjs/toolkit"

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    currentIndex: 0
  },
  reducers: {
    changeMenuIndex: (state, action) => {
      state.currentIndex = action.payload ?? state.currentIndex
    }
  }
})

// selectors
// export const selectCurrentM = state => state.menu.currentIndex

// actions
export const { changeMenuIndex } = menuSlice.actions

export default menuSlice.reducer