import styled from "styled-components"
import { px2vw } from "../utils/style"
import { getPopular } from "../api/popular"
import { InfiniteScroll } from "antd-mobile"
import { useDispatch, useSelector } from "react-redux"
import {
	selectList,
	selectPage,
	selectHasMore,
	setList,
	setPage,
	setHasMore,
} from "../store/popularSlice"
import Card from "../components/Card"
import { CardSkeletonList } from "../components/Skeleton"

const skeletons = CardSkeletonList(10)

export default function Find() {
	const list = useSelector(selectList)
	const page = useSelector(selectPage)
	const hasMore = useSelector(selectHasMore)

	const dispatch = useDispatch()
	const loadMore = async () => {
		console.log("page:", page)
		const res = await getPopular(page)
		const { list: dataList, no_more } = res.data
		dispatch(setList([...list, ...dataList]))
		dispatch(setHasMore(!no_more))
		if (!no_more) {
			dispatch(setPage(page + 1))
		}
	}

	if (list.length === 0) {
		loadMore()
		return (
			<Wrapper>
				<div className='video-list'>{skeletons}</div>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<div className='video-list'>
				{list.map((item) => {
					return (
						<Card
							item={item}
							key={item.aid}
						/>
					)
				})}
			</div>
			<InfiniteScroll
				loadMore={loadMore}
				hasMore={hasMore}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	min-height: 100vh; // todo

	.video-list {
		padding: 10px;
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: ${px2vw`10px`};
	}
`
