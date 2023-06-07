import styled from "styled-components"
import { px2vw } from "../utils/style"

export default function Section({
	children,
	title,
	leftTitle,
	rightTitle,
	contentClass,
}) {
	return (
		<Wrapper>
			<div className='section-title'>
				<span className='sction-title-left'>{leftTitle}</span>
				<span className='sction-title-center'>{title}</span>
				<span className='sction-title-right'>{rightTitle}</span>
			</div>
			<div className={`section-content ${contentClass}`}>{children}</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	margin-bottom: 10px;
	background: var(--color-background);
	padding: ${px2vw`10px`};

	.section-title {
		font-size: var(--font-size-m);
		font-weight: 500;
		margin-bottom: 10px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;

		&-right {
			justify-self: end;
		}
	}
	.section-content {
		font-weight: 300;
		font-size: var(--font-size-xm);
	}
`
