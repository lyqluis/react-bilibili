import { List } from "antd-mobile"
import useFetch from "../hooks/useFetch"
import { getRank } from "../api/rank"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setChannelRank, selectChannelRank } from "../store/rankSlice"
import ListCard from "./ListCard"
import styled from "styled-components"
import { ListCardSkeleton } from "./Skeleton"

export default function RankTab({ channel, onClick }) {
	const { data, finished } = useFetch(() =>
		getRank(channel.rid > 0 ? channel.rid : "")
	)
	const rankList = useSelector(selectChannelRank(channel.name))
	const dispatch = useDispatch()

	useEffect(() => {
		const { name } = channel
		if (finished) {
			dispatch(
				setChannelRank({
					channel: name,
					data: data.data.list,
				})
			)
		}
	}, [data])

	// skeleton
	const skeletons = new Array(20).fill(null).map((_, i) => (
		<List.Item key={i}>
			<span className='rank-num'>{i + 1}</span>
			<ListCardSkeleton />
		</List.Item>
	))

	if (!finished)
		return (
			<Wrapper>
				<List>{skeletons}</List>
			</Wrapper>
		)

	return (
		<Wrapper>
			<List>
				{rankList?.length > 0 &&
					rankList.map((item, i) => {
						return (
							<List.Item
								key={item.aid}
								arrow={false}
								onClick={onClick}
							>
								<span className='rank-num'>{i + 1}</span>
								<ListCard item={item} />
							</List.Item>
						)
					})}
			</List>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.adm-list-body {
		border-top: none;
	}

	.adm-list-item-content-main {
		display: grid;
		grid-template-columns: 15px 1fr;
		grid-gap: 5px;
	}

	.rank-num {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: var(--font-size-xm);
		font-style: italic;
		color: var(--color-font-grey);
	}

	.adm-list-item {
		&:nth-child(1),
		&:nth-child(2),
		&:nth-child(3) {
			.rank-num {
				font-weight: 600;
				color: var(--color-main-5);
			}
		}
	}
`
