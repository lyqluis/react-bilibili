import styled from "styled-components"
import { Image } from "antd-mobile"
import { px2vw } from "../utils/style"
import Icon from "./Icon"
import { round10k, formatDuration } from "../utils/global"

export default function ListCard({ item }) {
	return (
		<Wrapper>
			<div className='item-pic'>
				<Image
					lazy
					fit='cover'
					width='100%'
					height='100%'
					src={`${item.pic}@480w_270h_1c.webp`}
				/>
				{item.is_union_video && <div className='pic-tag'>合作</div>}
				<div className='pic-duration'>{formatDuration(item.duration)}</div>
			</div>
			<div className='item-info'>
				<p
					className='item-info-title multi-ellipsis-line-2'
					dangerouslySetInnerHTML={{ __html: item.title }}
				/>
				<div className='item-info-detail'>
					<p className='creator'>
						<Icon
							name='up'
							className='icon'
						/>
						{item.author ?? item?.owner.name}
					</p>
					<p className='state'>
						<span className='play-amount'>
							<Icon
								name='play_count'
								className='icon'
							/>
							{round10k(item.play ?? item?.stat.view)}
						</span>
						<span className='danmaku-amount'>
							<Icon
								name='danmaku'
								className='icon'
							/>
							{round10k(item.danmaku ?? item?.stat.danmaku)}
						</span>
					</p>
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

		.pic-tag,
		.pic-duration {
			position: absolute;
			right: 5px;
			color: var(--color-background);
			font-size: var(--font-size-xs);
			font-weight: 100;
			padding: 0 2px;
			border-radius: 3px;
		}
		.pic-tag {
			top: 5px;
			background: var(--color-main);
		}
		.pic-duration {
			bottom: 5px;
			background: rgba(0, 0, 0, 0.5);
		}
	}

	.item-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-title {
			font-size: var(--font-size-xm);
		}

		&-detail {
			font-size: var(--font-size-xs);
			color: var(--color-font-grey);

			.icon {
				width: var(--font-size-m);
				height: var(--font-size-m);
				color: var(--color-font-grey);
				margin-right: 2px;
			}

			.creator {
				display: flex;
			}

			.state {
				display: flex;
				font-weight: 300;

				span {
					display: flex;
					align-items: center;
					margin-right: 10px;
				}
			}
		}
	}
`
