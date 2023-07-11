const FilterBar = () => {
	// 存储最终形成的所有 filter
	const [selectedFilters, setSelectedFilters] = useState([])
	const selectFilter = (isSelected, ...filter) => {
		if (isSelected) {
			setSelectedFilters([...selectedFilters, ...filter])
		} else {
			filter = filter[0]
			setSelectedFilters(selectedFilters.filter((f) => f.id !== filter.id))
		}
	}

	return (
		<PopupBoard>
			<ul className='search-filters'>
				{dataList.map((filter) => {
					return (
						<li key={filter.key}>
							<section className='title'>{/* ... */}</section>
							<ul className='content'>
								{filter.filterList.map((f) => {
									return (
										<SelectCard
											key={f.id}
											filter={f}
											onClick={selectFilter}
											isSelected={selectedFilters.some(
												(filter) => f.id === filter.id
											)}
										/>
									)
								})}
							</ul>
						</li>
					)
				})}
			</ul>

			<FilterIndexList
				visible={indexListVisible}
				close={() => setIndexListVisible(false)}
				list={filterList}
				confirm={selectFilter}
				selectedList={selectedFilters}
			/>
		</PopupBoard>
	)
}

const FilterIndexList = ({ ... }) => {
	return (
		<List>
			{list.map((f) => {
				return (
					<FilterItem
						key={f.id}
						item={f}
						onClick={select}
						// 筛选外部选中的总数据中有没有和当前项匹配的，若有则当前项为选中状态
						isSelected={selectedList.some((filter) => f.id === filter.id)}
					/>
				)
			})}
		</List>
	)
}

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
      {/* ... */}
		</FilterItemWrapper>
	)
}

const SelectCard = ({ filter, onClick, isSelected }) => {
	const [selected, setSelected] = useState(false)
	const handleClick = (e) => {
		const nextSelected = !selected
		setSelected(nextSelected)
		onClick &&
			onClick(nextSelected, {
				...filter,
				cancel: () => setSelected(false),
				select: () => setSelected(true),
			})
	}

	useEffect(() => {
		setSelected(isSelected)
	}, [isSelected])

	return (
		<SelectCardWrapper
			className={selected ? "selected" : ""}
			onClick={handleClick}
		>
      {/* ... */}
		</SelectCardWrapper>
	)
}

