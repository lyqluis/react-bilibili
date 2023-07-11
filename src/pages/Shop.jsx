import { useState, useEffect } from "react"
import { getProducts, getMallIndex, getMallIndexProducts } from "../api/mall"
import { InfiniteScroll } from "antd-mobile"
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
import Product from "../components/Porduct"
import { getQueryString, isDef } from "../utils/global"
import { useNavigate } from "react-router-dom"

export default function Shop() {
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

	return (
		<Wrapper>
			<h1>
				shop search
				<SearchBar />
			</h1>

			{/* // todo link to the product page */}
			{/* // change the query of url */}
			<ul className='tabs'>
				{/* // todo loading */}
				{indexData &&
					indexData.tabs?.map((tab) => {
						return (
							<p
								key={tab.name}
								className='tab'
								onClick={() => {
									const query = getQueryString(tab.jumpUrl)
									navigate(`/shop/list?${query}`)
								}}
							>
								{tab.imageUrl && (
									<img
										src={tab.imageUrl}
										alt=''
									/>
								)}
								<span>{tab.name}</span>
							</p>
						)
					})}
				<p className='tab tab-more'>
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
				{products.map((item) => {
					return (
						<Product
							className='item'
							key={item.id}
							product={item}
						/>
					)
				})}
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
	.tabs {
		margin: 10px 0;
		padding: 10px 0;
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
		}
	}

	.products {
	}
`
