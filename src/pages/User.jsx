import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import { logout } from "../api/login"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, setUserInfo } from "../store/userSlice"
import { getUserStat } from "../api/user"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import Icon from "../components/Icon"
import { Tabs } from "antd-mobile"
import HistoryTab from "../components/HistoryTab"
import { useState } from "react"

const tabs = [
	{ title: "收藏", name: "favorite", logo: "fav", element: "" },
	{ title: "历史", name: "history", logo: "fav", element: <HistoryTab /> },
	{ title: "动态", name: "space", logo: "fav", element: "" },
	{ title: "视频", name: "video", logo: "fav", element: "" },
]

export default function User() {
	const userInfo = useSelector(selectUserState("userInfo"))
	const { data: userStat, finished: userStatFinished } = useFetch(
		() => getUserStat(userInfo.mid),
		userInfo.stat
	)
	const [activeTab, setActiveTab] = useState(tabs[0])
	const { userId, tabName } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		const res = await logout()
		if (res.status && res.code === 0) {
			navigate("/login")
		}
	}

	useEffect(() => {
		if (userStatFinished) {
			dispatch(setUserInfo({ ...userInfo, stat: userStat.data }))
		}
	}, [userStat])

	useEffect(() => {
		if (userId != userInfo.mid) {
			navigate(`/user/${userInfo.mid}`)
		}
	}, [userInfo, userId])

	useEffect(() => {
		const targetTab = tabs.find((t) => t.name === tabName) ?? tabs[0]
		setActiveTab(targetTab)
	}, [tabName])

	return (
		<Wrapper>
			<section className='user-background'>
				<img
					src={userInfo.face}
					alt=''
				/>
			</section>
			<section className='user-info'>
				<img
					src={userInfo.face}
					alt='user-avator'
					className='user-avator'
				/>
				<p className='user-name'>
					<span>{userInfo.uname}</span>
					<Icon
						className='user-level-svg'
						name={`user_levels-l_${userInfo.level_info.current_level}`}
					/>
				</p>
				<p className='user-mid'>mid: {userInfo.mid}</p>
				<div className='user-info-stat'>
					<p className='user-info-stat-item'>
						<span className='num'>{userInfo.stat?.follower}</span>
						<span>follower</span>
					</p>
					<p className='user-info-stat-item'>
						<span className='num'>{userInfo.stat?.following}</span>
						<span>following</span>
					</p>
					<p className='user-info-stat-item'>
						<span className='num'>{userInfo.stat?.whisper}</span>
						<span>whisper</span>
					</p>
				</div>
			</section>
			<Tabs
				activeKey={activeTab.name}
				onChange={(key) => {
					navigate(`/user/${userInfo.mid}/${key}`)
				}}
				style={{ position: "sticky", top: 0 }}
			>
				{tabs.map((tab) => {
					return (
						<Tabs.Tab
							key={tab.name}
							title={tab.title} // todo logo + title
						>
							{tab.element}
						</Tabs.Tab>
					)
				})}
			</Tabs>

			<button onClick={handleClick}>logout</button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	.user-background {
		position: relative;
		width: 100%;
		height: 30vh;
		overflow: hidden;
		display: flex;
		align-items: center;

		img {
			width: 100%;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			backdrop-filter: blur(10px);
			background: rgba(0, 0, 0, 0.3);
		}
	}

	.user-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-top: ${px2vw`40px`};

		.user-avator {
			position: absolute;
			top: 0;
			transform: translateY(-50%);
			border-radius: 50%;
			width: ${px2vw`80px`};
			height: ${px2vw`80px`};
			box-shadow: var(--shadow);
		}

		& > p {
			margin: 5px;
		}

		.user-name {
			font-size: var(--font-size-l);
			font-weight: 600;
			margin-bottom: 0;
			display: flex;
			align-items: center;
			position: relative;

			.user-level-svg {
				width: 25px;
				position: absolute;
				right: 0;
				transform: translateX(105%);
			}
		}
		.user-mid {
			font-size: var(--font-size-s);
			color: var(--color-font-grey);
			background: var(--color-border);
			font-weight: 200;
			padding: 2px;
		}
		.user-info-stat {
			width: 100%;
			margin: 10px 0;
			display: flex;
			justify-content: space-around;

			.user-info-stat-item {
				display: grid;
				align-items: center;
				justify-items: center;

				span {
					margin: 2px;
				}
				.num {
					font-size: var(--font-size-m);
					font-weight: 600;
				}
			}
		}
	}

	.adm-tabs {
		width: 100%;

		.adm-tabs-header {
			position: sticky;
			top: 0;
			z-index: 10;
			background: var(--color-background);
		}
		.adm-tabs-content {
			padding: 0;
			.adm-list-body{
				border-top: none;
			}
		}
	}
`
