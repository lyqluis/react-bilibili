import { createSlice } from "@reduxjs/toolkit"
import { setLocalIsLoggedIn } from "../utils/store"

const initialState = {
	userInfo: {},
	stat: {},
	historyInfo: {},
	collectionList: [],
	dynamic: {},
	videos: {},
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
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
			const collection = state.collectionList.find((c) => c.id === id)
			collection.content = content
		},
		setDynamic: (state, action) => {
			state.dynamic = action.payload
		},
		setVideos: (state, action) => {
			const newListObj = action.payload.list
			const oldListObj = state.videos?.list
			const listObj = {}
			if (oldListObj) {
				for (const list in oldListObj) {
					if (Array.isArray(oldListObj[list])) {
						listObj[list] = oldListObj[list].slice().concat(newListObj[list])
					} else {
						listObj[list] = oldListObj[list]
					}
				}
				action.payload.list = listObj
			}
			state.videos = action.payload
		},
		resetUserState: () => initialState,
	},
})

export const selectUserState = (key) => (state) => state.user[key]
export const selectCollection = (id) => (state) =>
	state.user.collectionList.find((c) => c.id == id)

export const {
	setUserInfo,
	setStat,
	setHistoryInfo,
	setCollectionList,
	setCollectionContent,
	resetUserState,
	setDynamic,
	setVideos,
} = userSlice.actions

export default userSlice.reducer
