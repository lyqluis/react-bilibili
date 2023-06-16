import { InfiniteScroll, List } from "antd-mobile"
import { getUserHistory } from "../api/user"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, setHistoryInfo } from "../store/userSlice"
import ListCard from "./ListCard"

const HistoryTab = ({ uid }) => {
	const [inited, setInited] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const historyInfo = useSelector(selectUserState("historyInfo"))
	const dispatch = useDispatch()
	const getHistory = async () => {
		const cursor = historyInfo.cursor
		const res = await getUserHistory(cursor)
		console.log("get user history", res)
		// todo get next page data
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
		!inited && setInited(true)
	}

	return (
		<>
			<List>
				{historyInfo?.list?.length > 0 &&
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
						/* eslint-disable-next-line no-mixed-spaces-and-tabs */
					})}
			</List>
			<InfiniteScroll
				loadMore={getHistory}
				hasMore={hasMore}
			/>
		</>
	)
}

export default HistoryTab
