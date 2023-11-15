import { useRef } from "react"

const useLastest = (value) => {
	const ref = useRef(value)
	ref.current = value

	return ref
}

export default useLastest
