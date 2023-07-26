import styled from "styled-components"
import Icon from "./Icon"
import { px2vw } from "../utils/style"

// todo
const Header = ({
	left,
	center,
	right,
	leftIcon = "back",
	title,
	rightIcon,
	onClickLeft,
	onClickRight,
}) => {
	return (
		<Wrapper className='line-bottom-1px'>
			<div
				className='header-left'
				onClick={onClickLeft}
			>
				{left ?? (
					<Icon
						name={leftIcon}
						className='svg'
					/>
				)}
			</div>
			<div className='header-center'>{center ?? title}</div>
			<div
				className='header-right'
				onClick={onClickRight}
			>
				{right}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	position: relative;
	display: flex;
	align-items: center;

	.header-left,
	.header-right {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		padding: ${px2vw`10px`};
	}
	.header-left {
		left: 0;
	}
	.header-right {
		right: 0;
	}

	.svg {
		width: ${px2vw`30px`};
		height: ${px2vw`30px`};
	}

	.header-center {
		max-width: 60%;
		margin: 0 auto;
		/* height: 100%; */
		/* display: flex;
		justify-content: center;
		align-items: center; */
	}
`

export default Header
