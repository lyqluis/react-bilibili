import PageLayout from "../layout/PageLayout"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { getFilterObj, formateFilter } from "../utils/global"
import useRequest from "../hooks/useRequest"
import { getProducts } from "../api/mall"
import WaterFall from "../components/WaterFall"
import { useDispatch, useSelector } from "react-redux"
import {
	selectMallState,
	setProductsInfo,
	setProductsList,
} from "../store/mallSlice"
import Product from "../components/Porduct"
import FilterBar from "./FilterBar"

const defaultFilter = {
	keyword: "",
	filters: {},
	priceFlow: "",
	priceCeil: "",
	sortType: "totalrank", // 排序，totalrank | sale | price | pubtime, 综合｜销量｜价格｜新品
	sortOrder: "", // 配合 sortType: 'price' 使用，desc | asc, 价格降序｜价格升序
	pageIndex: 1, // 页数
	userId: "",
	state: "",
	scene: "PC_list", // PC_list | figure
	termQueries: [], // required，获取商品数据必须的查询参数
	rangeQueries: [],
	pageSize: 32, // page size, default: 32
	// from: "pc_show",
	msource: "",
}

const urlFilter = {
	noReffer: "true",
	sortType: "totalrank",
	sortOrder: "false",
	isInStock: "false",
	detailFilter: {
		categories: {
			6: '["0,2,3,5,6,7"]',
		},
		categoriesName: {
			6: '["单品"]',
		},
		price: {
			priceCeil: "",
			priceFlow: "",
		},
	},
	noTitleBar: "1",
	page: "category_list",
	from: "category_sb",
	category: "1_107",
	scene: "figure",
}

const ShopList = () => {
	// todo listen to the url query to fetch products data
	// change the UI to change filter, then change the query of url
	// data changing rely on the url query
	// dropdown + popup from right
	const filterBarRef = useRef(null)
	const location = useLocation()
	const dispatch = useDispatch()
	const [filter, setFilter] = useState(defaultFilter)
	// todo combine filter with request
	const { data, finished, request } = useRequest(getProducts, {
		// manual: true,
		deps: [filter],
	})
	const pageInfo = useSelector(selectMallState("productsInfo"))
	const products = useSelector(selectMallState("productsList"))

	useEffect(() => {
		const urlFilter = getFilterObj(location)
		console.log("filter from url", urlFilter)
		const filter = formateFilter(urlFilter, defaultFilter)
		console.log("filter", filter)
		setFilter(filter)
	}, [location])

	useEffect(() => {
		if (finished) {
			const res = data.data
			const info = {}
			for (const key in res) {
				if (key === "list") {
					dispatch(setProductsList(res[key]))
				} else {
					info[key] = res[key]
				}
			}
			dispatch(setProductsInfo(info))
		}
	}, [data, finished])

	useEffect(() => {
		console.log(filter)
		// todo reset product list
		dispatch(setProductsList([]))
	}, [filter])

	return (
		<PageLayout
			header={"header"}
			stickyEl={filterBarRef}
		>
			<FilterBar
				ref={filterBarRef}
				filter={filter}
				setFilter={setFilter}
				searchFilter={pageInfo.searchFilter}
			/>

			{/* <TstWrapper> */}
			{/* // todo margin top */}
			<WaterFall>
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
			{/* </TstWrapper> */}
		</PageLayout>
	)
}

const TstWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`

export default ShopList
