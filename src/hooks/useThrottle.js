import useLatest from "./useLatest"
import { useEffect, useMemo } from "react"
import { throttle } from "../utils/debounce"

const useThrottle = (fn, wait, options) => {
	const refFn = useLatest(fn)
	wait = wait ?? 1500
	options = options !== null && typeof options === "object" ? options : {}

	const memoizedThrottled = useMemo(
		() => throttle((...args) => refFn.current(...args), wait, options),
		[]
	)

	useEffect(() => {
		return () => memoizedThrottled.cancel()
	}, [])

	return {
		run: memoizedThrottled,
		cancel: memoizedThrottled.cancel,
		flush: memoizedThrottled.flush,
	}
}

export default useThrottle
