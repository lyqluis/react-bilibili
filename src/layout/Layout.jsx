import Menu from "@/components/Menu"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { px2vw } from "../utils/style"

export default function Layout() {
	return (
		<Wrapper>
			<div className='page'>
				<Outlet></Outlet>
			</div>
			<Menu></Menu>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.page {
		padding-bottom: ${px2vw`65px`};
	}
`
