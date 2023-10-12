import axios from "./index"

export const getVideoInfo = (bv) => {
	return axios({
		method: "get",
		url: `/video/${bv}`,
	}).catch((err) => console.log("error", err))
}

export const getMediaUrl = bv => `${import.meta.env.VITE_APP_API}/video/${bv}`