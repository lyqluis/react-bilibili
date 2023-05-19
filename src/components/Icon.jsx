import styled from "styled-components"

export default function Icon({ name, className, onClick }) {
	const symbolId = `#icon-${name}`

	return (
		<Wrapper onClick={onClick}>
			<svg
				className={className}
				aria-hidden='true'
			>
				<use xlinkHref={symbolId} />
			</svg>
		</Wrapper>
	)
}

const Wrapper = styled.i`
	display: grid;
	align-items: center;
	justify-items: center;

	svg {
		width: 30px;
		height: 30px;
		color: #333;
		fill: currentColor; /* 改变填充颜色 */
		overflow: hidden;
	}
`
