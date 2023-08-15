import { createSlice } from "@reduxjs/toolkit"
import { getLocalCart, setLocalCart } from "../utils/store"
import { clamp } from "../utils/global"

const initialState = {
	index: {},
	productsInfo: {},
	productsList: [],
	allFilterList: {},
	allCategories: [],
	cart: getLocalCart(),
}

const mallSlice = createSlice({
	name: "mall",
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
		setAllCategories: (state, action) => {
			state.allCategories = action.payload
			state.allCategories = action.payload
		},
		addToCart: (state, action) => {
			const newItem = action.payload
			const newCart = state.cart.slice()
			const oldItem = newCart.find((p) => p.id == newItem.id)
			if (oldItem) {
				oldItem.number += newItem.number
				oldItem.number = clamp(
					oldItem.number,
					0,
					Math.min(newItem.picker.stock, newItem.productInfo.restriction)
				)
			} else {
				newCart.push(newItem)
			}
			state.cart = newCart
			setLocalCart(newCart)
		},
		changeCartItem: (state, action) => {
			const newItem = action.payload
			const index = state.cart.findIndex((p) => p.id == newItem.id)
			const newCart = state.cart.toSpliced(index, 1, newItem)
			state.cart = newCart
			setLocalCart(newCart)
		},
		setCart: (state, action) => {
			const newCart = (state.cart = action.payload)
			setLocalCart(newCart)
		},
		setProductsList: (state, action) => {
			state.productsList = action.payload
		},
		setIndexProducts: (state, action) => {
			const oldList = state.index.feeds?.list
			const newList = []
			// 去重
			const { list } = action.payload
			list.map((item) => {
				if (!oldList.find((p) => p.id === item.id)) {
					newList.push(item)
				}
			})
			action.payload.list = [...oldList, ...newList]
			state.index = {
				...state.index,
				feeds: { ...state.index.feeds, ...action.payload },
			}
		},
		resetMallState: () => initialState,
	},
})

export const selectMallState = (key) => (state) => state.mall[key]
export const selectMallCartCount = (state) =>
	state.mall.cart.reduce((a, b) => a + b?.number ?? 0, 0)
export const selectMallIndexProducts = (state) =>
	state.mall.index?.feeds?.list ?? []

export const {
	setIndex,
	setProductsInfo,
	setProductsList,
	setIndexProducts,
	resetMallState,
	setAllFilterList,
	setAllCategories,
	setCart,
	addToCart,
	changeCartItem,
} = mallSlice.actions

export default mallSlice.reducer
