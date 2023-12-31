import { isDef } from "./global"

export const getStore = (key, defaultVal = {}) => {
	const val = localStorage.getItem(key)
	// console.log("get localstorage", key, val)
	if (isDef(val)) {
		return JSON.parse(val)
	} else {
		return setStore(key, defaultVal)
	}
}

export const setStore = (key, val) => {
	localStorage.setItem(key, JSON.stringify(val))
	return val
}

export const setHistoryKeywords = (val = []) => setStore("history_search", val)
export const getHistoryKeywords = () => getStore("history_search", [])

export const setMallHistoryKeywords = (val = []) =>
	setStore("mall_history_search", val)
export const getMallHistoryKeywords = () => getStore("mall_history_search", [])

export const setLocalCart = (val = []) => setStore("mall_cart", val)
export const getLocalCart = () => getStore("mall_cart", [])

export const setLocalIsLoggedIn = (val = false) => setStore("is_logged_in", val)
export const getLocalIsLoggedIn = () => getStore("is_logged_in")

export const setLocalRefreshToken = (val) => setStore("ac_time_value", val)
export const getLocalRefreshToken = () => getStore("ac_time_value", "")
