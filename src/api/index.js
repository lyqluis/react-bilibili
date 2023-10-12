import axios from "axios"

export const mockAxios = axios.create({
	baseURL: "/mockapi",
	timeout: 10000, // 超时时间 10s
	withCredentials: true, // 跨域时候允许携带凭证
})

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_API,
	timeout: 10000, // 超时时间 10s
	withCredentials: true, // 跨域时候允许携带凭证
})

// interceptors
// axiosInstance.interceptors.request.use()
axiosInstance.interceptors.response.use((res) => {
	if (res.headers["content-type"] === "application/octet-stream") {
		return res
	}
	return res.data
})

export default axiosInstance
