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
import Icon from "../components/Icon"
import Section from "../components/Section"
import HotSearch from "../components/HotSearch"
import SearchSuggestion from "../components/SearchSuggestion"
import SearchResult from "../components/SearchResult"
import SearchHistory from "../components/SearchHistory"
import useFetch from "../hooks/useFetch"
import { useSearchParams } from "react-router-dom"

const parseSearchData = (data, type = "video") => {
	return data.result.find((res) => res.result_type === type).data
}

export default function Search() {
	const searchRef = useRef(null)
	const [resultLoading, setResultLoading] = useState(false)

	const placeholder = useSelector(selectSearchState("placeholder"))
	const hotSearches = useSelector(selectSearchState("hotSearches"))
	const keyword = useSelector(selectSearchState("keyword"))
	const isFocused = useSelector(selectSearchState("isFocused"))
	const suggestions = useSelector(selectSearchState("suggestions"))
	const searchData = useSelector(selectSearchState("searchData"))
	const historyKeywords = useSelector(selectSearchState("historyKeywords"))

	const dispatch = useDispatch()
	const [urlQuery, setUrlQuery] = useSearchParams()

	const isIndex = !keyword && !urlQuery.has("keyword")
	const needSuggestion = keyword && isFocused && suggestions.length > 0
	const needResult = keyword && !isFocused

	const handlCancel = async () => {
		dispatch(setIsFocused(false))
		setUrlQuery({})
	}
	const handleSuggestion = async (val = keyword) => {
		if (!val) return
		const res = await getSearchSuggestion(val)
		console.log(res)
		const list = res.result.tag
		dispatch(setSuggestions(list))
	}
	const handleFocus = async () => {
		handleSuggestion()
		dispatch(setIsFocused(true))
	}
	const handleSearch = async (val) => {
		val = val === "" ? placeholder : val
		console.log("search", val)
		dispatch(setIsFocused(false))
		if (keyword !== val) dispatch(setKeyword(val))
		if (urlQuery.get("keyword") !== val) setUrlQuery({ keyword: val })
		dispatch(addHistoryKeyword(val))
		setResultLoading(true)
		const res = await getSearch(val).then((res) => {
			console.log(res)
			setResultLoading(false)
			return res
		})
		// res.data.result {Array}
		const videos = parseSearchData(res.data)
		dispatch(setSearchData(videos))
	}
	const handleChange = async (val) => {
		dispatch(setKeyword(val))
		handleSuggestion(val)
	}

	const {
		data: hotSearchData,
		loading: hotSearchLoading,
		finished: hotSearchFinished,
	} = useFetch(getHotSearch)
	useEffect(() => {
		hotSearchFinished && dispatch(setHotSearches(hotSearchData.list))
	}, [hotSearchFinished])

	const { data: placeholderData, finished: placeholderFinished } = useFetch(
		getSearchpPlaceholder
	)
	useEffect(() => {
		placeholderFinished && dispatch(setPlaceholder(placeholderData.data.name))
	}, [placeholderFinished])

	useEffect(() => {
		if (urlQuery.has("keyword")) {
			const keyword = urlQuery.get("keyword")
			keyword && handleSearch(keyword)
		}
	}, [])

	return (
		<Wrapper>
			<div className='search-wrapper'>
				<SearchBar
					showCancelButton
					ref={searchRef}
					value={keyword}
					placeholder={placeholder}
					onSearch={handleSearch}
					onChange={handleChange}
					onFocus={() => handleFocus()}
					onClear={() => searchRef.current?.focus()}
					onCancel={handlCancel}
				/>
			</div>
			{/* suggestion */}
			{needSuggestion && (
				<SearchSuggestion
					list={suggestions}
					onSelect={handleSearch}
				/>
			)}
			{needResult && (
				<SearchResult
					list={searchData}
					loading={resultLoading}
				/>
			)}
			{/* hot search */}
			{isIndex && (
				<Section leftTitle='热搜'>
					<HotSearch
						loading={hotSearchLoading}
						list={hotSearches}
						onSelect={handleSearch}
					/>
				</Section>
			)}
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
		background: var(--color-background);
		padding: ${px2vw`10px`};
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.section-title-svg {
		width: var(--font-size-m);
		height: var(--font-size-m);
	}
`
