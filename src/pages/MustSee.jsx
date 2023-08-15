import { useEffect } from "react"
import { getMustSee } from "../api/popular"
import useFetch from "../hooks/useFetch"
import { useDispatch, useSelector } from "react-redux"
import { selectPopularState, setMustSeeList } from "../store/popularSlice"
import { List } from "antd-mobile"
import ListCard from "../components/ListCard"
import { ListCardSkeleton } from "../components/Skeleton"

const skeletons = new Array(10).fill(null).map((_, i) => (
	<List.Item key={i}>
		<ListCardSkeleton />
	</List.Item>
))

const MustSee = () => {
	const mustSeeList = useSelector(selectPopularState("mustSeeList"))
	const { data, finished } = useFetch(getMustSee, mustSeeList)
	const dispatch = useDispatch()

	useEffect(() => {
		if (finished) {
			dispatch(setMustSeeList(data.data.list))
		}
	}, [data])

	if (!mustSeeList.length) return <List>{skeletons}</List>

	return (
		<List>
			{mustSeeList?.length > 0 &&
				mustSeeList.map((item) => {
					return (
						<List.Item
							key={item.aid}
							arrow={false}
							// onClick={onClick}
						>
							<ListCard item={item} />
						</List.Item>
					)
				})}
		</List>
	)
}

export default MustSee
