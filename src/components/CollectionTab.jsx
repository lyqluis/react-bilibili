import { Collapse } from "antd-mobile"
import { getFavContent, getUserFavorites } from "../api/user"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	selectUserState,
	setCollectionList,
	setCollectionContent,
} from "../store/userSlice"
import Card from "./Card"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import { CardSkeletonList } from "./Skeleton"
import Icon from "./Icon"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import useRequest from "../hooks/useRequest"

const skeletons = CardSkeletonList(2)

const CollectionTab = () => {
	const location = useLocation()
	const [loading, setLoading] = useState(null)
	const userInfo = useSelector(selectUserState("userInfo"))
	const collectionList = useSelector(selectUserState("collectionList"))
	const { userId } = useParams()
	const {
		data: favouriteData,
		finished: favouriteDataFinished,
		request: fetchFavs,
	} = useRequest(() => getUserFavorites(parseInt(userId)), {
		manual: true,
		deps: [userId],
	})
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const fetchCollection = async (id) => {
		const collection = collectionList.find((c) => c.id === id)
		console.log(collection)
		if (collection?.content?.medias?.length) return
		setLoading(true)
		const res = await getFavContent(id, 5)
		console.log("get fav", id, res)
		dispatch(setCollectionContent({ id, content: res.data }))
		setLoading(false)
	}

	useEffect(() => {
		if (!collectionList.length || userId != userInfo?.card?.mid) {
			fetchFavs()
		}
	}, [userId])

	useEffect(() => {
		if (favouriteDataFinished) {
			const list = favouriteData.data.list
			dispatch(setCollectionList(list))
		}
	}, [favouriteData, favouriteDataFinished])

	return (
		<Wrapper>
			<Collapse
				accordion
				onChange={(id) => {
					if (id) {
						fetchCollection(parseInt(id))
					}
				}}
			>
				{collectionList?.length > 0 &&
					collectionList.map((collection) => {
						return (
							<Collapse.Panel
								key={collection.id}
								title={
									<LeftTitle>
										<Icon
											name='collection'
											className='left-title-svg'
										/>
										<p className='left-title'>
											{collection.title}
											<span> ({collection.media_count})</span>
										</p>
									</LeftTitle>
								}
							>
								<div className='card-wrapper'>
									{loading
										? skeletons
										: collection.content?.medias?.slice(0, 5).map((item) => (
												<Card
													key={item.id}
													item={item}
												/>
												/* eslint-disable-next-line no-mixed-spaces-and-tabs */
										  ))}
									{collection.content?.has_more && (
										<Link
											className='card-more'
											onClick={(e) => {
												e.preventDefault()
												let path = location.pathname
												if (!path.includes("favorite")) path += "/favorite"
												navigate(`${path}/${collection.id}`)
											}}
										>
											<Icon
												name='more'
												className='card-more-svg'
											/>
										</Link>
									)}
								</div>
							</Collapse.Panel>
						)
					})}
			</Collapse>
		</Wrapper>
	)
}
const LeftTitle = styled.div`
	display: flex;
	.left-title-svg {
		width: var(--font-size-m);
		height: var(--font-size-m);
		margin-right: 5px;
	}
	.left-title {
		font-size: var(--font-size-xm);
		span {
			color: var(--color-font-grey);
		}
	}
`

const Wrapper = styled.div`
	.adm-collapse-panel-content {
		color: inherit;
		.adm-list-item {
			padding: 0;
			.adm-list-item-content {
				padding: 0;
				.adm-list-item-content-main {
					overflow-x: auto;
					display: flex;
				}
			}
		}
	}

	.card-wrapper {
		display: flex;
		padding: 0 ${px2vw`10px`};

		& > *,
		.video-list-item {
			flex: none;
			margin-right: 10px;
			width: ${px2vw`172.5px`};

			&:last-child {
				margin-right: 0;
			}
		}

		.card-more {
			width: 30px;
			display: grid;
			align-items: center;
			&-svg {
				color: var(--color-font-grey);
			}
		}
	}
`

export default CollectionTab
