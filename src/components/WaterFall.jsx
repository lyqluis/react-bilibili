import styled from "styled-components"
import { useState, useLayoutEffect, useRef } from "react"

const WaterFall = ({
	col = 2,
	padding = 10,
	gap = 10,
	children,
	onRender,	// () => {}
	onRenderFinished,	// () => {}
}) => {
	const containerRef = useRef(null)
	const [totalHeight, setTotalHeight] = useState(0)
	const heights = new Array(col).fill(0)

	useLayoutEffect(() => {
		onRender && onRender()
		const totalWidth = containerRef.current.offsetWidth
		const width = (totalWidth - padding * 2 - gap * (col - 1)) / col
		const nodeList = containerRef.current.children

		for (let i = 0, len = nodeList.length; i < len; i++) {
			const node = nodeList[i]
			node.style.width = `${width}px`
			const height = node.offsetHeight
			let minHeightIndex
			if (i < col) {
				minHeightIndex = i
			} else {
				const { i } = heights.reduce(
					(a, val, i) => {
						if (a.val > val) {
							a.val = val
							a.i = i
						}
						return a
					},
					{ val: Infinity, i: -1 }
				)
				minHeightIndex = i
			}

			node.style.position = "absolute"
			node.style.transform = `translate(${(width + gap) * minHeightIndex}px, 
        ${heights[minHeightIndex]}px)`
			heights[minHeightIndex] += gap + height
		}
		setTotalHeight(Math.max(...heights))
		onRenderFinished && onRenderFinished()
	}, [children])

	return (
		<Wrapper
			style={{ height: `${totalHeight}px` }} // 撑开内容高度
			ref={containerRef}
		>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	padding: 0 10px;
	position: relative;
	padding-bottom: calc(4.8vw * 2 + var(--font-size-xm));
`
export default WaterFall
