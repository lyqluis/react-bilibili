import { useState, useEffect, useRef } from "react"
import { SearchBar } from "antd-mobile"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import Icon from "./Icon"
import Section from "./Section"
import SearchSuggestion from "./SearchSuggestion"
import SearchHistory from "./SearchHistory"
import { getMallSearchSuggestion } from "../api/mall"
import { useNavigate } from "react-router-dom"
import { defaultFilter } from "../utils/mallHelper"
import { transObjToQuery } from "../utils/global"
import { getMallHistoryKeywords, setMallHistoryKeywords } from "../utils/store"

export default function ShopSearch({ onBack, inputKeyword }) {
	const searchRef = useRef(null)

	const [keyword, setKeyword] = useState(inputKeyword)
	const [isFocused, setIsFocused] = useState(false)
	const [suggestions, setSuggestions] = useState([])
	const [historyKeywords, setHistoryKeywords] = useState(
		getMallHistoryKeywords()
	)

	const navigate = useNavigate()
	const removeHistoryKeyword = (val) =>
		setHistoryKeywords(historyKeywords.filter((word) => word != val))
	const clearHistoryKeywords = () => setHistoryKeywords([])

	const isIndex = !keyword
	const needSuggestion = keyword && isFocused && suggestions.length > 0

	const handlCancel = async () => {}
	const handleSuggestion = async (val = keyword) => {
		if (!val) return
		const res = await getMallSearchSuggestion(val)
		console.log(res)
		setSuggestions(res.data.vo)
	}
	const handleFocus = async () => {
		handleSuggestion()
	}
	const handleSearch = async (val) => {
		// val = val === "" ? placeholder : val
		console.log("search", val)
		setIsFocused(false)
		if (keyword !== val) setKeyword(val)
		const filter = Object.assign({}, defaultFilter, {
			keyword: val,
			category: "1_107",
		})
		const query = transObjToQuery(filter)
		navigate(`/shop/search_result?${query}`)
		setHistoryKeywords([...historyKeywords.filter((word) => word !== val), val])
	}
	const handleChange = async (val) => {
		setKeyword(val)
		handleSuggestion(val)
	}

	useEffect(() => {
		setIsFocused(true)
	}, [])

	useEffect(() => {
		isFocused && searchRef.current.focus()
	}, [isFocused])

	useEffect(() => {
		setMallHistoryKeywords(historyKeywords)
	}, [historyKeywords])

	return (
		<Wrapper>
			<SearchBarWrapper>
				<Icon
					name='back'
					className='back-svg'
					onClick={onBack}
				/>

				<SearchBar
					showCancelButton
					ref={searchRef}
					value={keyword}
					placeholder='商品、品牌、IP名'
					onSearch={handleSearch}
					onChange={handleChange}
					onFocus={() => handleFocus()}
					onClear={() => searchRef.current?.focus()}
					onCancel={handlCancel}
				/>
			</SearchBarWrapper>
			{/* suggestion */}
			{needSuggestion && (
				<SearchSuggestion
					list={suggestions}
					onSelect={handleSearch}
				/>
			)}
			{/* history search */}
			{isIndex && (
				<Section
					leftTitle='历史搜索'
					rightTitle={
						<Icon
							name='delete'
							className='section-title-svg'
							onClick={() => clearHistoryKeywords()}
						/>
					}
				>
					<SearchHistory
						words={historyKeywords}
						onClick={handleSearch}
						onRemove={(val) => removeHistoryKeyword(val)}
					/>
				</Section>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background: var(--color-background-grey);

	.search-wrapper {
	}

	.section-title-svg {
		width: var(--font-size-m);
		height: var(--font-size-m);
	}
`

export const SearchBarWrapper = styled.header`
	background: var(--color-background);
	padding: ${px2vw`10px`};
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	.back-svg {
		width: ${px2vw`20px`};
		margin-right: 10px;
	}
	.adm-search-bar {
		flex-grow: 1;
	}
`
