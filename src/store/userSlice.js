import { createSlice } from "@reduxjs/toolkit"
import { setLocalIsLoggedIn } from "../utils/store"

const initialState = {
  userInfo: {},
  stat: {},
  historyInfo: {},
  collectionList: [],
  dynamic: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setQrcode: (state, action) => {
      state.qrcode = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
      setLocalIsLoggedIn(action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setStat: (state, action) => {
      state.stat = action.payload
    },
    setHistoryInfo: (state, action) => {
      state.historyInfo = action.payload
    },
    setCollectionList: (state, action) => {
      state.collectionList = action.payload
    },
    setCollectionContent: (state, action) => {
      const { id, content } = action.payload
      const collection = state.collectionList.find(c => c.id === id)
      collection.content = content
    },
    setDynamic: (state, action) => {
      state.dynamic = action.payload
    },
    resetUserState: () => initialState
  },
})

export const selectUserState = key => state => state.user[key]
export const selectCollection = id => state => state.user.collectionList.find(c => c.id == id)

export const {
  setQrcode,
  setIsLoggedIn,
  setUserInfo,
  setStat,
  setHistoryInfo,
  setCollectionList,
  setCollectionContent,
  resetUserState,
  setDynamic,
} = userSlice.actions

export default userSlice.reducer