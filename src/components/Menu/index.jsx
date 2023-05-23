import styled from "styled-components"
import { menu } from "./constant"
import { Link } from "react-router-dom"
import Icon from "../Icon"
import { useDispatch, useSelector } from "react-redux"
import { changeMenuIndex } from "./slice"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { px2vw } from "../../utils/style"

export default function Menu() {
	const currentMenu = useSelector((state) => menu[state.menu.currentIndex])
	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		const newIndex = menu.findIndex((item) => {
			if (location.pathname === "/login") {
				return item.path === "/user"
			}
			if (item.path !== "/") {
				return location.pathname.includes(item.path)
			}
			return item.path === location.pathname
		})
		dispatch(changeMenuIndex(newIndex < 0 ? 0 : newIndex))
	}, [location])

	return (
		<Wrapper>
			{menu.map((item, i) => {
				return (
					<Link
						className={`menu-item ${currentMenu === item ? "active" : ""}`}
						to={item.path}
						key={item.name}
						onClick={() => dispatch(changeMenuIndex(i))}
					>
						<Icon
							name={item.logo}
							className='menu-item-svg'
						/>
						<p>{item.title}</p>
					</Link>
				)
			})}
		</Wrapper>
	)
}

const Wrapper = styled.menu`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	/* height: ${px2vw`50px`}; */
	background: var(--color-background);
	padding: ${px2vw`5px`};
	display: flex;
	justify-content: space-around;
	box-shadow: var(--shadow);

	.menu-item {
		/* background: lightcoral; */
		font-size: var(--font-size-xm);
		margin: ${px2vw`5px`};
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--color-font-grey);

		&-svg {
			color: var(--color-font-grey);
			width: 100%;
		}

		&.active {
			color: var(--color-main);
			.menu-item-svg {
				color: var(--color-main);
			}
		}
	}
`
