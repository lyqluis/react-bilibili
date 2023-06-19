import { useState } from "react"
import { getUserVideos } from "../api/user"
import { InfiniteScroll, List } from "antd-mobile"
import ListCard from "./ListCard"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, setVideos } from "../store/userSlice"

const VideoTab = ({ uid }) => {
	const dispatch = useDispatch()
	const videos = useSelector(selectUserState("videos"))
	const pageInfo = videos?.page
	let [count, ps, pn] = [0, 30, 0]
	if (pageInfo) {
		count = pageInfo.count
		ps = pageInfo.ps
		pn = pageInfo.pn
	}
	const [page, setPage] = useState(pn)
	const [hasMore, setHasMore] = useState(count ? count > ps * pn : true)

	const fecthUserVideos = async () => {
		const res = await getUserVideos({
			mid: uid,
			pn: page + 1,
			// ps: 50,
			// order: "click",
			// keyword: "",
			// gaia_source: "m_station",
			// platform: "h5",
		})
		console.log("get user videos", res)
		dispatch(setVideos(res.data))
		const { count, ps, pn } = res.data.page
		setPage(pn)
		setHasMore(count > ps * pn)
	}

	return (
		<>
			<List>
				{videos.list?.vlist?.length > 0 &&
					videos.list.vlist.map((item) => {
						return (
							<List.Item
								key={item.aid}
								arrow={false}
								// todo onClick={onClick}
							>
								<ListCard item={item} />
							</List.Item>
						)
					})}
			</List>
			<InfiniteScroll
				loadMore={fecthUserVideos}
				hasMore={hasMore}
			/>
		</>
	)
}

export default VideoTab
