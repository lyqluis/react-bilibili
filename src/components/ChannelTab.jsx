import styled from "styled-components"
import { px2vw } from "../utils/style"
import Section from "../components/Section"
import { useSelector, useDispatch } from "react-redux"
import { selectChannelVideos, addChannelsVideos } from "../store/channelSlice"
import Card from "./Card"
import { InfiniteScroll } from "antd-mobile"
import { useState, useEffect, forwardRef } from "react"
import {
	getChannelLatestVidoes,
	getChannelRecommendVidoes,
} from "../api/channel"
import { deduplication } from "../utils/global"
import useFetch from "../hooks/useFetch"
import { CardSkeletonList } from "./Skeleton"

const ChannelTab = forwardRef(({ channel, active }, ref) => {
	const dispatch = useDispatch()
	const channelVideos = useSelector(selectChannelVideos(channel.name))
	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState(0)
	const { data: rcmdData, finished: rcmdFinished } = useFetch(() =>
		getChannelRecommendVidoes(channel.rid)
	)

	const skeletonList = CardSkeletonList(8)

	useEffect(() => {
		const { name } = channel
		if (rcmdFinished) {
			console.log(name, "recommend", rcmdData)
			dispatch(
				addChannelsVideos({
					channel: name,
					section: "recommends",
					data: rcmdData.data,
				})
			)
		}
	}, [rcmdData])

	// const getRecommendVideos = async (channel) => {
	// 	const { rid, name } = channel
	// 	if (!channelsVideos[name]?.recommends?.length) {
	// 		const rcds = await getChannelRecommendVidoes(rid)
	// 		console.log(rid, "recommend", rcds)
	// 		dispatch(
	// 			addChannelsVideos({
	// 				channel: channel.name,
	// 				section: "recommends",
	// 				data: rcds.data,
	// 			})
	// 		)
	// 	}
	// }

	useEffect(() => {
		if (active) {
			window.scrollTo(0, 0)
		}
	}, [active])

	if (!active /* || !channelVideos */) return null

	const { recommends, latests } = channelVideos
	const getLatestVideos = async () => {
		const res = await getChannelLatestVidoes(channel.rid, page + 1)
		console.log(
			channel.rid,
			"latest",
			`page: ${page + 1}`,
			res.data.page,
			res.data.archives
		)
		console.log(deduplication(latests, res.data.archives, "aid"))
		const { data, isDuplicated } = deduplication(
			latests,
			res.data.archives,
			"aid"
		)
		dispatch(
			addChannelsVideos({
				channel: channel.name,
				section: "latests",
				data,
			})
		)
		const { count, num, size } = res.data.page
		setPage(num)
		setHasMore(count - num * size > 0 && !isDuplicated)
	}

	return (
		<Wrapper ref={ref}>
			<Section leftTitle='热门推荐'>
				{recommends.length <= 0
					? skeletonList
					: recommends.slice(0, 8).map((item) => {
							return (
								<Card
									item={item}
									key={item.aid}
								/>
							)
							/* eslint-disable-next-line no-mixed-spaces-and-tabs */
					  })}
			</Section>
			<Section leftTitle='最新视频'>
				{latests.map((item) => {
					return (
						<Card
							item={item}
							key={item.aid}
						/>
					)
				})}
			</Section>
			<InfiniteScroll
				loadMore={getLatestVideos}
				hasMore={hasMore}
			/>
		</Wrapper>
	)
})

const Wrapper = styled.div`
	.section-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${px2vw`10px`};
	}
`

export default ChannelTab
