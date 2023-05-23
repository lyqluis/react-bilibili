import { Dropdown } from "antd-mobile"
import { useLocation, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { menus } from "./constant"
import { useState, useRef, useEffect } from "react"
import Icon from "../Icon"
import { useSelector } from "react-redux"
import { selectUserState } from "../../store/userSlice"

const pathReg = /(\/\w*)\/?/

export default function PageHeader() {
	const { pathname } = useLocation()
	const [activeMenu, setActiveMenu] = useState(menus[0])
	const dropdownRef = useRef(null)
	const userInfo = useSelector(selectUserState("userInfo"))
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
			<Icon
				name='logo'
				className='left-logo'
			/>
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
			<div className='header-right'>
				{userInfo?.face && (
					<img
						className='avator'
						src={userInfo.face}
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

	.left-logo {
		width: 30vw;
		color: var(--color-main-4);
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
