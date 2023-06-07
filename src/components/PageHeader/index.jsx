import { Dropdown } from "antd-mobile"
import { useLocation, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { menus } from "./constant"
import { useState, useRef, useEffect } from "react"
import Icon from "../Icon"
import { useSelector } from "react-redux"
import { selectAuthState } from "../../store/authSlice"

const pathReg = /(\/\w*)\/?/

export default function PageHeader({ left, center, right }) {
	const { pathname } = useLocation()
	const [activeMenu, setActiveMenu] = useState(menus[0])
	const dropdownRef = useRef(null)
	const authInfo = useSelector(selectAuthState("authInfo"))
	const navigate = useNavigate()

	useEffect(() => {
		const path = pathname.match(pathReg)
		setActiveMenu(menus.find((menu) => menu.path === path[1]))
	}, [])

	const changeMenu = (menu) => {
		setActiveMenu(menu)
		dropdownRef.current?.close() // auto close the dropdown
	}

	return (
		<Wrapper className='line-bottom-1px'>
			<div className='header-left'>
				{left ?? (
					<Icon
						name='logo'
						className='left-logo'
					/>
				)}
			</div>
			<div className='header-center'>
				{center ?? (
					<Dropdown ref={dropdownRef}>
						<Dropdown.Item
							key='selector'
							title={activeMenu.title}
						>
							<div className='header-menus'>
								{menus.map((menu) => {
									return (
										<Link
											to={menu.path}
											key={menu.title}
											onClick={() => changeMenu(menu)}
											className={activeMenu === menu ? "active" : ""}
										>
											{menu.title}
										</Link>
									)
								})}
							</div>
						</Dropdown.Item>
					</Dropdown>
				)}
			</div>
			<div className='header-right'>
				{authInfo?.face && (
					<img
						className='avator'
						src={authInfo.face}
						alt='avator'
						onClick={() => navigate("/user")}
					/>
				)}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: auto 1fr auto;

	.header-left {
		width: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.left-logo {
		width: 100%;
		color: var(--color-main-4);
	}

	.header-center {
		height: 100%;
		display: flex;
		justify-content: center;
		/* align-items: center; */

		.adm-dropdown {
			background: transparent;
		}
		.adm-dropdown .adm-dropdown-nav {
			height: 100%;
			border: none;
		}
		.adm-dropdown
			.adm-dropdown-nav
			.adm-dropdown-item
			.adm-dropdown-item-title {
			padding: 0;
			font-size: var(--font-size-m);
		}
	}

	.header-right {
		width: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.avator {
		position: absolute;
		right: 20px;
		width: 30px;
		height: 30px;
		overflow: hidden;
		border-radius: 50%;
		box-shadow: var(--shadow);
	}
`
