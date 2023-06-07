import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setLocalIsLoggedIn } from "../utils/store"
import { getLoginInfo } from "../api/login"

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    qrcode: {
      key: null,
      url: null,
      img: null,
    },
    fetchLoginInfoStatus: 'idle', // loading | successed | failed
    isLoggedIn: null,
    authInfo: {},
    historyInfo: {},
  },
  reducers: {
    setQrcode: (state, action) => {
      state.qrcode = action.payload
    },
    setFetchLoginInfoStatus: (state, action) => {
      state.fetchLoginInfoStatus = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
      setLocalIsLoggedIn(action.payload)
    },
    setAuthInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLoginInfo.pending, (state, action) => {
        state.fetchLoginInfoStatus = 'loading'
      })
      .addCase(fetchLoginInfo.fulfilled, (state, action) => {
        state.fetchLoginInfoStatus = 'successed'
        console.log('builder', action.payload)
        const { isLogin } = action.payload
        state.isLoggedIn = isLogin
        setLocalIsLoggedIn(isLogin)
        state.authInfo = action.payload
      })
  }
})

export const selectAuthState = key => state => state.auth[key]

export const {
  setQrcode,
  setFetchLoginInfoStatus,
  setIsLoggedIn,
  setAuthInfo,
} = authSlice.actions

export const fetchLoginInfo = createAsyncThunk('user/fetchLoginInfo', async (_, { getState }) => {
  const state = getState().auth
  // if (state.fetchLoginInfoStatus === 'idle') {
  const res = await getLoginInfo()
  return res.data
  // }
})

export default authSlice.reducer