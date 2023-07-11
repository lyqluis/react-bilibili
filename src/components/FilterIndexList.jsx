import { IndexBar } from "antd-mobile"
import styled from "styled-components"
import Icon from "./Icon"
import { List } from "antd-mobile"
import { useState, useEffect } from "react"

const FilterItem = ({ item, onClick, isSelected }) => {
	const [selected, setSelected] = useState(false)
	const handleClick = () => {
		const nextSelected = !selected
		setSelected(nextSelected)
		onClick &&
			onClick(nextSelected, { ...item, cancel: () => setSelected(false) })
	}

	useEffect(() => {
		setSelected(isSelected)
	}, [isSelected])

	return (
		<FilterItemWrapper
			className={selected ? "selected" : ""}
			onClick={handleClick}
		>
			{item.name}
			{selected && (
				<Icon
					name='correct'
					className='selected-svg'
				/>
			)}
		</FilterItemWrapper>
	)
}

const FilterItemWrapper = styled.p`
	padding-right: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&.selected {
		color: var(--color-main-4);
		.selected-svg {
			color: var(--color-main-4);
			width: var(--font-size-xl);
			height: var(--font-size-xl);
		}
	}
`

const IndexBarList = ({ list = [], select, selectedList = [] }) => {
	if (!list.length) {
		return <p>loading</p>
	}

	return (
		<IndexBar>
			{list?.map((group) => {
				return (
					<IndexBar.Panel
						index={group[0] === "hotFilter" ? "热门" : group[0]}
						title={group[0] === "hotFilter" ? "热门" : group[0]}
						key={group[0]}
					>
						<List>
							{group[1].map((f) => {
								return (
									<List.Item key={f.id}>
										<FilterItem
											item={f}
											onClick={select}
											isSelected={selectedList.some(
												(filter) => f.id === filter.id
											)}
										/>
									</List.Item>
								)
							})}
						</List>
					</IndexBar.Panel>
				)
			})}
		</IndexBar>
	)
}

const FilterIndexList = ({
	visible,
	list = [],
	filterType,
	close,
	confirm,
	selectedList = [],
}) => {
	const [selectedFilters, setSelectedFilters] = useState(selectedList)

	const handleSelect = (isSelected, filterItem) => {
		if (isSelected) {
			setSelectedFilters([...selectedFilters, filterItem])
		} else {
			setSelectedFilters(selectedFilters.filter((f) => f.id !== filterItem.id))
		}
	}
	const resetSelectedFilters = () => {
		selectedFilters.forEach((filter) => filter.cancel && filter.cancel())
		setSelectedFilters([])
	}
	const handelConfirm = () => {
		confirm(selectedFilters)
		close()
		resetSelectedFilters()
	}

	useEffect(() => {
		setSelectedFilters(selectedList)
	}, [selectedList])

	return (
		<IndexList className={visible ? "open" : ""}>
			<header>
				<Icon
					name='back'
					className='header-svg'
					onClick={close}
				/>
				<p className='title'>全部{filterType?.title}</p>
			</header>

			<IndexBarList
				list={list}
				select={handleSelect}
				selectedList={selectedFilters}
			/>

			<div className='bottom-bar'>
				<button
					className='bottom-bar-btn border-btn'
					onClick={resetSelectedFilters}
				>
					重置
				</button>
				<button
					className='bottom-bar-btn solid-btn'
					onClick={handelConfirm}
				>
					确定
				</button>
			</div>
		</IndexList>
	)
}

const IndexList = styled.div`
	position: absolute;
	display: grid;
	grid-template-rows: auto 1fr auto;
	width: 100%;
	top: 0;
	bottom: 0;
	background: var(--color-background);
	transform: translateX(100%);
	transition: transform var(--duration) ease-in-out;
	&.open {
		transform: translateX(0);
	}

	header {
		position: relative;
		padding: 10px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-m);
		background: var(--color-background);
		.header-svg {
			position: absolute;
			width: var(--font-size-m);
			height: var(--font-size-m);
			left: 10px;
		}
		.title {
			margin: 0 auto;
		}
	}

	.bottom-bar {
		z-index: 1000;
	}
`

export default FilterIndexList
