import { useState, useEffect, useRef } from "react"
import { SearchBar } from "antd-mobile"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import {
	getSearch,
	getHotSearch,
	getSearchpPlaceholder,
	getSearchSuggestion,
} from "../api/search"
import { useDispatch, useSelector } from "react-redux"
import {
	selectSearchState,
	setPlaceholder,
	setHotSearches,
	setKeyword,
	setIsFocused,
	setSuggestions,
	setSearchData,
	addHistoryKeyword,
	removeHistoryKeyword,
	clearHistoryKeywords,
} from "../store/searchSlice"
import Icon from "./Icon"
import Section from "./Section"
import SearchSuggestion from "./SearchSuggestion"
import SearchResult from "./SearchResult"
import SearchHistory from "./SearchHistory"
import useFetch from "../hooks/useFetch"
import { useSearchParams } from "react-router-dom"
import { getMallSearchSuggestion } from "../api/mall"
import { useNavigate } from "react-router-dom"
import { defaultFilter, formateFilter } from "../utils/mallHelper"
import { transObjToQuery } from "../utils/global"

export default function ShopSearch({
	showWholePage = true,
	onBack,
	inputKeyword,
	filter,
	onSearch,
}) {
	// todo when showWholePage is true, show the whole board page
	// else show the search input
	const searchRef = useRef(null)
	const [resultLoading, setResultLoading] = useState(false)

	const [keyword, setKeyword] = useState(inputKeyword)
	const [isFocused, setIsFocused] = useState(false)
	const [suggestions, setSuggestions] = useState([])
	// todo change the data source
	const placeholder = useSelector(selectSearchState("placeholder"))
	const searchData = useSelector(selectSearchState("searchData"))
	const historyKeywords = useSelector(selectSearchState("historyKeywords"))

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [urlQuery, setUrlQuery] = useSearchParams()

	const isIndex = !keyword && !urlQuery.has("keyword")
	const needSuggestion = keyword && isFocused && suggestions.length > 0
	const needResult = keyword && !isFocused

	const handlCancel = async () => {
		// dispatch(setIsFocused(false))
		setUrlQuery({})
		// onCancel()
	}
	const handleSuggestion = async (val = keyword) => {
		if (!val) return
		const res = await getMallSearchSuggestion(val)
		console.log(res)
		setSuggestions(res.data.vo)
	}
	const handleFocus = async () => {
		handleSuggestion()
		// dispatch(setIsFocused(true))
	}
	const handleSearch = async (val) => {
		val = val === "" ? placeholder : val
		console.log("search", val)
		setIsFocused(false)
		if (keyword !== val) setKeyword(val)
		const filter = Object.assign({}, defaultFilter, {
			keyword: val,
			category: "1_107",
		})
		const query = transObjToQuery(filter)
		navigate(`/shop/search_result?${query}`)
		onSearch(val)
		// todo
		// if (urlQuery.get("keyword") !== val) setUrlQuery({ keyword: val })
		dispatch(addHistoryKeyword(val))
		setResultLoading(true)
	}
	const handleChange = async (val) => {
		setKeyword(val)
		handleSuggestion(val)
	}

	useEffect(() => {
		if (urlQuery.has("keyword")) {
			const keyword = urlQuery.get("keyword")
			keyword && handleSearch(keyword)
		}
	}, [])

	useEffect(() => {
		setIsFocused(true)
	}, [])

	useEffect(() => {
		isFocused && searchRef.current.focus()
	}, [isFocused])

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
			{/* {needResult && (
				<SearchResult
					list={searchData}
					loading={resultLoading}
				/>
			)} */}
			{/* history search */}
			{isIndex && (
				<Section
					leftTitle='历史搜索'
					rightTitle={
						<Icon
							name='delete'
							className='section-title-svg'
							onClick={() => dispatch(clearHistoryKeywords())}
						/>
					}
				>
					<SearchHistory
						words={historyKeywords}
						onClick={handleSearch}
						onRemove={(val) => dispatch(removeHistoryKeyword(val))}
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
