import { checkQRCode, getQRCodeImg, getQRCodeKey } from "../api/login"
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAuthState, setIsLoggedIn, setQrcode } from "../store/authSlice"
import Icon from "./Icon"
import styled, { keyframes } from "styled-components"
import { px2vw } from "../utils/style"
import { useNavigate } from "react-router-dom"

const QrCode = ({ from, to }) => {
	const [qrcodeStatus, setQrcodeStatus] = useState(null)
	const [isCodeLoading, setIsCodeLoading] = useState(false)
	const timer = useRef(null)
	const qrcode = useSelector(selectAuthState("qrcode"))
	const isCodeOutdated = qrcodeStatus?.code === 86038
	const isCodeScanned = qrcodeStatus?.code === 86090
	const isLoginSuccess = qrcodeStatus?.code === 0
	const showLayout = isCodeLoading || isCodeOutdated || isCodeScanned
	const showRefresh = isCodeLoading || isCodeOutdated

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const createQrcode = async () => {
		try {
			setIsCodeLoading(true)
			const res = await getQRCodeKey()
			console.log(res)
			const { url, qrcode_key } = res.data
			// store qrcode key & url
			const res2 = await getQRCodeImg(url)
			const { qrimg } = res2.data
			dispatch(setQrcode({ key: qrcode_key, url, img: qrimg }))
			setIsCodeLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	const clearQrcode = async () => {
		dispatch(setQrcode({ key: null, url: null, img: null }))
		setQrcodeStatus(null)
	}

	useEffect(() => {
		if (!qrcode.key) createQrcode()
	}, [])

	const checkQRCodeStatus = async (key) => {
		try {
			const res = await checkQRCode(key)
			console.log("check", res)
			setQrcodeStatus(res.data)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		console.log("qrcode existed")
		if (qrcode.img && qrcode.key && qrcode.url) {
			timer.current = setInterval(() => {
				checkQRCodeStatus(qrcode.key)
			}, 1000)
		}
		return () => {
			clearInterval(timer.current)
		}
	}, [qrcode])

	useEffect(() => {
		isCodeOutdated && clearInterval(timer.current)
	}, [isCodeOutdated])

	useEffect(() => {
		if (isLoginSuccess) {
			// set a logged in flag to the store / localstorage
			dispatch(setIsLoggedIn(true))

			// Send them back to the page they tried to visit when they were
			// redirected to the login page. Use { replace: true } so we don't create
			// another entry in the history stack for the login page.  This means that
			// when they get to the protected page and click the back button, they
			// won't end up back on the login page, which is also really nice for the
			// user experience.
			navigate(from, { replace: true })
		}
	}, [isLoginSuccess])

	const handleRefresh = async () => {
		if (isCodeOutdated) {
			await clearQrcode()
			createQrcode()
		}
	}

	return (
		<Wrapper>
			<Icon
				name='logo'
				className='login-logo'
			/>
			<div className='qrcode-wrapper'>
				{qrcode?.img && (
					<img
						src={qrcode.img}
						alt='qrcode_url'
					/>
				)}
				{showLayout && (
					<div
						className='qrcode-refresh'
						onClick={handleRefresh}
					>
						{showRefresh && (
							<Icon
								name='refresh'
								className={
									"qrcode-refresh-svg" +
									(isCodeLoading ? " qrcode-refresh-svg-rotate" : "")
								}
							/>
						)}
					</div>
				)}
			</div>
			<p className='qrcode-p'>请打开 App 扫码登陆</p>
			{qrcodeStatus?.message && (
				<p className='qrcode-detail'>{qrcodeStatus.message}</p>
			)}
		</Wrapper>
	)
}

const refreshRotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	width: 80%;
	margin: 0 auto;
	background: var(--color-main-negtive);
	border-radius: 10px;
	box-shadow: var(--shadow);

	.login-logo {
		width: 100%;
		height: 50px;
		margin: 20px;
		color: var(--color-main);
	}

	.qrcode-wrapper {
		position: relative;
		line-height: 0;
		width: ${px2vw`200px`};
		height: ${px2vw`200px`};
		border-radius: var(--radius);
		overflow: hidden;

		img {
			width: 100%;
		}

		.qrcode-refresh {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			backdrop-filter: blur(5px);
			background: rgba(0, 0, 0, 0.7);
			display: grid;
			align-items: center;
			justify-items: center;

			&-svg {
				color: var(--color-font-grey);
				color: var(--color-background);
				width: 30%;
				height: 30%;

				&-rotate {
					animation: ${refreshRotate} var(--duration) ease-in-out;
				}
			}
		}
	}

	.qrcode-p {
		margin: 10px;
		margin-top: 20px;
		font-size: var(--font-size-m);
		font-weight: 900;
		color: var(--color-main-5);
	}
	.qrcode-detail {
		font-size: var(--font-size-xm);
	}
`

export default QrCode
