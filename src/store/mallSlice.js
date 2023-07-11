import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: {},
  productsInfo: {},
  productsList: [],
  allFilterList: {},
}

const mallSlice = createSlice({
  name: 'mall',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload
    },
    setProductsInfo: (state, action) => {
      state.productsInfo = action.payload
    },
    setAllFilterList: (state, action) => {
      state.allFilterList = action.payload
    },
    // setCategoryList: (state, action) => {
    //   state.kindList = action.payload
    // },
    // setIpList: (state, action) => {
    //   state.ipList = action.payload
    // },
    // setBrandList: (state, action) => {
    //   state.brandList = action.payload
    // },
    setProductsList: (state, action) => {
      state.productsList = action.payload
    },
    setIndexProducts: (state, action) => {
      const oldList = state.index.feeds?.list
      const newList = []
      // 去重
      const { list } = action.payload
      list.map(item => {
        if (!oldList.find(p => p.id === item.id)) {
          newList.push(item)
        }
      })
      action.payload.list = [...oldList, ...newList]
      state.index = { ...state.index, feeds: { ...state.index.feeds, ...action.payload } }
    },
    resetMallState: () => initialState
  },
})

export const selectMallState = key => state => state.mall[key]
export const selectMallIndexProducts = state => state.mall.index?.feeds?.list ?? []

export const {
  setIndex,
  setProductsInfo,
  setProductsList,
  setIndexProducts,
  resetMallState,
  setAllFilterList,
} = mallSlice.actions

export default mallSlice.reducer
