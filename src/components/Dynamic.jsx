import Section from "./Section"
import Icon from "./Icon"
import { isLongPic, parseDate } from "../utils/global"
import { round10k, formatDuration } from "../utils/global"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Ellipsis, Image } from "antd-mobile"
import { ImageViewer } from "antd-mobile"
import { useRef, useState } from "react"

const DynamicImage = ({ pic, onClick, isNinePatternGrid }) => {
	return (
		<DynamicImageWrapper onClick={onClick}>
			<Image
				lazy
				key={pic.img_src}
				src={`${pic.img_src}@${isNinePatternGrid ? "240w_240h_" : ""}1c.webp`}
				width='100%'
				height='100%'
			/>
			{isLongPic(pic) && <LabelWrapper className='label'>长图</LabelWrapper>}
		</DynamicImageWrapper>
	)
}

const DynamicImageWrapper = styled.div`
	position: relative;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius);
	}

	.label {
		right: 2.5px;
		bottom: 2.5px;
	}
`

const Dynamic = ({ item, isOrigin }) => {
	const navigate = useNavigate()
	const imgViewerRef = useRef(null)
	const [isViewerShow, setIsViewerShow] = useState(false)

	if (!item) return null

	// {card, desc, display, extend_json,extra} = item
	const { desc, extra } = item
	// console.log("item", item)
	const card = JSON.parse(item?.card ?? item)
	const type = card.aid ? "video" : card.item?.content ? "repost" : "dynamic"
	// const user = type === "pics" ? card.user : card.owner
	let content, user, picCount
	if (type === "video") {
		//  video{Object} = card
		user = card.owner
		// const { face, mid, name } = user
		content = card.dynamic
	} else if (type === "repost") {
		// const { item, origin, origin_user, origin_extend_json, user } = card
		user = card.user
		// const { face, uid, uname } = card.user
		content = card.item.content
	} else if (type === "dynamic") {
		// const { item, user } = card
		user = card.user
		// const { head_url, uid, name } = card.user
		content = card.item.description
		picCount = card.item.pictures_count
	}
	// console.log("card", card, "origin", origin, "type", type, "user", user)
	const isNinePatternGrid = picCount > 1

	const viewImg = (i) => {
		imgViewerRef.current.swipeTo(i)
		setIsViewerShow(true)
	}

	return (
		<Wrapper>
			<Section
				className={isOrigin && "origin-card"}
				leftTitle={
					<div className='dynamic-avator'>
						{!isOrigin && <img src={user.face ?? user.head_url} />}
						<div className='dynamic-avator-info'>
							<p
								className='nickname'
								onClick={() => navigate(`/user/${user.mid ?? user.uid}`)}
							>
								{isOrigin && <span>@</span>}
								{user.uname ?? user.name}
							</p>
							{!isOrigin && (
								<p className='post_time'>{parseDate(desc.timestamp)}</p>
							)}
						</div>
					</div>
				}
				rightTitle={
					!!extra?.is_space_top && (
						<span className='pinned-label'>
							<Icon
								name='top'
								className='pinned-svg'
							/>
							置顶
						</span>
					)
				}
			>
				<Ellipsis
					content={content}
					rows={4}
					direction='end'
					expandText='展开'
					collapseText='收起'
				/>

				{type === "dynamic" && (
					<article className={"pics " + (isNinePatternGrid && "pics-9")}>
						{card.item.pictures.map((p, i) => {
							return (
								<DynamicImage
									key={p.img_src}
									pic={p}
									isNinePatternGrid={isNinePatternGrid}
									onClick={() => viewImg(i)}
								/>
							)
						})}
						<ImageViewer.Multi
							ref={imgViewerRef}
							getContainer={() => document.getElementById("root")}
							images={card.item.pictures.map((p) => p.img_src)}
							visible={isViewerShow}
							onClose={() => setIsViewerShow(false)}
						/>
					</article>
				)}

				{type === "video" && (
					<article className='video'>
						<div className='video-pic'>
							<img
								src={card.pic}
								alt={card.desc}
							/>
							<LabelWrapper className='duration'>
								{formatDuration(card.duration)}
							</LabelWrapper>
							<LabelWrapper className='danmaku'>
								<Icon
									name='danmaku'
									className='svg'
								/>
								{round10k(card.stat.danmaku)}
							</LabelWrapper>
						</div>
						<p className='title'>{card.title}</p>
					</article>
				)}

				{type === "repost" && (
					<Dynamic
						item={card.origin}
						isOrigin
					/>
				)}

				{!isOrigin && (
					<footer className='dynamic-footer'>
						<div className='footer-btn'>
							<Icon
								name='redo'
								className='svg'
								style={{ transform: "rotateY(180deg)" }}
							/>
							<span>{round10k(desc.repost ?? 0)}</span>
						</div>
						<div className='footer-btn'>
							<Icon
								name='comment'
								className='svg'
							/>
							<span>{round10k(desc.comment ?? card?.stat?.reply ?? 0)}</span>
						</div>
						<div className='footer-btn'>
							<Icon
								name='good'
								className={`svg ${desc.is_liked && "active"}`}
							/>
							<span className={`${desc.is_liked && "active"}`}>
								{round10k(desc.like ?? 0)}
							</span>
						</div>
					</footer>
				)}
			</Section>
		</Wrapper>
	)
}

