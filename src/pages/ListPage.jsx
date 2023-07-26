import styled from "styled-components"
import PageLayout from "../layout/PageLayout"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCollection, setCollectionContent } from "../store/userSlice"
import { useNavigate, useParams } from "react-router-dom"
import { InfiniteScroll } from "antd-mobile"
import Card from "../components/Card"
import { getFavContent } from "../api/user"
import { px2vw } from "../utils/style"
import { PAGE_SIZE } from "../utils/global"
import Header from "../components/Header"

const ListPage = () => {
	const [loading, setLoading] = useState(true)
	const { userId, fav_id } = useParams()
	const collection = useSelector(selectCollection(fav_id))
	const currentPage = Math.ceil(
		(collection?.content?.medias?.length ?? 0) / PAGE_SIZE
	)
	const [page, setPage] = useState(currentPage + 1)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const fetchCollection = async (id) => {
		setLoading(true)
		const res = await getFavContent(id, PAGE_SIZE, page)
		console.log("get fav", id, page, res)
		const list = collection.content.medias.slice()
		list.push(...res.data.medias)
		dispatch(
			setCollectionContent({ id, content: { ...res.data, medias: list } })
		)
		setPage((prev) => prev + 1)
		setLoading(false)
	}

	// when enter the page through url, navigate to the user page
	useEffect(() => {
		if (!collection) {
			navigate(`/user/${userId}`)
		}
	}, [userId, fav_id])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (collection) {
		return (
			<Wrapper>
				<PageLayout
					header={
						<Header
							title={collection.title}
							onClickLeft={() => navigate(-1)}
						/>
					}
				>
					<div className='video-list'>
						{collection?.content?.medias.map((item) => {
							return (
								<Card
									key={item.aid}
									item={item}
								/>
							)
						})}
					</div>
					<InfiniteScroll
						loadMore={() => fetchCollection(parseInt(fav_id))}
						hasMore={collection?.content?.has_more}
					/>
				</PageLayout>
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	.video-list {
		padding: 10px;
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: ${px2vw`10px`};
	}
`

export default ListPage
