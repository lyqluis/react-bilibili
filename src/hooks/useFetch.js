import { useState, useEffect } from "react"

// todo combine with redux
export default function useFetch(fetchData) {
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [data, setData] = useState(null)

  const fetch = async () => {
    try {
      setLoading(true)
      setFinished(false)
      const res = await fetchData()
      console.log(fetchData.name, res)
      setData(res)
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
    setFinished(true)
  }

  useEffect(() => {
    let ignore = false
    if (!ignore) fetch()
    return () => {
      ignore = true
    }
  }, [])


  return { loading, data, finished }
}