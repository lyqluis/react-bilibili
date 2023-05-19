import { createSlice } from "@reduxjs/toolkit";

const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    channelRanks: {}
  },
  reducers: {
    initChannelRank: (state, action) => {
      const channel = action.payload
      const channelVideosObj = state.channelRanks[channel]
      if (!channelVideosObj) {
        state.channelRanks[channel] = []
      }
    },
    setChannelRank: (state, action) => {
      const { channel, data } = action.payload
      state.channelRanks[channel] = data
    }
  }
})

export const selectChannelRank = key => state => state.rank.channelRanks[key]

export const {
  setChannelRank
} = rankSlice.actions

export default rankSlice.reducer
