import styled from "styled-components"
import { px2vw } from "../utils/style"
import Icon from "./Icon"
import { Image } from "antd-mobile"
import { round10k } from "../utils/global"

export default function Card({ item, className }) {
	return (
		<Wrapper className={`video-list-item ${className}`}>
			<div className='video-list-item-pic'>
				<Image
					lazy
					fit='cover'
					width='100%'
					height='100%'
					src={`${item.pic}@480w_270h_1c.webp`}
				/>
				<div className='video-list-item-pic-info'>
					<span className='play-amount'>
						<Icon
							name='play_count'
							className='info-svg'
						/>
						{round10k(item.stat?.view ?? item.play)}
					</span>
					<span className='danmaku-amount'>
						<Icon
							name='danmaku'
							className='info-svg'
						/>
						{round10k(item.stat?.danmaku ?? item.video_review)}
					</span>
				</div>
			</div>
			<div className='video-list-item-des'>
				<p className='title multi-ellipsis-line-2'>{item.title}</p>
				<p className='creator'>
					<Icon
						name='up'
						className='up-icon'
					/>
					{item.owner?.name ?? item.author}
				</p>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	&.video-list-item {
		justify-items: stretch;
		align-items: stretch;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: var(--radius);
		background: var(--color-background);
		overflow: hidden;
		font-size: var(--font-size-xm);
		box-shadow: var(--shadow);

		.video-list-item-pic {
			position: relative;
			width: 100%;
			height: ${px2vw`97.03px`};

			&-info {
				width: 100%;
				display: flex;
				justify-content: space-between;
				position: absolute;
				bottom: 0;
				background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
				color: var(--color-background);
				font-weight: 200;
				font-size: var(--font-size-xs);
				padding: 1.33333vmin 1.6vmin;

				span {
					display: flex;
					align-items: center;

					.info-svg {
						width: var(--font-size-xm);
						height: var(--font-size-xm);
						color: var(--color-background);
						margin-right: 5px;
					}
				}
			}
		}

		.video-list-item-des {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			p {
				margin: ${px2vw`5px`};
				font-weight: 500;
			}

			.creator {
				display: flex;
				font-size: var(--font-size-xs);
				color: var(--color-font-grey);

				.up-icon {
					width: var(--font-size-xm);
					height: var(--font-size-xm);
					color: var(--color-font-grey);
					margin-right: 2px;
				}
			}
		}
	}
`
