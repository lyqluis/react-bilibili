import { Skeleton } from "antd-mobile"
import styled from "styled-components"

export default function HotSearch({ list = [], onSelect, loading }) {
	if (loading) {
		const skeletons = new Array(10).fill(null).map((_, i) => (
			<Skeleton
				key={i}
				animated
				className='skeleton'
			/>
		))
		return <Wrapper className='hot-search-list'>{skeletons}</Wrapper>
	}

	return (
		<Wrapper className='hot-search-list'>
			{list.map((item) => {
				return (
					<p
						key={item.id}
						className='ellipsis-line-1'
						onClick={() => onSelect(item.keyword)}
					>
						<span className='num'>{item.id}</span>
						<span className='word ellipsis-line-1'>{item.keyword}</span>
						<i>
							{item.icon && (
								<img
									src={item.icon}
									alt={item.keyword}
								/>
							)}
						</i>
					</p>
				)
			})}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	&.hot-search-list {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 5px 10px;
		justify-items: stretch;
		align-items: start;

		p {
			width: 100%;
			font-size: var(--font-size-xm);
			overflow: hidden;
			position: relative;
			display: grid;
			grid-template-columns: auto 1fr auto;

			.num {
				margin-right: 5px;
				font-style: italic;
				font-weight: 600;
			}
			i {
				display: grid;
				justify-items: center;
				align-items: center;
				margin-left: 3px;
				img {
					height: var(--font-size-xm);
				}
			}
		}

		.skeleton {
			--height: var(--font-size-xm);
		}
	}
`
