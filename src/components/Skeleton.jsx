import { Skeleton } from "antd-mobile"
import styled from "styled-components"
import { px2vw } from "../utils/style"

export const ListCardSkeleton = ({ key }) => {
	return (
		<Wrapper key={key}>
			<div className='item-pic'>
				<Skeleton
					animated
					className='item-pic-skeleton'
				/>
			</div>
			<div className='item-info'>
				<Skeleton.Paragraph
					lineCount={2}
					animated
					className='item-info-title'
				/>
				<div className='item-info-detail'>
					<Skeleton
						animated
						className='item-info-detail-skeleton'
					/>
					<Skeleton
						animated
						className='item-info-detail-skeleton'
					/>
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;

	.item-pic {
		flex: none;
		position: relative;
		width: ${px2vw`139.98px`};
		height: ${px2vw`85.98px`};
		border-radius: var(--radius);
		overflow: hidden;
		margin-right: ${px2vw`10px`};

		&-skeleton {
			--width: 100%;
			--height: 100%;
		}
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-title {
			margin-top: 0;
			--height: var(--font-size-m);
			.adm-skeleton {
				margin-top: 0;
				margin-bottom: calc(var(--font-size-m) * 0.5);
			}
		}

		&-detail-skeleton {
			--width: 65%;
			--height: var(--font-size-s);
			margin-bottom: calc(var(--font-size-s) * 0.5);

			&:last-child {
				margin: 0;
			}
		}
	}
`

export const CardSkeleton = () => {
	return (
		<CardWrapper>
			<div className='video-list-item-pic'>
				<Skeleton
					animated
					className='video-list-item-pic-skeleton'
				/>
			</div>
			<div className='video-list-item-des'>
				<Skeleton.Paragraph
					lineCount={2}
					animated
					className='video-list-item-des-title-skeleton'
				/>
				<Skeleton
					animated
					className='video-list-item-des-creator-skeleton'
				/>
			</div>
		</CardWrapper>
	)
}

const CardWrapper = styled.div`
	justify-items: stretch;
	align-items: stretch;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: var(--radius);
	overflow: hidden;
	box-shadow: var(--shadow);

	.video-list-item-pic {
		width: 100%;
		height: ${px2vw`97.03px`};

		&-skeleton {
			--width: 100%;
			--height: 100%;
		}
	}

	.video-list-item-des {
		/* flex: 1; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-title-skeleton {
			margin: ${px2vw`5px`};
			.adm-skeleton {
				margin-top: 0;
				margin-bottom: calc(var(--font-size-m) * 0.5);
			}
		}
		&-creator-skeleton {
			margin: ${px2vw`5px`};
			--width: 65%;
			height: var(--font-size-s);
		}
	}
`

export const CardSkeletonList = (n) => {
	return new Array(n).fill(null).map((_, i) => <CardSkeleton key={i} />)
}
