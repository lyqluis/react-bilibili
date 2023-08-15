import styled from "styled-components"
import Icon from "./Icon"

const Cell = ({
	className,
	title,
	children,
	rightIcon,
	onClick,
	hasMore,
	contentClass,
}) => {
	return (
		<Wrapper
			className={className}
			onClick={onClick}
		>
			<div className='cell-label'>{title}</div>
			<div className={`cell-content ${contentClass}`}>{children}</div>
			<div className='cell-right'>
				{hasMore && (
					<Icon
						name='more'
						className='right-svg'
					/>
				)}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	padding: 10px 0;
	display: flex;
	align-items: center;
	.cell-label {
		margin-right: 10px;
		min-width: 40px;
		font-size: var(--font-size-xm);
		font-weight: 500;
		color: var(--color-font-grey);
	}
	.cell-content {
		display: flex;
		flex: 1 1;
		overflow: hidden;
	}
	.cell-right {
		.right-svg {
			width: var(--font-size-m);
			height: var(--font-size-m);
			color: var(--color-font-grey);
		}
	}
`

export default Cell
