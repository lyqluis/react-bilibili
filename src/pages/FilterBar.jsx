import { Dropdown } from "antd-mobile"
import styled from "styled-components"
import { useState, useRef, forwardRef } from "react"
import Icon from "../components/Icon"
import FilterPopup from "../components/FilterPopup"

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
	scene: "figure", // PC_list | figure
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

const FilterBar = forwardRef(
	({ filter, setFilter, searchFilter = [] }, ref) => {
		const [visible, setVisible] = useState(false)
		const [sortType1, setSortType1] = useState(SORT_TYPES[0])
		const [singleState, setSingleState] = useState(SINGLE_TYPES[0])

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

				<FilterPopup
					// Popup's props
					position='right'
					visible={visible}
					bodyStyle={{ width: "90vw" }}
					onMaskClick={() => setVisible(false)}
					// FilterPopup's props
					list={searchFilter}
					filter={filter}
					close={() => setVisible(false)}
					confirm={setFilter}
				/>
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

export default FilterBar