const LabelWrapper = styled.p`
	display: flex;
	position: absolute;
	bottom: 5px;
	color: var(--color-background);
	font-size: var(--font-size-xs);
	font-weight: 100;
	padding: 0 2px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.5);

	.svg {
		margin-right: 5px;
		width: var(--font-size-s);
		height: var(--font-size-s);
		color: var(--color-background);
	}
`

const Wrapper = styled.div`
	.origin-card {
		background: var(--color-background-grey);
		border-radius: var(--radius);
		margin: 5px 0;
	}

	.dynamic-avator {
		display: flex;

		img {
			border-radius: 50%;
			width: 40px;
			height: 40px;
			margin-right: 10px;
		}

		&-info {
			font-size: var(--font-size-xm);
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.post_time {
				font-weight: 300;
				color: var(--color-font-grey);
			}
		}
	}

	.pinned-label {
		padding: 2px 5px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-xs);
		color: var(--color-main);
		font-weight: 400;
		background: var(--color-main-negative);
		border-radius: var(--radius);
		opacity: 0.75;

		.pinned-svg {
			margin-right: 5px;
			width: var(--font-size-s);
			height: var(--font-size-s);
			color: var(--color-main);
		}
	}

	.adm-ellipsis {
		margin-bottom: 10px;
		white-space: pre-wrap;
	}

	article {
		margin: 10px 0px;
		display: grid;
	}

	.pics {
		&-4 {
			grid-gap: 7px;
			grid-template-columns: repeat(2, 1fr);
			justify-items: stretch;
			align-items: stretch;
		}
		&-9 {
			grid-gap: 5px;
			grid-template-columns: repeat(3, 1fr);
			justify-items: stretch;
			align-items: stretch;
		}
	}

	.video {
		&-pic {
			position: relative;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: var(--radius);
			}
			p {
				display: flex;
				position: absolute;
				bottom: 5px;
				color: var(--color-background);
				font-size: var(--font-size-xs);
				font-weight: 100;
				padding: 0 2px;
				border-radius: 3px;
				background: rgba(0, 0, 0, 0.5);

				.svg {
					margin-right: 5px;
					width: var(--font-size-s);
					height: var(--font-size-s);
					color: var(--color-background);
				}
			}

			.danmaku {
				left: 5px;
			}

			.duration {
				right: 5px;
			}
		}
		.title {
			margin-top: 5px;
			font-size: var(--font-size-xm);
			font-weight: 500;
		}
	}

	.dynamic-footer {
		padding: 5px 0;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.footer-btn {
			display: flex;
			align-items: center;
			.svg {
				width: var(--font-size-m);
				height: var(--font-size-m);
				color: var(--color-font-grey);
			}
			.active {
				color: var(--color-main);
			}
			span {
				margin-left: 5px;
				color: var(--color-font-grey);
				font-size: var(--font-size-s);
			}
		}
	}
`

export default Dynamic
