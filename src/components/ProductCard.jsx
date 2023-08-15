import { Image } from "antd-mobile"
import styled from "styled-components"
import Icon from "./Icon"
import { logoSvg } from "../utils/mallHelper"
import { useNavigate } from "react-router-dom"

const NotProductImageCard = ({ item, size = "small", rank, isIp = false }) => {
	const height = size === "big" ? 156.5 : 75.5
	return (
		<NotProductImageWrapper>
			<Image
				src={item.imageUrl ?? item.imageUrls[0]}
				width='100%'
				height={height}
			/>
			{rank && <span className='rank'>{rank}</span>}
			{isIp && <span className='ip-bar'>{item.name}</span>}
		</NotProductImageWrapper>
	)
}

const NotProductImageWrapper = styled.div`
	width: 100%;
	position: relative;
	border-radius: var(--radius);
	background: var(--color-border);
	overflow: hidden;
	.rank {
		position: absolute;
		top: 0;
		left: 6px;
		width: 19px;
		height: 19px;
		border-radius: 0 0 var(--radius) var(--radius);
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		display: grid;
		align-items: center;
		justify-items: center;
		font-size: var(--font-size-s);
	}
	.ip-bar {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 1.33333vmin 1.6vmin;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
		color: var(--color-background);
		font-weight: 200;
		font-size: var(--font-size-xs);
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

// ## 根据不同的 type 定高
const ProductCard = ({ product }) => {
	let preTags, tags
	if (product.type === "mallitems" || product.type === "") {
		preTags = product.feedTag?.frontTag.slice() ?? []
		tags = product.feedTag?.underTag.slice() ?? []
		preTags.sort((a, b) => b.priority - a.priority)
		tags.sort((a, b) => b.priority - a.priority)
	}

	const navigate = useNavigate()
	const handleClick = () => {
		if (product.type === "mallitems") {
			console.log(product)
			navigate(`/shop/product/${product.itemsId}`)
		}
	}

	return (
		<Wrapper onClick={handleClick}>
			{/* mallitems */}
			{(product.type === "mallitems" || product.type === "") && (
				<>
					<Image
						src={`${product.imageUrls?.[0] ?? product.itemsImg}@1c.webp`}
						alt=''
						lazy
						width='100%'
						height={172.5}
						onLoad={() => {}}
						placeholder={<img src={logoSvg} />}
					/>
					<section className='info'>
						<p className='multi-ellipsis-line-2'>
							{preTags.length > 0 &&
								preTags.map((t) => {
									return (
										<i
											className='tag pretag'
											key={t.title}
										>
											{t.title}
										</i>
									)
								})}
							{product.title ?? product.name}
						</p>
						<p className='tags ellipsis-line-1'>
							{tags.map((t) => {
								return (
									<i
										className={
											"tag " + (t.priority > 1300 ? "first" : "second")
										}
										key={t.title}
									>
										{t.title}
									</i>
								)
							})}
						</p>
						<p className='bottom'>
							<span className='price-wrapper'>
								{product.priceDesc.map((price, i) => {
									return (
										<span
											className={i === 0 ? "price" : ""}
											key={`${price}_${i}`}
										>
											<i>{product.priceSymbol}</i>
											<i className='price-num'>{price}</i>
										</span>
									)
								})}
							</span>
							<span className='like'>
								<Icon
									name='heart'
									className='like-svg'
								/>
								{product.like}
							</span>
						</p>
					</section>
				</>
			)}
			{/* 抽奖频道 */}
			{product.type === "items_channel" && (
				<ChannelWrapper>
					<img
						src={product.titleImage}
						alt=''
						className='title-image'
					/>
					<p className='summary'>{product.summary}</p>
					<img
						src={product.imgVOs[0].itemImg}
						alt=''
						className='cover-img'
					/>
					<img
						src={product.coverImage}
						alt=''
						className='cover'
					/>
					<img
						src={product.buttonImg}
						alt=''
						className='button-image'
					/>
					<Image
						src={product.bgImage}
						width='100%'
						height={251.8}
						alt=''
					/>
				</ChannelWrapper>
			)}
			{/* 排行榜 */}
			{product.type === "phb" && (
				<PhbWrapper>
					<p className='phb-title'>{product.title}</p>
					<p className='phb-title-sub'>
						<Icon
							name='hot'
							className='phb-title-sub-svg'
						/>
						热度值 {product.hot}
					</p>
					<NotProductImageCard
						item={product.itemsList[0]}
						rank={1}
						size='big'
					/>
					<div className='second'>
						<NotProductImageCard
							item={product.itemsList[1]}
							rank={2}
						/>
						<NotProductImageCard
							item={product.itemsList[2]}
							rank={3}
						/>
					</div>
				</PhbWrapper>
			)}
			{/* 4 tiles */}
			{product.type === "four_tiles" && (
				<>
					<p className='top-title'>{product.title}</p>
					<div className='four-tiles-wrapper'>
						{product.ipList.map((ip) => {
							return (
								<NotProductImageCard
									key={ip.id}
									item={ip}
									isIp
								/>
							)
						})}
					</div>
				</>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	background: #ddd;
	background: var(--color-background);
	border-radius: var(--radius);
	box-shadow: var(--shadow);
	overflow: hidden;
	font-size: var(--font-size-xm);
	.top-title {
		margin-top: 8px;
		display: flex;
		justify-content: center;
		font-weight: 500;
	}

	.four-tiles-wrapper {
		padding: 8px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
	}

	.info {
		padding: 8px;
		.tags {
			display: flex;
			margin: 5px 0;
		}
		.tag {
			margin-right: 4px;
			padding: 2px 3px;
			border-radius: var(--radius);
			font-size: var(--font-size-xs);
			font-weight: 300;
			&.first {
				background: var(--color-main-detail);
				color: #fff;
			}
			&.second {
				background: var(--color-main-negative);
			}
		}
		.pretag {
			background: var(--color-border);
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			font-size: var(--font-size-s);
			color: var(--color-font-grey);
			.price-wrapper {
				span {
					margin-right: 5px;
				}
				.price {
					color: var(--color-main);
					.price-num {
						font-weight: 500;
						font-size: var(--font-size-m);
					}
				}
				.price-num {
					margin-left: 2px;
				}
			}
			.like {
				display: flex;
				align-items: center;
				&-svg {
					width: var(--font-size-xm);
					height: var(--font-size-xm);
					color: var(--color-font-grey);
				}
			}
		}
	}
`

const ChannelWrapper = styled.div`
	width: 100%;
	position: relative;

	.title-image {
		width: 100%;
		position: absolute;
		padding: 7px 15%;
	}
	.summary {
		width: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		top: 49px;
		font-size: var(--font-size-s);
		color: #fff;
	}
	.cover {
		width: 100%;
		position: absolute;
		padding: 0 7%;
		bottom: 56px;
		&-img {
			position: absolute;
			width: 100%;
			padding: 0 15%;
			bottom: 60px;
		}
	}

	.button-image {
		position: absolute;
		width: 100%;
		padding: 0 15%;
		bottom: 20px;
	}
`

const PhbWrapper = styled.div`
	padding: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 500;

	.phb-title-sub {
		margin: 3px auto;
		display: flex;
		font-weight: 400;
		font-size: var(--font-size-s);
		color: var(--color-font-grey);
		&-svg {
			width: var(--font-size-xm);
			height: var(--font-size-xm);
			color: var(--color-font-grey);
			margin-right: 5px;
		}
	}
	.second {
		margin-top: 5px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
	}
`

export default ProductCard
