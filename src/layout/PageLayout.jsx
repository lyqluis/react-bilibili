import { useEffect } from "react"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import { useState, useRef } from "react"
import { getScroller } from "../utils/global"
import { Outlet } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import useThrottle from "../hooks/useThrottle"

export default function PageLayout({
	header = <PageHeader />,
	children = <Outlet />,
	stickyEl,
}) {
	const [headerClass, setHeaderClass] = useState("page-header")
	const [lastY, setLastY] = useState(0)
	const refEl = useRef(null)
	const refScroller = useRef(null)

	const { run: throttledHandleScroll } = useThrottle(() => {
		const y =
			refScroller.current.scrollTop ??
			refScroller.current.scrollY ??
			refScroller.current.pageYOffset
		setLastY((oldVal) => {
			if (oldVal < y && parseInt(px2vw(y + "px")) >= parseInt(px2vw`45px`)) {
				setHeaderClass(`page-header hidden`)
				stickyEl && (stickyEl.current.style.top = 0)
			} else {
				setHeaderClass(`page-header`)
				stickyEl && (stickyEl.current.style.top = px2vw("45px"))
			}
			return y
		})
	}, 750)

	useEffect(() => {
		const el = (refScroller.current = getScroller(refEl.current))
		el.addEventListener("scroll", throttledHandleScroll)

		return () => {
			el.removeEventListener("scroll", throttledHandleScroll)
		}
	}, [])

	return (
		<Wrapper ref={refEl}>
			<header className={headerClass}>{header}</header>
			<div className='page-content'>{children}</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.page-header {
		width: 100%;
		position: fixed;
		top: 0;
		height: ${px2vw`45px`};
		background: var(--color-background);
		transition: all var(--duration) ease-in-out;
		z-index: 10;
	}
	.hidden {
		top: ${px2vw`-45px`};
	}
	.show {
		position: fixed;
		top: 0;
	}

	.page-content {
		padding-top: ${px2vw`45px`};
		position: relative;
		// adm-list no top border
		.adm-list-body {
			border-top: none;
		}
	}
`
