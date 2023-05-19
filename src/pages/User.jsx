import useFetch from "../hooks/useFetch"

export default function User() {
	// todo
	const mockFetch = () =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve("get async data")
			}, 3000)
		})
	const { data, loading, finished } = useFetch(mockFetch)
	console.log("hot search data from hook", data)

	return (
		<>
			<h1>User page</h1>
			<p>loading: {loading + ""}</p>
			<p>data:{data}</p>
			<p>finished:{finished + ""}</p>
			{/* {loading && <p>loading</p>}
			{finished && <p>{data}</p>} */}
		</>
	)
}
