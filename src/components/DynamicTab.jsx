import { useState, useEffect } from "react"
import { getUserDynamics } from "../api/user"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, setDynamic } from "../store/userSlice"
import styled from "styled-components"
import Dynamic from "./Dynamic"
import { InfiniteScroll } from "antd-mobile"
// import useRequest from "../hooks/useRequest"
// import { useRequest } from "ahooks"

const DynamicTab = ({ uid }) => {
	const dynamic = useSelector(selectUserState("dynamic"))
	const dispatch = useDispatch()
	const [hasMore, setHasMore] = useState(true)
	// todo can't work with InfiniteScroll component
	// const { data, loading, run, runAsync } = useRequest(
	// 	() => {
	// 		const offsetCard = dynamic.cards?.findLast(
	// 			(c) => c.desc.dynamic_id === dynamic.next_offset
	// 		)
	// 		return getUserDynamics(
	// 			uid,
	// 			dynamic.has_more ? offsetCard.desc.dynamic_id_str : null
	// 		)
	// 	},
	// 	{
	// 		manual: true,
	// 		refreshDeps: [uid],
	// 		// deps: [uid],
	// 	}
	// )

	// // ?? useRequest run 2 times in the infinite scroll
	// useEffect(() => {
	// 	if (!loading && data) {
	// 		const newDynamic = data.data
	// 		const oldCards = dynamic.cards?.slice() ?? []
	// 		newDynamic.cards = oldCards.concat(newDynamic.cards)
	// 		dispatch(setDynamic(newDynamic))
	// 		setHasMore(newDynamic.has_more)
	// 		setReady(false)
	// 	}
	// }, [data, loading])

	const fetchDynamics = async () => {
		try {
			const offsetCard = dynamic.cards?.findLast(
				(c) => c.desc.dynamic_id === dynamic.next_offset
			)
			const res = await getUserDynamics(
				uid,
				dynamic.has_more ? offsetCard.desc.dynamic_id_str : null
			)

			if (res) {
				const newDynamic = res.data
				console.log("get dynamics", newDynamic)
				const oldCards = dynamic.cards?.slice() ?? []
				newDynamic.cards = oldCards.concat(newDynamic.cards)
				dispatch(setDynamic(newDynamic))
				setHasMore(!!newDynamic.has_more)
			}
		} catch (err) {
			console.log(err)
		}
	}

	// DO NOT return loading element, because InfiniteScroll has its own loading,
	// and it does't work if it displays none
	// if (!dynamic.cards?.length) return <p>loading dynmaics</p>

	return (
		<Wrapper>
			{dynamic.cards?.map((d) => {
				if (d) {
					return (
						<Dynamic
							item={d}
							key={d.desc.dynamic_id}
						/>
					)
				}
			})}
			<InfiniteScroll
				loadMore={fetchDynamics}
				hasMore={hasMore}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background: var(--color-background-grey);
`

export default DynamicTab
