import { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

export default function useQuery() {
  const loaction = useLocation()
  console.log(location)
  const [query, setQuery] = useState(new URLSearchParams(location.search))
  const [_, setSearchParams] = useSearchParams(query) /* eslint-disable-line no-unused-vars */

  useEffect(() => {
    setQuery(new URLSearchParams(location.search))
  }, [loaction])

  return { urlQuery: query, setUrlQuery: setSearchParams }
}