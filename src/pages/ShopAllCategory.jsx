import { Image, SideBar } from "antd-mobile"
import useRequest from "../hooks/useRequest"
import { getMallCategories } from "../api/mall"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectMallState, setAllCategories } from "../store/mallSlice"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import { useNavigate } from "react-router-dom"
import useThrottle from "../hooks/useThrottle"

const CateSection = ({ cateType }) => {
	const navigate = useNavigate()
	return (
		<CateSectionWrapper>
			<h1 id={`anchor-${cateType.typeName}`}>{cateType.typeName}</h1>
			<div className='cate-wrapper'>
				{cateType.categoryLogicVOList.map((cate) => {
					return (
						<div
							className='category-box'
							key={cate.id === "url" ? cate.name : cate.id}
							onClick={() => {
								// todo ip / brand's api don't work
								let field = "category"
								switch (cate.mapType) {
									case 2:
										field = "brand"
										break
									case 3:
										field = "ip"
										break
								}
								cate.mapType < 5 &&
									navigate(
										`/shop/list?noTitleBar=1&from=category_gz&${field}=${cate.id}`
									)
								// console.log(
								// 	cate,
								// 	cateType
								// 	'noTitleBar=1&page=category_list&from=category_sb&category=1_107&scene=figure#noReffer=true&sortType=totalrank&sortOrder=false&isInStock=false&detailFilter=%257B%2522categories%2522%253A%257B%25226%2522%253A%255B%25220%252C2%252C3%252C5%252C6%252C7%2522%255D%257D%252C%2522categoriesName%2522%253A%257B%25226%2522%253A%255B%2522%25E5%258D%2595%25E5%2593%2581%2522%255D%257D%252C%2522price%2522%253A%257B%2522priceCeil%2522%253A%2522%2522%252C%2522priceFlow%2522%253A%2522%2522%257D%257D'
								// 	// `/shop/list?noTitleBar=1&from=category_gz&category=${cate.id}`
								// )
							}}
						>
							<div className='img'>
								<Image
									lazy
									width='100%'
									height='100%'
									src={cate.img}
									alt={cate.name}
								/>
							</div>
							<p>{cate.name}</p>
						</div>
					)
				})}
			</div>
		</CateSectionWrapper>
	)
}

const CateSectionWrapper = styled.div`
	h1 {
		padding: 10px;
		font-weight: 400;
		font-size: var(--font-size-xm);
	}
	.cate-wrapper {
		padding: 10px;
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(3, 1fr);
		.category-box {
			justify-self: center;
			width: 77px;
			.img {
				width: 100%;
				height: 77px;
				display: flex;
				align-items: center;
				overflow: hidden;
				margin-bottom: 5px;
				img {
					object-fit: cover;
					width: 100%;
				}
			}
			p {
				width: 100%;
				word-wrap: break-word;
				word-break: keep-all;
				text-align: center;
				font-size: var(--font-size-s);
				color: var(--color-font-grey);
			}
		}
	}
`

const ShopAllCategory = () => {
	const [activeKey, setActiveKey] = useState(null)
	const dispatch = useDispatch()
	const allCategoryList = useSelector(selectMallState("allCategories"))
	const {
		data,
		finished,
		request: fetchMallCategories,
	} = useRequest(getMallCategories, { manual: true })

	useEffect(() => {
		if (!allCategoryList.length) fetchMallCategories()
	}, [allCategoryList])

	useEffect(() => {
		if (finished) {
			dispatch(setAllCategories(data.data.vo))
			setActiveKey(data.data.vo[0].typeName)
		}
	}, [data, finished])

	// when main scrolls, sidebar acitve tab auto change
	const mainRef = useRef(null)
	const handleScroll = () => {
		let currentKey = allCategoryList[0]?.typeName
		for (const type of allCategoryList) {
			const el = document.getElementById(`anchor-${type.typeName}`)
			if (!el) continue
			const { top } = el.getBoundingClientRect()
			if (top <= 0) {
				currentKey = type.typeName
			} else {
				break
			}
		}
		setActiveKey(currentKey)
	}
	const { run: throttledHandleScroll } = useThrottle(handleScroll, 750)

	useEffect(() => {
		const mainEl = mainRef.current
		if (!mainEl) return
		mainEl.addEventListener("scroll", throttledHandleScroll)

		return () => {
			mainEl.removeEventListener("scroll", throttledHandleScroll)
		}
	}, [allCategoryList])

	return (
		<>
			{/* // todo 
      <section>search component</section> */}
			<SideTabWrapper>
				<aside className='side-bar'>
					<SideBar
						activeKey={activeKey}
						onChange={(key) => {
							document.getElementById(`anchor-${key}`)?.scrollIntoView()
						}}
					>
						{allCategoryList.map((item) => (
							<SideBar.Item
								key={item.typeName}
								title={item.typeName}
							/>
						))}
					</SideBar>
				</aside>
				<main
					className='main'
					ref={mainRef}
				>
					{allCategoryList.map((type) => {
						return (
							<CateSection
								key={type.typeName}
								cateType={type}
							/>
						)
					})}
				</main>
			</SideTabWrapper>
		</>
	)
}

const SideTabWrapper = styled.div`
	height: calc(100vh - ${px2vw`65px`});
	display: flex;
	justify-content: flex-start;
	align-items: stretch;
	.side-bar {
		flex: none;
	}
	.main {
		flex: auto;
		overflow-y: scroll;
	}
`

export default ShopAllCategory
