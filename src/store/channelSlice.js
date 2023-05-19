import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllChannels } from "../api/channel"

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channels: [],
    channelsStatus: 'idl',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    channelsVideos: {},
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
    },
    initChannelsVideos: (state, action) => {
      const channel = action.payload
      const channelVideosObj = state.channelsVideos[channel]
      if (!channelVideosObj) {
        state.channelsVideos[channel] = {
          recommends: [],
          latests: []
        }
      }
    },
    addChannelsVideos: (state, action) => {
      const { channel, section, data } = action.payload
      // const channelVideosObj = state.channelsVideos[channel]
      // if (!channelVideosObj) {
      //   state.channelsVideos[channel] = {
      //     recommends: [],
      //     latests: []
      //   }
      // }
      state.channelsVideos[channel][section] = data
    },
  }
})

// selectors
export const selectChannelState = key => state => state.channel[key]
export const selectChannelVideos = key => state => state.channel.channelsVideos[key]

// actions
export const {
  setChannels,
  initChannelsVideos,
  addChannelsVideos,
} = channelSlice.actions

// thunks
export const getChannels = createAsyncThunk('channel/getChannels', async () => {
  const res = await getAllChannels()
  return res.data
})

export default channelSlice.reducer
