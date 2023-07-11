import { useState, useEffect, useMemo } from "react"
import { logout } from "../api/login"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
	selectUserState,
	setUserInfo,
	setStat,
	resetUserState,
} from "../store/userSlice"
import { getUserInfo, getUserStat } from "../api/user"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import Icon from "../components/Icon"
import { Tabs } from "antd-mobile"
import HistoryTab from "../components/HistoryTab"
import CollectionTab from "../components/CollectionTab"
import DynamicTab from "../components/DynamicTab"
import VideoTab from "../components/VideoTab"
import { selectAuthState } from "../store/authSlice"
import useRequest from "../hooks/useRequest"

const TABS = [
	{
		title: "动态",
		name: "space",
		logo: "fav",
		Element: DynamicTab,
		requireAuth: false,
	},
	{
		title: "视频",
		name: "video",
		logo: "fav",
		Element: VideoTab,
		requireAuth: false,
	},
	{
		title: "收藏",
		name: "favorite",
		logo: "fav",
		Element: CollectionTab,
		requireAuth: true,
	},
	{
		title: "历史",
		name: "history",
		logo: "fav",
		Element: HistoryTab,
		requireAuth: true,
	},
]

export default function User() {
	const userInfo = useSelector(selectUserState("userInfo"))
	const stat = useSelector(selectUserState("stat"))
	const authInfo = useSelector(selectAuthState("authInfo"))
	const { userId, tabName } = useParams()
	const tabs = useMemo(() => {
		if (userId == authInfo.mid) {
			return TABS
		} else {
			return TABS.filter((tab) => !tab.requireAuth)
		}
	}, [userId])
	const [activeTab, setActiveTab] = useState(tabs[0])
	const {
		data: userData,
		finished: userDataFinished,
		request: fetchUserInfo,
	} = useRequest(() => getUserInfo(parseInt(userId)), {
		manual: true,
		deps: [userId],
	})

	const {
		data: statData,
		finished: statDataFinished,
		request: fetchUserStat,
	} = useRequest(() => getUserStat(parseInt(userId)), {
		manual: true,
		deps: [userId],
	})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		const res = await logout()
		if (res.status && res.code === 0) {
			navigate("/login")
		}
	}

	useEffect(() => {
		if (!userId) {
			// redirect
			navigate(`/user/${authInfo.mid}`)
		} else if (userId != userInfo?.card?.mid) {
			// fetch data
			fetchUserInfo()
			fetchUserStat()
			// reset user's data
			dispatch(resetUserState())
		}
	}, [userId])

	useEffect(() => {
		if (userDataFinished) {
			dispatch(setUserInfo(userData.data))
		}
	}, [userData])

	useEffect(() => {
		if (statDataFinished) {
			dispatch(setStat(statData.data))
		}
	}, [statData])

	useEffect(() => {
		if (tabName) {
			const targetTab = tabs.find((t) => t.name === tabName) ?? tabs[0]
			setActiveTab(targetTab)
		}
	}, [tabName])

	if (!userInfo.card) return <h1>loading</h1>

	return (
		<Wrapper>
			<section className='user-background'>
				<img
					src={userInfo?.card?.face}
					alt=''
				/>
			</section>

			<section className='user-info'>
				<img
					src={userInfo.card?.face}
					alt='user-avator'
					className='user-avator'
				/>
				<p className='user-name'>
					<span>{userInfo.card?.name}</span>
					<Icon
						className='user-level-svg'
						name={`user_levels-l_${userInfo.card.level_info.current_level}`}
					/>
				</p>
				<p className='user-mid'>mid: {userInfo.card.mid}</p>
				<div className='user-info-stat'>
					<p className='user-info-stat-item'>
						<span className='num'>{stat.follower}</span>
						<span>follower</span>
					</p>
					<p className='user-info-stat-item'>
						<span className='num'>{stat.following}</span>
						<span>following</span>
					</p>
					<p className='user-info-stat-item'>
						<span className='num'>{stat?.whisper}</span>
						<span>whisper</span>
					</p>
				</div>
			</section>

			{/* // todo */}
			<button onClick={handleClick}>logout</button>

			<Tabs
				activeKey={activeTab.name}
				onChange={(key) => {
					navigate(`/user/${userInfo.card.mid}/${key}`)
				}}
				style={{ position: "sticky", top: 0 }}
			>
				{/* // todo not auth user slice the tabs */}
				{tabs.map((tab) => {
					return (
						<Tabs.Tab
							key={tab.name}
							title={tab.title}
						>
							<tab.Element uid={userId} />
						</Tabs.Tab>
					)
				})}
			</Tabs>
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
			.adm-list-body {
				border-top: none;
			}
		}
	}
`
