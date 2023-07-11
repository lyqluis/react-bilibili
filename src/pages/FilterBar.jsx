import { IndexBar, Dropdown, Popup, List } from "antd-mobile"
import styled from "styled-components"
import { useState, useEffect, useRef, forwardRef } from "react"
import Icon from "../components/Icon"
import { px2vw } from "../utils/style"
import { getFilterAllFilters } from "../api/mall"
import { formatIndexList } from "../utils/global"
import { useDispatch, useSelector } from "react-redux"
import { selectMallState, setAllFilterList } from "../store/mallSlice"
import FilterIndexList from "../components/FilterIndexList"

const defaultFilter = {
	keyword: "",
	filters: "",
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

const SORT_TYPES = [
	{ name: "totalrank", title: "综合" },
	{ name: "sale", title: "销量" },
	{ name: "pubtime", title: "新品" },
	{ name: "price", title: "价格" },
]

const SINGLE_TYPES = [
	{ name: "all", title: "全部商品", value: null },
	{ name: "single", title: "单品", value: "0,2,3,5,6,7" },
	{ name: "blind", title: "盲盒", value: "4" },
]

const SelectCard = ({ filter, onClick, isSelected }) => {
	const handleClick = (e) => {
		onClick && onClick(!isSelected, filter)
	}

	return (
		<SelectCardWrapper
			className={isSelected ? "selected" : ""}
			onClick={handleClick}
		>
			{filter.name}
		</SelectCardWrapper>
	)
}

const SelectCardWrapper = styled.div`
	padding: 0 10px;
	font-size: var(--font-size-s);
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: ${px2vw`40px`};
	background: var(--color-border);
	border-radius: var(--radius);

	&.selected {
		background: var(--color-main-4);
		color: var(--color-background);
	}
`

const FilterBar = forwardRef(
	({ filter, setFilter, searchFilter = [] }, ref) => {
		const [visible, setVisible] = useState(false)
		const [sortType1, setSortType1] = useState(SORT_TYPES[0])
		const [singleState, setSingleState] = useState(SINGLE_TYPES[0])
		const [selectedFilters, setSelectedFilters] = useState([])
		const [indexListVisible, setIndexListVisible] = useState(false)

		const dispatch = useDispatch()
		const allFilterList = useSelector(selectMallState("allFilterList"))
		const [currentAllFiltersType, setCurrentAllFiltersType] = useState("")

		const sortTypeRef = useRef(null)
		const singleStateRef = useRef(null)
		const handlePriceSort = () => {
			sortTypeRef.current.close()
			if (filter.sortOrder === "asc") {
				setFilter({ ...filter, sortOrder: "desc" })
			} else {
				setFilter({ ...filter, sortType: "price", sortOrder: "asc" })
			}
		}

		// watch filterbar's single value's change to setFilter
		// useEffect(() => {}, [])

		const selectFilter = (isSelected, filter) => {
			if (isSelected) {
				setSelectedFilters([...selectedFilters, filter])
			} else {
				setSelectedFilters(selectedFilters.filter((f) => f.id !== filter.id))
			}
			// todo request to fetch the count
		}

		const confirmFilterIndexList = (indexFilters) => {
			const otherFilters = selectedFilters.filter(
				(f) => f.parentKey !== currentAllFiltersType.key
			)
			setSelectedFilters([...otherFilters, ...indexFilters])

			// todo delete
			// filters width other parentKey or with same id & parentKey
			// const keepFilters = selectedFilters.filter(
			// 	(f) =>
			// 		f.parentKey !== currentAllFiltersType.key ||
			// 		(f.parentKey === currentAllFiltersType.key &&
			// 			indexFilters.some((filter) => filter.id === f.id))
			// )
			// const addFilters = indexFilters.filter(
			// 	(filter) =>
			// 		!selectedFilters.some(
			// 			(f) => f.parentKey === filter.parentKey && f.id === filter.id
			// 		)
			// )
			// console.log(keepFilters, addFilters)
			// setSelectedFilters([...keepFilters, ...addFilters])
		}

		const toggleIndexList = async (filter) => {
			console.log("all list", filter)
			setIndexListVisible(true)
			setCurrentAllFiltersType(filter)

			if (!allFilterList[filter.key]) {
				const res = await getFilterAllFilters(filter.key)
				console.log("fetch all filter", res)
				const allListInfo = formatIndexList(res.data)
				dispatch(
					setAllFilterList({ ...allFilterList, [filter.key]: allListInfo })
				)
			}
		}

		const resetSelectedFilters = () => {
			setSelectedFilters([])
		}

		useEffect(() => {
			console.log("selected filters", selectedFilters)
		}, [selectedFilters])

		return (
			<FilterBarWrapper
				ref={ref}
				className='line-bottom-1px'
			>
				{/* sortType */}
				<div
					className={`sorter ${
						SORT_TYPES.findIndex((s) => s.name === filter.sortType) === 0 ||
						SORT_TYPES.findIndex((s) => s.name === filter.sortType) === 1
							? "active"
							: ""
					}`}
					onClick={() => {
						setFilter({ ...filter, sortType: sortType1.name, sortOrder: "" })
					}}
				>
					<Dropdown ref={sortTypeRef}>
						<Dropdown.Item
							key='sortType'
							title={sortType1.title}
						>
							<FilterBarBoard>
								{SORT_TYPES.slice(0, 2).map((s) => {
									return (
										<li
											key={s.name}
											className={sortType1.name === s.name ? "active" : ""}
											onClick={() => {
												if (s.name !== sortType1.name) {
													setFilter({
														...filter,
														sortType: s.name,
														sortOrder: "",
													})
												}
												setSortType1(s)
												sortTypeRef.current.close()
											}}
										>
											{s.title}
											{sortType1.name === s.name && (
												<Icon
													name='correct'
													className='active-svg'
												/>
											)}
										</li>
									)
								})}
							</FilterBarBoard>
						</Dropdown.Item>
					</Dropdown>
				</div>
				{/* pubtime */}
				<div
					className={`sorter ${filter.sortType === "pubtime" ? "active" : ""}`}
					onClick={() => {
						setFilter({ ...filter, sortType: "pubtime", sortOrder: "" })
						sortTypeRef.current.close()
					}}
				>
					<div className='sorter-item'>
						<span className='sorter-item-title'>新品</span>
					</div>
				</div>
				{/* price */}
				<div
					className={`sorter ${filter.sortType === "price" ? "active" : ""}`}
					onClick={handlePriceSort}
				>
					<div className='sorter-item'>
						<span className='sorter-item-title'>价格</span>
						<div className='sorter-price-icons'>
							<Icon
								name='up_fill'
								className={`price-svg ${
									filter.sortOrder === "asc" ? "active" : ""
								}`}
							/>
							<Icon
								name='down_fill'
								className={`price-svg ${
									filter.sortOrder === "desc" ? "active" : ""
								}`}
							/>
						</div>
					</div>
				</div>

				<div
					className={`sorter ${
						SINGLE_TYPES.findIndex((s) => s.name === singleState.name) !== 0
							? "active"
							: ""
					}`}
					// onClick={() => {
					// 	setFilter({ ...filter, sortType: sortType1.name, sortOrder: "" })
					// }}
				>
					{/* filters */}
					<Dropdown ref={singleStateRef}>
						<Dropdown.Item
							key='single'
							title={singleState.title}
						>
							<FilterBarBoard>
								{SINGLE_TYPES.map((s) => {
									return (
										<li
											key={s.name}
											className={singleState.name === s.name ? "active" : ""}
											onClick={() => {
												setSingleState(s)
												const val = []
												s.value && val.push(s.value)
												setFilter({
													...filter,
													detailFilter: {
														...filter.detailFilter,
														categories: { 6: val },
													},
												})
												singleStateRef.current.close()
											}}
										>
											{s.title}
											{singleState.name === s.name && (
												<Icon
													name='correct'
													className='active-svg'
												/>
											)}
										</li>
									)
								})}
							</FilterBarBoard>
						</Dropdown.Item>
					</Dropdown>
				</div>

				<div className='filter-line line-left-1px'></div>
				<div
					className='sorter'
					onClick={() => setVisible(true)}
				>
					<div className='sorter-item'>
						<span className='sorter-item-title'>筛选</span>
						<Icon
							name='filter'
							className='filter-svg'
						/>
					</div>
				</div>

				<Popup
					position='right'
					visible={visible}
					bodyStyle={{ width: "90vw" }}
					onMaskClick={() => setVisible(false)}
				>
					<PopupBoard>
						<ul className='search-filters'>
							<li className='filter'>
								<section className='title'>价格区间</section>
								<div className='content'>todo input = input</div>
							</li>
							{searchFilter.map((filter) => {
								return (
									<li
										key={filter.key}
										className='filter'
									>
										<section className='title'>
											{filter.title}
											{filter.total > filter.filterList.length && (
												<div
													className='right'
													onClick={() => toggleIndexList(filter)}
												>
													全部
													<Icon
														name='more'
														className='right-svg'
													/>
												</div>
											)}
										</section>
										<ul className='content'>
											{filter.filterList.map((f) => {
												return (
													<SelectCard
														key={f.id}
														filter={f}
														onClick={selectFilter}
														isSelected={selectedFilters.some(
															(filter) => f.name === filter.name
														)}
													/>
												)
											})}
										</ul>
									</li>
								)
							})}
						</ul>
						<div className='bottom-bar'>
							<button
								className='bottom-bar-btn border-btn'
								onClick={resetSelectedFilters}
							>
								重置
							</button>
							<button className='bottom-bar-btn solid-btn'>
								确定
								<span className='counts'>(5969 件商品)</span>
							</button>
						</div>

						<FilterIndexList
							visible={indexListVisible}
							close={() => setIndexListVisible(false)}
							list={allFilterList[currentAllFiltersType.key]?.filterList}
							filterType={currentAllFiltersType}
							confirm={confirmFilterIndexList}
							selectedList={selectedFilters.filter(
								(f) => f.parentKey === currentAllFiltersType.key
							)}
						/>
					</PopupBoard>
				</Popup>
			</FilterBarWrapper>
		)
	}
)

const FilterBarWrapper = styled.div`
	position: sticky;
	padding: 0 10px;
	transition: all var(--duration) ease-in-out;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: var(--font-size-xm);
	background: var(--color-background);
	z-index: 10;

	.sorter {
		&-item {
			display: flex;
			align-items: center;
			padding: 12px;
			&-title {
				margin-right: 5px;
			}
		}
		&-price-icons {
			display: flex;
			flex-direction: column;
			align-items: center;
			.price-svg {
				width: 8px;
				height: 8px;
				&.active {
					color: var(--color-main);
				}
			}
		}
		.filter-svg {
			width: var(--font-size-m);
			height: var(--font-size-m);
		}

		&.active {
			color: var(--color-main);
		}

		&:nth-child(4) {
			flex: 0 0 calc(var(--font-size-xm) * 4 + 12px * 2 + 5px + 8px);
		}
	}
	.filter-line {
		height: var(--font-size-m);
		width: 0.1px;
	}

	.adm-dropdown {
		.adm-dropdown-item {
			/* margin-right: 20px; */
			&:last-child {
				/* margin-right: 0; */
			}
			.adm-dropdown-item-title-text {
				font-size: var(--font-size-xm);
			}
		}
	}
`

const FilterBarBoard = styled.ul`
	display: flex;
	flex-direction: column;
	font-size: var(--font-size-xm);
	background: var(--color-background);
	li {
		padding: 10px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&.active {
			color: var(--color-main);
		}
		.active-svg {
			width: var(--font-size-xl);
			height: var(--font-size-xl);
			color: var(--color-main);
		}
	}
`

const PopupBoard = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	ul.search-filters {
		flex: 1 1 auto;
		overflow: auto;
		padding-bottom: 10px;
		li.filter {
			margin: 20px 10px 0 10px;
			.title {
				display: flex;
				justify-content: space-between;
				font-size: var(--font-size-xm);
				margin-bottom: 10px;
				.right {
					display: flex;
					color: var(--color-font-grey);
					&-svg {
						color: var(--color-font-grey);
						width: var(--font-size-m);
						height: var(--font-size-m);
					}
				}
			}
			.content {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-gap: 10px;
			}
		}
	}

	.bottom-bar {
		width: 100%;
		background: var(--color-background);
		display: flex;
		justify-content: space-around;
		padding: 10px;
		box-shadow: var(--shadow);
		&-btn {
			width: 48%;
			border-radius: 20px;
			font-size: var(--font-size-xm);
			padding: 10px 5px;
			font-weight: 400;
			border: none;
			.counts {
				font-size: var(--font-size-s);
			}
			&.border-btn {
				background: var(--color-background);
				color: var(--color-main-4);
				border: 1px solid var(--color-main-4);
			}
			&.solid-btn {
				color: var(--color-background);
				background: var(--color-main-4);
			}
		}
	}
`

export default FilterBar
