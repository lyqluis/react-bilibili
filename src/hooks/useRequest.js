import { useState, useEffect, useMemo } from "react"

const defaultOptions = {
	manual: false,
	ready: true,
	params: [],
	pollingInterval: 0,
	deps: [],
}

const useRequest = (fetchFn, options) => {
	const [loading, setLoading] = useState(false)
	const [finished, setFinished] = useState(false)
	const [data, setData] = useState(null)
	const [err, setErr] = useState(null)

	// todo optimize options
	options = Object.assign(defaultOptions, options)
	const { manual, params, ready, pollingInterval, deps } = options

	const request = async () => {
		try {
      // debugger
			setLoading(true)
			setFinished(false)
			setErr(null)
			// todo pollinginterval timeout
			const res = await fetchFn(...params)
			console.log(fetchFn.name, res)
			setData(res)
		} catch (err) {
			console.log(JSON.stringify(err))
			setErr(err)
		} finally {
			setLoading(false)
			setFinished(true)
		}
	}

	useEffect(() => {
		if (!manual) {
			request()
		}
	}, [manual, ...deps])

	// 缓存
	// const cachedData = useCallback(() => data, [data])
	const cachedData = useMemo(() => data, [data])

	return { loading, data, finished, err, request, cachedData }
}

export default useRequest
