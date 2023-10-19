import axios from "./index"

export const getPlayInfo = (bv) => {
	return axios({
		method: "get",
		url: `/video/${bv}`,
	}).catch((err) => console.log("error", err))
}

export const getMediaUrl = (bv) => `${import.meta.env.VITE_APP_API}/video/${bv}`

export const getVideoInfo = (bv) => {
	return axios({
		method: "get",
		url: `/video/detail`,
		params: {
			id: bv,
		},
	}).catch((err) => console.log("error", err))
}

export const getVideoOnline = (bvid, cid) => {
	return axios({
		method: "get",
		url: `/video/online`,
		params: {
			bvid,
			cid,
		},
	}).catch((err) => console.log("error", err))
}
