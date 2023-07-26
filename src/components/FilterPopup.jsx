import { Popup } from "antd-mobile"
import styled from "styled-components"
import PriceRange from "../components/PriceRange"
import { px2vw } from "../utils/style"
import Icon from "./Icon"
import FilterIndexList from "./FilterIndexList"
import { useState, useEffect } from "react"
import { getFilterAllFilters, getFilteredProductCount } from "../api/mall"
import { formatIndexList, formateFilter } from "../utils/mallHelper"
import { useDispatch, useSelector } from "react-redux"
import { selectMallState, setAllFilterList } from "../store/mallSlice"

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

const defaultCountFilter = {
	type: "item",
	keyword: "",
	filters: {},
	priceFlow: "",
	priceCeil: "",
	sortType: "",
	sortOrder: "",
	state: "",
	scene: "",
	termQueries: [],
	rangeQueries: [],
}

const FilterPopup = ({
	filter,
	list = [], // searchFilter
	visible,
	close,
	confirm,
	...props
}) => {
	const [selectedFilters, setSelectedFilters] = useState([])
	const [currentAllFiltersType, setCurrentAllFiltersType] = useState("")
	const [indexListVisible, setIndexListVisible] = useState(false)
	const allFilterList = useSelector(selectMallState("allFilterList"))
	const [priceRange, setPriceRange] = useState([])
	const [countFilter, setCountFilter] = useState(null)
	const [productCount, setProductCount] = useState(10000)

	const dispatch = useDispatch()

	const selectFilter = (isSelected, filter) => {
		if (isSelected) {
			setSelectedFilters([...selectedFilters, filter])
		} else {
			setSelectedFilters(selectedFilters.filter((f) => f.id !== filter.id))
		}
	}

	const resetSelectedFilters = () => setSelectedFilters([])

	const confirmFilterIndexList = (indexFilters) => {
		const otherFilters = selectedFilters.filter(
			(f) => f.parentKey !== currentAllFiltersType.key
		)
		setSelectedFilters([...otherFilters, ...indexFilters])
	}

	const toggleIndexList = async (filter) => {
		console.log("all list", filter)
		setIndexListVisible(true)
		setCurrentAllFiltersType(filter)

		if (!allFilterList[filter.key]) {
			const res = await getFilterAllFilters({
				...filter,
				filterType: filter.key,
			})
			console.log("fetch all filter index list", res)
			const allListInfo = formatIndexList(res.data)
			dispatch(
				setAllFilterList({ ...allFilterList, [filter.key]: allListInfo })
			)
		}
	}

	const handleConfirm = () => {
		close()
		confirm({ ...filter, ...countFilter })
	}

	useEffect(() => {
		// set selected filters
		const filters = Object.entries(filter.filters)
		setSelectedFilters(
			filters.map(([key, val]) => ({ parentKey: parseInt(key), id: val[0] }))
		)
		// set initial count filter
		const initailCountFilter = formateFilter(filter, defaultCountFilter)
		setCountFilter(initailCountFilter)
	}, [filter])

	useEffect(() => {
		// selected filters
		console.log("selected filters changed", selectedFilters)
		setCountFilter((preFilter) => {
			const newFilters = {}
			selectedFilters.map(({ parentKey, id }) => {
				const key = parentKey.toString()
				if (!newFilters[key]) newFilters[key] = []
				newFilters[key].push(id)
			})
			// trans countFilter.filters to countFilter.termQueries
			const termQueries =
				preFilter?.termQueries?.filter((f) => f.field === "category") ?? []
			const newFiltersArr = Object.keys(newFilters)
			newFiltersArr.map((key) =>
				termQueries.push({
					field: key,
					values: newFilters[key],
				})
			)
			// price range
			const priceRangeObj = {}
			if (priceRange.length) {
				console.log("price range changed", priceRange)
				const [min, max] = priceRange
				priceRangeObj.priceFlow = min ?? ""
				priceRangeObj.priceCeil = max ?? ""
				// trans countFilter.priceFlow & priceCeil to countFilter.rangeQueries
				priceRangeObj.rangeQueries = [{ field: "price", gte: min, lte: max }]
			}

			return {
				...preFilter,
				filters: newFilters,
				termQueries,
				...priceRangeObj,
			}
		})
	}, [selectedFilters, priceRange])

	// get filtered products' count
	useEffect(() => {
		console.log("count filter", countFilter)
		const fetchCount = async (filter) => {
			const res = await getFilteredProductCount(filter)
			console.log("fetch count", res)
			setProductCount(res.data)
		}
		visible && fetchCount(countFilter)
	}, [countFilter, visible])

	return (
		<Popup
			visible={visible}
			{...props}
		>
			<PopupBoard>
				<ul className='search-filters'>
					<li className='filter'>
						<section className='title'>价格区间</section>
						<PriceRange onChange={setPriceRange} />
					</li>
					{list.map((filter) => {
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
													(filter) =>
														f.parentKey === filter.parentKey &&
														f.id === filter.id
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
					{/* // todo */}
					<button
						className='bottom-bar-btn solid-btn'
						onClick={handleConfirm}
					>
						确定
						<span className='counts'> ({productCount}件商品)</span>
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
	)
}

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

export default FilterPopup
