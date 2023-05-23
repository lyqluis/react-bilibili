import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import { logout } from "../api/login"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectUserState, setUserInfo } from "../store/userSlice"
import { getUserStat } from "../api/user"
import styled from "styled-components"
import { px2vw } from "../utils/style"

export default function User() {
	const userInfo = useSelector(selectUserState("userInfo"))
	const { data: userStat, finished: userStatFinished } = useFetch(() =>
		getUserStat(userInfo.mid)
	)
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
				<p className='user-name'>{userInfo.uname}</p>
				<p className='user-mid'>{userInfo.mid}</p>
				<div className='user-info-stat'>
					<span>follower: {userInfo.stat.follower}</span>
					<span>following: {userInfo.stat.following}</span>
				</div>
			</section>
			<button onClick={handleClick}>logout</button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

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
		}
	}
`
