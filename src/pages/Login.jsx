import { useLocation } from "react-router-dom"
import QrCode from "../components/QrCode"
import styled from "styled-components"

const Login = () => {
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"

	return (
		<Wrapper>
			<QrCode from={from} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	align-items: center;
	justify-items: center;
`

export default Login
