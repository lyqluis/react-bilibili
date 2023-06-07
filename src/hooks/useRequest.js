import { useState, useEffect, useCallback } from "react"

const useRequest = (fetchFn, options) => {
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)

  const {
    manual = false,
    // initialData = null,
    pollingInterval = 0,
    deps = []
  } = options

  useEffect(() => {
    if (!manual) {
      request()
    }
  }, [manual, ...deps])

  const request = async () => {
    try {
      setLoading(true)
      setFinished(false)
      // todo pollinginterval timeout
      const res = await fetchFn()
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

  // 缓存
  const cachedData = useCallback(() => data, [data])

  return { loading, data, finished, err, request, cachedData }
}

export default useRequest