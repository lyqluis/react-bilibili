import PageLayout from "../layout/PageLayout"
import styled from "styled-components"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { getFilterObj, formateFilter } from "../utils/mallHelper"
import { transObjToQuery } from "../utils/global"
import { getProducts } from "../api/mall"
import WaterFall from "../components/WaterFall"
import { useDispatch, useSelector } from "react-redux"
import {
	selectMallState,
	setProductsInfo,
	setProductsList,
} from "../store/mallSlice"
import Product from "../components/Porduct"
import FilterBar from "../components/FilterBar"
import { InfiniteScroll } from "antd-mobile"
import Header from "../components/Header"

const defaultFilter = {
	keyword: "",
	filters: {},
	priceFlow: "",
	priceCeil: "",
	sortType: "totalrank", // 排序，totalrank | sale | price | pubtime, 综合｜销量｜价格｜新品
	sortOrder: "", // 配合 sortType: 'price' 使用，desc | asc, 价格降序｜价格升序
	userId: "",
	state: "",
	scene: "", // PC_list | figure | ''
	termQueries: [], // required，获取商品数据必须的查询参数
	rangeQueries: [],
	// from: "pc_show",
	msource: "",
}

const defaultPageState = {
	pageIndex: 1, // 页数
	pageSize: 32, // page size, default: 32
}

const ShopList = () => {
	const filterBarRef = useRef(null)
	const inited = useRef(null)
	const location = useLocation()
	const navigate = useNavigate()
	const [urlQuery, setUrlQuery] = useSearchParams()
	const dispatch = useDispatch()
	const [filter, setFilter] = useState(defaultFilter)
	const [pageState, setPageState] = useState(defaultPageState)
	const pageInfo = useSelector(selectMallState("productsInfo"))
	const products = useSelector(selectMallState("productsList"))

	const [isRenderFinished, setIsRenderFinished] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	const fetchProducts = async (extraFilter) => {
		let res = await getProducts({ ...filter, ...pageState, ...extraFilter })
		console.log("fetch products", res, pageState)
		res = res.data
		const page = res.pageIndex
		const info = {}
		for (const key in res) {
			if (key === "list") {
				if (page <= 1) {
					dispatch(setProductsList(res[key]))
				} else {
					dispatch(setProductsList([...products, ...res[key]]))
				}
			} else {
				info[key] = res[key]
			}
		}
		dispatch(setProductsInfo(info))
		setHasMore(info.hasNextPage)
		if (info.hasNextPage) {
			setPageState((prev) => {
				return {
					...prev,
					pageIndex: res.pageIndex ? res.pageIndex + 1 : prev.pageIndex + 1,
				}
			})
		}
	}
	const loadMore = async () => {
		if (inited.current) {
			await fetchProducts()
		}
	}

	useEffect(() => {
		// console.log("location", location)
		// init
		if (!inited.current) {
			const urlFilter = getFilterObj(location)
			const filter = formateFilter(urlFilter, defaultFilter)
			console.log("filter from url", urlFilter, "to filter", filter)
			setFilter(filter)
		}
	}, [location])

	useEffect(() => {
		console.log("filter", filter)
		// skip filter inited with defaultFilter,
		// then fetch data by loadmore
		if (inited.current) {
			const encodedFilter = transObjToQuery(filter)
			console.log("change url", encodedFilter)
			setUrlQuery(encodedFilter)
			// reset data
			if (filter.termQueries.length) {
				dispatch(setProductsList([]))
				// dispatch(setProductsInfo({}))
				setPageState(defaultPageState)
			}
		} else if (filter.termQueries.length) {
			inited.current = true
		}
	}, [filter])

	// reset data when component unmounted
	useEffect(() => {
		return () => {
			dispatch(setProductsList([]))
			dispatch(setProductsInfo({}))
		}
	}, [])

	return (
		<PageLayout
			header={
				<Header
					title={pageInfo?.pageTitle ?? ""}
					onClickLeft={() => navigate(-1)}
				/>
			}
			stickyEl={filterBarRef}
		>
			<FilterBar
				style={{ marginBottom: "10px" }}
				ref={filterBarRef}
				filter={filter}
				setFilter={setFilter}
				searchFilter={pageInfo.searchFilter}
			/>

			{/* <TstWrapper> */}
			{/* // todo margin top */}
			<WaterFall
				onRender={() => setIsRenderFinished(false)}
				onRenderFinished={() => {
					setIsRenderFinished(true)
					if (pageInfo.hasNextPage) {
						setHasMore(true)
					}
				}}
			>
				{products.map((item) => {
					return (
						<Product
							className='item'
							key={item.itemsId}
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
		</PageLayout>
	)
}

const TstWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`

export default ShopList
