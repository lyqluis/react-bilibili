import { InfiniteScroll, List } from "antd-mobile"
import { getUserHistory } from "../api/user"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, setHistoryInfo } from "../store/userSlice"
import ListCard from "./ListCard"

const HistoryTab = () => {
	let inited = false
	const [loading, setLoading] = useState(null)
	const [hasMore, setHasMore] = useState(true)
	const historyInfo = useSelector(selectUserState("historyInfo"))
	const dispatch = useDispatch()
	const getHistory = async () => {
		if (loading === null) {
			setLoading(true)
		}
		const cursor = historyInfo.cursor
		const res = await getUserHistory(cursor)
		console.log("get user history", res)
		const { list, cursor: newCursor, tabs } = res.data
		const newList = historyInfo?.list?.slice() ?? []
		newList.push(...list)
		dispatch(
			setHistoryInfo({
				...historyInfo,
				cursor: newCursor,
				list: newList,
				tabs,
			})
		)
		if (newCursor.max === 0) setHasMore(false) // cursor: {max: 0, view_at: 0, business: "", ps: 0}
		setLoading(false)
		inited = true
	}

	// const { data: history, finished: historyFinished } = useFetch(
	// 	getUserHistory,
	// 	historyInfo
	// )
	// useEffect(() => {
	// 	if (historyFinished) {
	// 	}
	// }, [history, historyFinished])

	if (inited) {
		return (
			<>
				<List>
					{historyInfo.list?.length > 0 &&
						historyInfo.list.map((item) => {
							return (
								<List.Item
									key={item.aid ?? item.kid}
									arrow={false}
									// onClick={onClick}
								>
									<ListCard
										item={item}
										isHistory
									/>
								</List.Item>
							)
						})}
				</List>
				<InfiniteScroll
					loadMore={getHistory}
					hasMore={hasMore}
				/>
			</>
		)
	}
}

export default HistoryTab
