import { useState, useEffect, useMemo } from "react"
import { getMallIndex, getMallIndexProducts } from "../api/mall"
import { Image, InfiniteScroll } from "antd-mobile"
import { SearchBar } from "antd-mobile"
import { useDispatch, useSelector } from "react-redux"
import {
	selectMallState,
	selectMallIndexProducts,
	setIndex,
	setIndexProducts,
} from "../store/mallSlice"
import useRequest from "../hooks/useRequest"
import styled from "styled-components"
import Icon from "../components/Icon"
import WaterFall from "../components/WaterFall"
import ProductCard from "../components/ProductCard"
import { getQueryString, isDef } from "../utils/global"
import { useNavigate } from "react-router-dom"
import { ShopTabImgSkeleton, ShopTabSkeletonList } from "../components/Skeleton"
import ShopSearch from "../components/ShopSearch"
import { px2vw } from "../utils/style"

const tabsSkeletonList = ShopTabSkeletonList(6)

export default function Shop() {
	const [isSearch, setIsSearch] = useState(false)
	const indexData = useSelector(selectMallState("index"))
	const products = useSelector(selectMallIndexProducts)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		data,
		finished,
		request: fetchMallIndex,
	} = useRequest(getMallIndex, { manual: true })

	const [hasMore, setHasMore] = useState(false)
	const [page, setPage] = useState(indexData?.feeds?.pageNum ?? 1)
	const [isRenderFinished, setIsRenderFinished] = useState(false)
	const loadMore = async () => {
		const res = await getMallIndexProducts(page + 1)
		console.log("loadmore", page, res)
		dispatch(setIndexProducts(res.data.vo))
		setPage((prev) => res.data?.vo?.pageNum ?? prev + 1)
	}

	useEffect(() => {
		if (!isDef(indexData)) {
			fetchMallIndex()
		}
	}, [indexData])

	useEffect(() => {
		if (finished) {
			const vo = data.data.vo
			dispatch(setIndex(vo))
		}
	}, [data, finished])

	const productList = useMemo(() => {
		return products.map((item) => {
			return (
				<ProductCard
					className='item'
					key={item.id}
					product={item}
				/>
			)
		})
	}, [products])

	if (isSearch) {
		return (
			<Wrapper>
				<ShopSearch onBack={() => setIsSearch(false)} />
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<div className='index-header'>
				<div className='left-logo'>会员购</div>
				<SearchBar
					showCancelButton
					onFocus={() => setIsSearch(true)}
				/>
				<div className='right-logo'>
					<Icon
						name='cart'
						className='svg'
					/>
				</div>
			</div>

			<ul className='tabs'>
				{indexData?.tabs?.length > 0
					? indexData.tabs
							?.filter((tab) => /category=/.test(tab.jumpUrl))
							.map((tab) => {
								return (
									<div
										key={tab.name}
										className='tab'
										onClick={() => {
											const query = getQueryString(tab.jumpUrl)
											console.log(query)
											if (/category=/.test(query)) {
												navigate(`/shop/list?${query}`)
											}
											// todo no category page
										}}
									>
										{tab.imageUrl && (
											<Image
												lazy
												fit='cover'
												width='100%'
												src={`${tab.imageUrl}@1c.webp`}
												placeholder={<ShopTabImgSkeleton />}
											/>
										)}
										<span>{tab.name}</span>
									</div>
								)
							})
					: tabsSkeletonList.map((skeleton) => skeleton)}
				<p
					className='tab tab-more'
					onClick={() => navigate("/shop/allcategory")}
				>
					<Icon
						name='more'
						className='tab-more-svg'
					/>
					<span>全部分类</span>
				</p>
			</ul>

			<WaterFall
				onRender={() => setIsRenderFinished(false)}
				onRenderFinished={() => {
					setIsRenderFinished(true)
					setHasMore(true)
				}}
			>
				{productList}
			</WaterFall>

			{isRenderFinished && (
				<InfiniteScroll
					loadMore={loadMore}
					hasMore={hasMore}
				/>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.index-header {
		background: var(--color-background);
		padding: ${px2vw`10px`};
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left-logo {
			font-size: var(--font-size-l);
			font-weight: 500;
			color: var(--color-main);
			margin-right: 10px;
		}
		.right-logo {
			margin-left: 10px;
			display: flex;
			align-items: center;
			.svg {
				width: var(--font-size-xl);
			}
		}
		.adm-search-bar {
			flex: auto;
		}
	}

	.tabs {
		margin: 10px 0;
		padding: 0 5px;
		display: flex;
		overflow: auto;
		.tab {
			margin: 0 5px;
			flex: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 50px;
			font-size: var(--font-size-s);
			img {
				width: 100%;
			}
			&-more {
				width: auto;
				justify-content: flex-end;
				&-svg {
					height: 50px;
				}
			}

			.tab-img-skeleton {
				width: 100%;
				height: 50px;
				border-radius: 50%;
			}
			.tab-title-skeleton {
				margin: 0;
				margin-top: 2px;
				width: 100%;
				height: var(--font-size-s);
			}
		}

		/* scrollbar */
		::-webkit-scrollbar {
			display: none;
		}
		scrollbar-width: none;
	}

	.products {
	}
`
