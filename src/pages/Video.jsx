import { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getVideoInfo, getPlayInfo, getVideoOnline } from "../api/video"
import { parseDate, round10k } from "../utils/global"
import Player from "../utils/player"
import Header from "../components/Header"
import styled from "styled-components"
import { px2vw } from "../utils/style"
import Icon from "../components/Icon"
import { useNavigate } from "react-router-dom"
import { Ellipsis, InfiniteScroll } from "antd-mobile"
import Card from "../components/Card"

// TODO some video play url got 403
const Video = () => {
	const navigate = useNavigate()
	const { bvid } = useParams()
	const video = useRef(null)
	const pagePlayer = useRef(null)
	const [videoInfo, setVideoInfo] = useState(null)
	const hotTag = videoInfo?.View?.honor_reply?.honor?.find(
		(tag) => tag.type === 4
	)
	const topTag = videoInfo?.View?.honor_reply?.honor?.find(
		(tag) => tag.type === 3
	)

	useEffect(() => {
		const fetchvideoInfo = async () => {
			const res = await getVideoInfo(bvid)
			const { View } = res.data
			const onlineRes = await getVideoOnline(bvid, View.cid)
			View.online = onlineRes.data
			console.log("video info", res)
			setVideoInfo(res.data)
		}
		// fetch the video's videoinfo & audioinfo
		const createVideo = async () => {
			const player = (pagePlayer.current = new Player(video.current, bvid))
			const res = await getPlayInfo(bvid)
			player.init(res)
		}

		if (pagePlayer.current) pagePlayer.current.destroy()
		fetchvideoInfo()
		createVideo()
	}, [bvid])

	return (
		<Wrapper>
			<header>
				<Header title='video page' onClickLeft={()=>navigate(-1)}/>
			</header>
			<video
				ref={video}
				width='100%'
				height='auto'
				controls
			>
				<source type='application/dash+xml' />
				Your browser does not support the video tag.
			</video>
			<h3>
				<div className='up-card'>
					<div className='up-avatar'>
						<img
							src={videoInfo?.Card?.card?.face}
							alt='up image'
						/>
					</div>
					<div className='up-info'>
						<p className='up-info-name'>{videoInfo?.Card?.card?.name}</p>
						<p className='up-info-stat'>
							<span>{round10k(videoInfo?.Card?.follower, true)}粉丝</span>
							<span>{videoInfo?.Card?.archive_count} 视频</span>
						</p>
					</div>
					{/* // TODO */}
					<div className='right-btns'>
						<div className='btn'>关注 / 已关注</div>
					</div>
				</div>
				<div className='video-title'>
					{hotTag ? (
						<div className='hot-tag'>
							<Icon
								name='hot'
								className='hot-tag-icon'
							/>
							{hotTag.desc}
						</div>
					) : null}
					{videoInfo?.View?.title}
				</div>
				{topTag ? (
					<div className='top-tag'>
						<Icon
							name='hot'
							className='top-tag-icon'
						/>
						{topTag.desc}
						<div
							className='right-btn'
							onClick={() => navigate("/rank")}
						>
							<Icon
								name='more'
								className='top-tag-icon-right'
							/>
						</div>
					</div>
				) : null}
				{/* // TODO onlick*/}
				{videoInfo && (
					<div className='desc'>
						<p className='desc-index'>
							<span className='desc-index-detail'>
								<Icon
									name='play_count'
									className='desc-index-detail-icon'
								/>
								<span>{round10k(videoInfo?.View?.stat?.view)}</span>
							</span>
							<span className='desc-index-detail'>
								<Icon
									name='danmaku'
									className='desc-index-detail-icon'
								/>
								<span>{videoInfo?.View?.stat?.danmaku}</span>
							</span>
							<span className='desc-index-detail'>
								<Icon
									name='watching'
									className='desc-index-detail-icon'
								/>
								<span>{videoInfo?.View?.online?.total}人正在看</span>
							</span>
							<span className='desc-index-detail'>
								{parseDate(videoInfo?.View?.ctime, {
									connector: ".",
									needTime: true,
									needYear: true,
									needToday: true,
								})}
							</span>
						</p>
						<div className='desc-text'>
							<Ellipsis
								content={videoInfo?.View?.desc}
								expandText='展开'
								collapseText='收起'
							></Ellipsis>
						</div>
					</div>
				)}
				<div className='three-btns'>
					<div className='three-btns-btn'>
						<Icon
							name='good_fill'
							className='three-btns-btn-icon'
						/>
						<p>{round10k(videoInfo?.View?.stat?.like)}</p>
					</div>
					<div className='three-btns-btn'>
						<Icon
							name='coin_fill'
							className='three-btns-btn-icon'
						/>
						<p>{round10k(videoInfo?.View?.stat?.coin)}</p>
					</div>
					<div className='three-btns-btn'>
						<Icon
							name='collection_fill'
							className='three-btns-btn-icon'
						/>
						<p>{round10k(videoInfo?.View?.stat?.favorite)}</p>
					</div>
					<div className='three-btns-btn'>
						<Icon
							name='good_fill'
							className='three-btns-btn-icon dislike'
						/>
						<p>{round10k(videoInfo?.View?.stat?.dislike)}</p>
					</div>
					<div className='three-btns-btn'>
						<Icon
							name='share_fill'
							className='three-btns-btn-icon'
						/>
						<p>{round10k(videoInfo?.View?.stat?.share)}</p>
					</div>
				</div>
				{videoInfo?.Tags && (
					<div className='tags'>
						{videoInfo?.Tags.map((tag) => {
							return (
								<div
									className='tag'
									key={tag.tag_id}
								>
									{tag.tag_name}
								</div>
							)
						})}
					</div>
				)}
			</h3>
			<div className='related-videos line-top-1px'>
				<p className='video-list-title'>相关推荐</p>
				<div className='video-list'>
					{videoInfo?.Related.map((item) => {
						return (
							<Card
								item={item}
								key={item.aid}
							/>
						)
					})}
				</div>
				{/* // TODO load more */}
				<InfiniteScroll
					// loadMore={false}
					hasMore={false}
				/>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	header {
		height: ${px2vw`45px`};
		background: var(--color-background);
		z-index: 1;
	}
	video {
		background: var(--color-background);
		position: sticky;
		top: 0;
		z-index: 1;
		box-shadow: 0 5px 5px 2px rgba(0, 0, 0, 0.1);
	}
	.up-card {
		margin: 10px 0;
		padding: 0 12px;
		display: flex;
		align-items: center;
		position: relative;

		.up-avatar {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.up-info {
			margin-left: 12px;
			&-name {
				font-size: var(--font-size-xm);
				color: var(--color-main-4);
			}
			&-stat {
				span {
					margin-right: 10px;
					font-size: var(--font-size-xs);
					color: var(--color-font-grey);
				}
			}
		}
		.right-btns {
			position: absolute;
			right: 12px;
		}
	}
	.video-title {
		padding: 0 12px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-m);
		.hot-tag {
			margin-right: 5px;
			padding: 2px 7px;
			display: flex;
			align-items: center;
			font-size: var(--font-size-s);
			color: var(--color-main-4);
			background: var(--color-background-grey);
			border-radius: 10px;
			&-icon {
				margin-right: 3px;
				color: var(--color-main-4);
				width: var(--font-size-xs);
				height: var(--font-size-xs);
			}
		}
	}
	.top-tag {
		margin: 10px 12px;
		padding: 7px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-s);
		font-weight: 600;
		color: var(--color-main-4);
		background: #f8c0da44;
		border-radius: var(--radius);
		position: relative;
		&-icon {
			margin-right: 5px;
			color: var(--color-main-4);
			width: var(--font-size-s);
			height: var(--font-size-s);
		}
		&-icon-right {
			position: absolute;
			right: 7px;
			color: var(--color-main-4);
			width: var(--font-size-s);
			height: var(--font-size-s);
		}
	}
	.desc {
		padding: 0 12px;
		font-size: var(--font-size-s);
		color: var(--color-font-grey);
		--adm-color-primary: var(--color-main-4);

		&-index {
			display: flex;
			align-items: center;

			&-detail {
				display: flex;
				align-items: center;
				margin-right: 7px;
				font-weight: 300;

				&-icon {
					width: var(--font-size-xm);
					height: var(--font-size-xm);
					color: var(--color-font-grey);
					margin-right: 3px;
				}
			}
		}
		&-text {
			white-space: pre-wrap;
			font-weight: 400;
		}
	}
	.three-btns {
		margin: 10px 0;
		padding: 0 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			&-icon {
				width: ${px2vw`22px`};
				height: ${px2vw`22px`};
				color: var(--color-font-grey);
			}
			.dislike {
				transform: scaleX(-1) rotate(180deg);
			}
			p {
				font-size: var(--font-size-s);
				color: var(--color-font-grey);
				margin: 5px auto;
			}
		}
	}
	.tags {
		padding: 0 12px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.tag {
			margin: 5px 10px 5px 0;
			padding: 3px 10px;
			font-size: var(--font-size-s);
			color: var(--color-font-grey);
			background: var(--color-background-grey);
			border-radius: 20px;
		}
	}
	.related-videos {
		margin-top: 10px;
		padding: 12px;
		.video-list {
			display: grid;
			grid-template-columns: auto auto;
			grid-gap: ${px2vw`10px`};
			&-title {
				font-size: var(--font-size-xm);
				font-weight: 400;
				margin-bottom: 10px;
			}
		}
	}
`

export default Video
