import { List } from "antd-mobile"
import ListCard from "./ListCard"
import { ListCardSkeleton } from "./Skeleton"

export default function SearchResult({ list = [], loading, onClick }) {
	const skeletons = new Array(20).fill(null).map((_, i) => (
		<List.Item key={i}>
			<ListCardSkeleton />
		</List.Item>
	))
	if (loading) {
		return <List>{skeletons}</List>
	}
	return (
		<List>
			{/* data.result */}
			{list.length > 0 &&
				list.map((item) => {
					return (
						<List.Item
							key={item.aid}
							arrow={false}
							onClick={onClick}
						>
							<ListCard item={item} />
						</List.Item>
					)
				})}
		</List>
	)
}
