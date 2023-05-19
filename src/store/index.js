import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../components/Menu/slice'
import popularReducer from './popularSlice'
import searchReducer from './searchSlice'
import channelReducer from './channelSlice'
import rankReducer from './rankSlice'

export default configureStore({
  reducer: {
    menu: menuReducer,
    popular: popularReducer,
    search: searchReducer,
    channel: channelReducer,
    rank: rankReducer,
  }
})