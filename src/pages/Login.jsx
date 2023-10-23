import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAuthState } from "../store/authSlice"
import QrCode from "../components/QrCode"
import styled from "styled-components"
import { px2vw } from "../utils/style"

const Login = () => {
	const isLoggedIn = useSelector(selectAuthState("isLoggedIn"))
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"

	if (isLoggedIn) {
		return (
			<Navigate
				to='/user'
				state={{ from: location }}
				replace
			/>
		)
	}

	return (
		<Wrapper>
			<QrCode from={from} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: calc(100vh - ${px2vw`65px`});
	display: grid;
	align-items: center;
	justify-items: center;
`

export default Login
