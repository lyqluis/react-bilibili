import { useState, useRef, useEffect } from "react"
import { getAllWeekly, getWeekly } from "../api/popular"
import useFetch from "../hooks/useFetch"
import { useDispatch, useSelector } from "react-redux"
import {
	selectPopularState,
	setAllWeeklyList,
	setWeekly,
	setWeeklyInfo,
} from "../store/popularSlice"
import { useSearchParams } from "react-router-dom"
import { List } from "antd-mobile"
import ListCard from "../components/ListCard"
import { Dropdown } from "antd-mobile"
import styled from "styled-components"
import { ListCardSkeleton } from "../components/Skeleton"

const WeeklyList = ({ list = [], loading }) => {
	const skeletons = new Array(8).fill(null).map((_, i) => (
		<List.Item key={i}>
			<ListCardSkeleton />
		</List.Item>
	))

	if (loading) return <List>{skeletons}</List>

	return (
		<List>
			{list.length > 0 &&
				list.map((item) => {
					return (
						<List.Item
							key={item.aid}
							arrow={false}
							// onClick={onClick}
						>
							<ListCard item={item} />
						</List.Item>
					)
				})}
		</List>
	)
}

const Weekly = () => {
	const { data: allWeeklyData, finished } = useFetch(getAllWeekly)
	const [urlQuery, setUrlQuery] = useSearchParams()
	const weekly = useSelector(selectPopularState("weekly"))
	const weeklyInfo = useSelector(selectPopularState("weeklyInfo"))
	const allWeeklyList = useSelector(selectPopularState("allWeeklyList"))
	const [pageLoading, setPageLoading] = useState(true)
	const weeklySelectorRef = useRef()
	const dispatch = useDispatch()
	const fetchWeekly = async (num) => {
		try {
			const res = await getWeekly(num)
			console.log("get weekly", res)
			const { config, list, reminder } = res.data
			dispatch(setWeekly(list))
			dispatch(setWeeklyInfo({ ...config, reminder }))
			setPageLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (finished) {
			const { list } = allWeeklyData.data
			dispatch(setAllWeeklyList(list))
			const num = urlQuery.get("number")
			if (!num) {
				const week = list[0]
				setUrlQuery({ number: week.number })
			}
		}
	}, [allWeeklyData])

	useEffect(() => {
		setPageLoading(true)
		const num = urlQuery.get("number")
		if (num) {
			console.log("url query", num)
			fetchWeekly(num)
		}
	}, [urlQuery])

	return (
		<Wrapper>
			<Dropdown
				ref={weeklySelectorRef}
				className='line-bottom-1px'
			>
				<Dropdown.Item
					key='weekly-number'
					title={
						<div className='weekly-selector-title'>
							<span>{weeklyInfo.subject}</span>
							<span className='weekly-selector-title-number'>
								{weeklyInfo.label}
							</span>
						</div>
					}
				>
					<WeeklySelectorWrapper>
						{allWeeklyList.length > 0 &&
							allWeeklyList.map((item) => {
								return (
									<div
										className={
											"weekly-issue" +
											(item.number === weeklyInfo.number ? " active" : "")
										}
										key={item.number}
										onClick={() => {
											setUrlQuery({ number: item.number })
											weeklySelectorRef.current.close()
										}}
									>
										<span>{item.subject}</span>
										<span>{item.name}</span>
									</div>
								)
							})}
					</WeeklySelectorWrapper>
				</Dropdown.Item>
			</Dropdown>
			<WeeklyList
				list={weekly}
				loading={pageLoading}
			/>
		</Wrapper>
	)
}

const WeeklySelectorWrapper = styled.div`
	height: 40vh;
	overflow: scroll;
	color: var(--color-font-grey);
	font-size: var(--font-size-xm);
	padding: 0 15px;

	.weekly-issue {
		width: 100%;
		margin: 5px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 300;

		&.active {
			color: var(--color-main);
		}
	}
`

const Wrapper = styled.div`
	.adm-dropdown {
		position: sticky;
		top: 0;
		background: var(--color-background);
		z-index: 9;

		.adm-dropdown-nav {
			.adm-dropdown-item {
				&-title {
					width: 100%;
					padding: 10px 20px;
					justify-content: space-between;

					&-text {
						width: 100%;

						.weekly-selector-title {
							display: flex;
							justify-content: space-between;
							&-number {
								font-size: var(--font-size-xm);
								font-weight: 300;
							}
						}
					}
				}
			}
		}
	}
`

export default Weekly
