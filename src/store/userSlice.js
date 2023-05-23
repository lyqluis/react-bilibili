import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getLocalIsLoggedIn, setLocalIsLoggedIn } from "../utils/store"
import { isDef } from "../utils/global"
import { getLoginInfo } from "../api/login"

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // todo remove to a global slice
    qrcode: {
      key: null,
      url: null,
      img: null,
    },
    isLoggedIn: null,
    userInfo: {},
  },
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
  },
  extraReducers: builder => {
    builder.addCase(fetchLoginInfo.fulfilled, (state, action) => {
      console.log('builder', action.payload)
      const { isLogin } = action.payload
      state.isLoggedIn = isLogin
      setLocalIsLoggedIn(isLogin)
      state.userInfo = action.payload
    })
  }
})

export const selectUserState = key => state => state.user[key]

export const {
  setQrcode,
  setIsLoggedIn,
  setUserInfo,
} = userSlice.actions

export const fetchLoginInfo = createAsyncThunk('user/fetchLoginInfo', async () => {
  const res = await getLoginInfo()
  return res.data
})

export default userSlice.reducer