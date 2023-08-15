import { useParams } from "react-router-dom"
import useRequest from "../hooks/useRequest"
import { getProductInfo } from "../api/mall"
import { useState, useEffect, useMemo } from "react"
import Section from "../components/Section"
import styled from "styled-components"
import { Image, Popup, Stepper, Swiper, Steps } from "antd-mobile"
import Icon from "../components/Icon"
import Cell from "../components/Cell"
import { useNavigate } from "react-router-dom"
import { couponUseDuration } from "../utils/mallHelper"
import { useDispatch, useSelector } from "react-redux"
import { selectMallCartCount, addToCart, setCart } from "../store/mallSlice"
import { clamp } from "../utils/global"

const Product = () => {
	const { id } = useParams()
	const { data, finished } = useRequest(() => getProductInfo(id))
	const [product, setProduct] = useState(null)
	const [showAttr, setShowAttr] = useState(false)
	const [showSku, setShowSku] = useState(false)
	const [showCoupon, setShowCoupon] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cartCount = useSelector(selectMallCartCount)

	const [picker, setPicker] = useState(null)
	const [number, setNumber] = useState(1)

	const sku = useMemo(() => product?.itemsSkuListVO, [product])
	const isSkuHasMore = sku?.itemsSkuList.length > 4
	const [skuList, skuListSlice] = useMemo(() => {
		if (!sku) return [[], []]
		return [
			sku.itemsSkuList,
			isSkuHasMore ? sku.itemsSkuList.slice(0, 3) : sku.itemsSkuList,
		]
	}, [sku, isSkuHasMore])

	const hasCoupon = product?.activityInfoVO?.couponList?.length > 0
	const hasActivity = product?.progressActivityInfoVO?.length > 0
	const isPreSale = product?.advState?.preSale

	const addItem = () => {
		dispatch(addToCart({ ...picker, productInfo: product, number }))
		setShowSku(false)
	}

	useEffect(() => {
		if (finished) {
			setProduct(data.data)
		}
	}, [data, finished])

	useEffect(() => {
		setPicker(isPreSale ? skuList[0] : skuList.find((item) => item.stock > 0))
	}, [skuList])

	if (!finished || !product) return <p>loading product</p>

	return (
		<Wrapper>
			<Section className='img-content'>
				<header className='page-header'>
					<div
						className='back-btn'
						onClick={() => navigate(-1)}
					>
						<Icon
							name='back'
							className='back-svg'
						/>
					</div>
					<div
						className='right-btn'
						onClick={() => navigate("/shop/cart")}
					>
						<Icon
							name='cart'
							className='back-svg'
						/>
						{cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
					</div>
				</header>
				<Swiper loop>
					{product.img.map((img, i) => {
						return (
							<Swiper.Item key={i}>
								<div className='product-img'>
									<Image src={img} />
								</div>
							</Swiper.Item>
						)
					})}
				</Swiper>
				{/* // todo ImageViewer*/}
				<div className='titles'>
					<div className='price'>
						{isPreSale ? "定金 " : ""}¥
						<b>{isPreSale ? product?.advState?.deposit : product.price}</b>
						{isPreSale ? " 起" : ""}
					</div>
					<div className='title'>
						<p className='name'>{product.name}</p>
						<div className='like'>
							<Icon
								name='heart'
								className='like-svg'
							/>
							{product.itemsLikeVO.count}
						</div>
					</div>
					{product?.itemTags?.length > 1 && (
						<div className='rank-tags line-top-1px'>
							{product.itemTags.map((tag) => {
								return (
									<p
										key={tag.name}
										className='tag'
									>
										{tag.name}
									</p>
								)
							})}
						</div>
					)}
				</div>
			</Section>

			{/* coupon section */}
			{(hasActivity || hasCoupon) && (
				<Section>
					{/* activityInfoVO */}
					{hasCoupon && (
						<>
							<Cell
								title='优惠'
								hasMore
								onClick={() => setShowCoupon(true)}
							>
								{product.activityInfoVO.couponList.slice(0, 2).map((coupon) => (
									<p
										className='coupon ellipsis-line-1'
										key={coupon.couponId}
									>
										{coupon.showName}
									</p>
								))}
							</Cell>
						</>
					)}
					{/* progressActivityInfoVO */}
					{hasActivity && (
						<>
							<Cell
								title='活动'
								hasMore
								onClick={() => setShowCoupon(true)}
							>
								{product.progressActivityInfoVO.slice(0, 1).map((activity) => (
									<p
										className='content-item'
										key={activity.activityId}
									>
										<span className='activity-name'>
											{activity.activityName}
										</span>
										<span className='activity-des'>{activity.description}</span>
									</p>
								))}
							</Cell>
						</>
					)}
					{/* coupon popup */}
					{(hasActivity || hasCoupon) && (
						<Popup
							visible={showCoupon}
							onMaskClick={() => setShowCoupon(false)}
							bodyStyle={{
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
							}}
						>
							<CouponPopupWrapper>
								<header>详细信息</header>
								{product?.progressActivityInfoVO?.length > 0 && (
									<div className='section-wrapper'>
										<p className='title'>促销活动</p>
										<div className='content'>
											{product.progressActivityInfoVO.map((activity) => (
												<p key={activity.activityId}>
													<span className='activity-name'>
														{activity.activityName}
													</span>
													<span className='activity-des'>
														{activity.description}
													</span>
												</p>
											))}
										</div>
									</div>
								)}
								{hasCoupon && (
									<div className='section-wrapper'>
										<p className='title'>优惠券</p>
										<div className='content'>
											{product.activityInfoVO.couponList.map((coupon) => (
												<div
													className='coupon-box'
													key={coupon.couponId}
												>
													<div className='coupon-des'>
														<p className='coupon-des-price'>
															¥<span>{coupon.discount}</span>
														</p>
														<p className='coupon-des-detail'>
															{coupon.couponTypeDesc}
														</p>
													</div>
													<div className='coupon-right'>
														<div className='coupon-info .ellipsis-line-1'>
															<p className='coupon-info-name'>
																{coupon.showName}
															</p>
															<p className='coupon-info-expire'>
																有效期：{couponUseDuration(coupon)}
															</p>
														</div>
														<div className='coupon-btn'>可领取</div>
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</CouponPopupWrapper>
						</Popup>
					)}
				</Section>
			)}

			<Section>
				{/* attr */}
				{product.attrList.length > 0 && (
					<>
						<Cell
							title='参数'
							hasMore
							onClick={() => setShowAttr(true)}
						>
							{product.attrList.map((attr, i) => (
								<p
									className='content-item'
									key={i}
								>
									{attr.attrName}
								</p>
							))}
						</Cell>
						<Popup
							visible={showAttr}
							onMaskClick={() => setShowAttr(false)}
							bodyStyle={{
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
							}}
						>
							<AttrPopupWrapper>
								<header>参数详细</header>
								{product.attrList.map((attr, i) => {
									return (
										<Cell
											key={i}
											title={attr.attrName}
											contentClass='attr-content'
										>
											{Array.isArray(attr.attrValue)
												? attr.attrValue.map((val) => val)
												: attr.attrValue}
										</Cell>
									)
								})}
							</AttrPopupWrapper>
						</Popup>
					</>
				)}
				{/* sku */}
				{sku && (
					<>
						<Cell
							title={sku.specs[0]}
							hasMore
							onClick={() => setShowSku(true)}
						>
							{skuListSlice.map((item, i) => (
								<div
									className='content-item'
									key={i}
								>
									<Image
										src={`${item.img}@1c.webp`}
										className='sku-img'
									/>
								</div>
							))}
							{isSkuHasMore && (
								<div className='content-item'>
									<div className='sku-img sku-img-more'>{`共${sku.itemsSkuList.length}款可选`}</div>
								</div>
							)}
						</Cell>
						<Popup
							visible={showSku}
							onMaskClick={() => setShowSku(false)}
							bodyStyle={{
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
							}}
						>
							<SkuPopupWrapper>
								<div className='img-price'>
									<div className='popup-img-wrapper'>
										<Image
											src={picker?.img}
											alt=''
											width={"100%"}
											height={100}
										/>
									</div>
									<div className='price-wrapper'>
										<div className='price'>
											{isPreSale ? "定金：" : ""}¥
											<b>{isPreSale ? picker?.deposit : picker?.price}</b>
										</div>
										{picker && (
											<div className='price'>
												{isPreSale ? "预售价" : "预估到手"} ¥
												<b>{picker.price * number}</b>
											</div>
										)}
									</div>
								</div>
								<div className='selectors'>
									<p>{sku.specs[0]}</p>
									<div className='selectors-wrapper'>
										{skuList.map((item) => {
											return (
												<p
													key={item.id}
													className={`selector ${picker === item && "active"} ${
														item.stock < 1 && !isPreSale && "disabled"
													}`}
													onClick={() => {
														if (item.stock > 1 || isPreSale) setPicker(item)
													}}
												>
													{item.specValues[0]}
												</p>
											)
										})}
									</div>
								</div>
								<div className='num-picker-wrapper line-bottom-1px line-top-1px'>
									<p>
										数量确认
										{product.restriction && (
											<span className='extra-info'>
												（每人限购{product.restriction}件）
											</span>
										)}
									</p>

									<Stepper
										defaultValue={1}
										min={1}
										max={Math.min(product?.restriction, picker?.stock)}
										onChange={(val) => setNumber(val)}
									/>
								</div>
								<div className='btns'>
									<button
										className='btn btn-outline'
										onClick={addItem}
									>
										加购物车
									</button>
									<button className='btn btn-solid'>立即购买</button>
								</div>
							</SkuPopupWrapper>
						</Popup>
					</>
				)}
				{/* presale */}
				{isPreSale && (
					<>
						<Cell
							title={
								<>
									预售
									<br />
									流程
								</>
							}
						>
							<div className='steps-wrapper'>
								<Steps>
									{product.advState?.state.map((state, i, arr) => {
										const { year, month, day } = state.timeNode
										const time = `${year}.${month}${day ? "." + day : ""}`
										const active = state.active
										const nextActive = arr[i + 1]?.active
										const status =
											active && nextActive
												? "finish"
												: active && !nextActive
												? "process"
												: "wait"
										return (
											<Steps.Step
												key={state.process}
												title={state.process}
												description={
													<p className={state.active ? "active" : ""}>{time}</p>
												}
												status={status}
											/>
										)
									})}
								</Steps>
							</div>
						</Cell>
					</>
				)}
				{/* commitment tags */}
				<div className='rank-tags line-top-1px'>
					{product.commitmentTag.map((tag) => {
						return (
							<p
								key={tag.name}
								className='tag'
							>
								{tag.name}
							</p>
						)
					})}
				</div>
			</Section>
			{product.mobileDesc && (
				<Section
					leftTitle='商品详情'
					contentClass='product-info-content'
				>
					<div dangerouslySetInnerHTML={{ __html: product.mobileDesc }}></div>
				</Section>
			)}
			<Section leftTitle='运费说明'>
				<span>
					不满足包邮条件的订单，江浙沪地区 10 元运费，其他地区 15
					元，实际订单运费请以结算页显示为准。可配送区域为中国大陆地区
					(除特殊偏远地区)，收件地址在此之外的区域请勿下单。
				</span>
			</Section>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background: var(--color-background-grey);
	header.page-header {
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		z-index: 1;
		display: flex;
		justify-content: space-between;

		.right-btn,
		.back-btn {
			flex: none;
			padding: 5px;
			border-radius: 50%;
			background: #ededed;
			display: flex;
			justify-content: center;
			align-items: center;
			.back-svg {
				width: 20px;
				height: 20px;
				color: var(--color-font-grey);
			}
		}
		.right-btn {
			position: relative;
			.cart-count {
				position: absolute;
				right: 0;
				top: -7px;
				padding: 0 2px;
				background: var(--color-main-4);
				border-radius: 50%;
				color: #fff;
				width: 15px;
				height: 15px;
				text-align: center;
				font-size: var(--font-size-xs);
			}
		}
	}

	.img-content {
		padding: 0;
		.titles {
			padding: 10px;
			.price {
				font-size: var(--font-size-xm);
				font-weight: 500;
				color: var(--color-main-4);
				b {
					font-size: var(--font-size-xl);
				}
			}
			.title {
				display: flex;
				padding-bottom: 10px;
				.name {
					font-size: var(--font-size-m);
					font-weight: 500;
				}
				.like {
					margin-left: 10px;
					font-size: var(--font-size-s);
					.like-svg {
						width: 20px;
					}
				}
			}
			.tag {
				background: var(--color-main-detail);
				color: #fff;
				font-size: var(--font-size-xm);
			}
		}
	}

	.content-item {
		margin-left: 10px;
		&:first-child {
			margin: 0;
		}

		.activity-name {
			padding: 0 2px;
			font-size: var(--font-size-xxs);
			border: 1px solid var(--color-main-4);
			color: var(--color-main-4);
		}
		.activity-des {
			margin-left: 5px;
			font-size: var(--font-size-xxs);
		}
	}

	.coupon {
		margin-left: 5px;
		font-size: var(--font-size-xxs);
		background: var(--color-main-negative);
		padding: 2px 3px;
		color: var(--color-main-5);
		border-radius: var(--radius);
		font-weight: 400;
		&:first-child {
			margin: 0;
		}
	}

	.sku-img {
		width: 50px;
		height: 50px;
		border-radius: var(--radius);
		background: var(--color-background-grey);
		&-more {
			padding: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: var(--font-size-s);
			text-align: center;
		}
	}
	.rank-tags {
		width: 100%;
		padding-top: 10px;
		display: flex;
		flex-wrap: wrap;
		.tag {
			flex: none;
			margin-bottom: 5px;
			margin-right: 5px;
			padding: 3px;
			border-radius: var(--radius);
			font-size: var(--font-size-s);
			font-weight: 400;
			background: var(--color-border);
			color: var(--color-font-grey);
		}
	}

	.section-title {
		font-size: var(--font-size-xm);
	}
	.product-info-content {
		width: 100%;
		overflow-x: hidden;
		img {
			width: 100%;
		}
	}

	.steps-wrapper {
		margin-right: 5px;
		border-radius: var(--radius);
		width: 100%;
		background: linear-gradient(
			90.01deg,
			#e47ca247 2.19%,
			rgba(255, 251, 245, 0.1) 115.35%
		);
		.adm-step {
			--line-to-next-color: #fff;
			--icon-color: #fff;
		}
		.adm-step-status-process {
			--icon-color: var(--color-main);
		}
		.adm-step-content {
			font-weight: 500;
			.adm-step-title {
				font-size: var(--font-size-xs);
			}
			.adm-step-description {
				font-size: var(--font-size-xxs);
				.active {
					color: var(--color-main);
				}
			}
		}
	}
`

const AttrPopupWrapper = styled.div`
	padding: 10px 20px;
	min-height: 80vh;
	header {
		text-align: center;
	}
	.attr-content {
		font-size: var(--font-size-xm);
	}
`
const SkuPopupWrapper = styled.div`
	padding: 10px 20px;
	max-height: 60vh;
	position: relative;

	.img-price {
		display: flex;
		margin-bottom: 10px;
		.popup-img-wrapper {
			background: var(--color-background);
			width: 100px;
			box-shadow: var(--shadow);
			border-radius: var(--radius);
			position: absolute;
			transform: translateY(-50%);
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		.price-wrapper {
			margin-left: 120px;
			.price {
				font-size: var(--font-size-xm);
				font-weight: 500;
				color: var(--color-main-4);
				b {
					font-size: var(--font-size-xl);
				}
			}
		}
	}
	.selectors {
		font-size: var(--font-size-xm);
		font-weight: 500;
		&-wrapper {
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			.selector {
				margin-right: 10px;
				margin-bottom: 10px;
				padding: 5px 10px;
				border-radius: 20px;
				border: 1px var(--color-border) solid;
				color: var(--color-font-grey);
				font-size: var(--font-size-xm);
				font-weight: 400;
				&.active {
					border-color: var(--color-main);
					color: var(--color-main);
				}
				&.disabled {
					background: var(--color-border);
				}
			}
		}
	}
	.num-picker-wrapper {
		margin: 10px 0;
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--font-size-xm);
		font-weight: 500;
		.extra-info {
			font-size: var(--font-size-s);
			font-weight: 300;
		}
		.num-picker {
			display: flex;
		}
	}
	.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.btn {
			flex-grow: 1;
			padding: 10px;
			font-size: var(--font-size-m);
			border-radius: 30px;
			margin: 5px;
			margin-right: 10px;
			outline: 0;
			border: 0;
			background: var(--color-background);
			&-outline {
				outline: 1px solid var(--color-main);
				color: var(--color-main);
			}
			&-solid {
				background: var(--color-main);
				color: var(--color-background);
			}
		}
	}
`
const CouponPopupWrapper = styled.div`
	padding: 10px 20px;
	min-height: 60vh;
	max-height: 80vh;
	overflow-y: scroll;
	header {
		text-align: center;
	}
	.section-wrapper {
		margin: 10px 0;
		.title {
			font-size: var(--font-size-xm);
			font-weight: 500;
		}
		.content {
			.activity-name {
				padding: 0 2px;
				font-size: var(--font-size-s);
				border: 1px solid var(--color-main-4);
				color: var(--color-main-4);
			}
			.activity-des {
				margin-left: 5px;
				font-size: var(--font-size-s);
			}
			.coupon-box {
				display: flex;
				margin: 5px 0;
				box-shadow: 0 0 3px 1px #efefef;
				border-radius: var(--radius);
				.coupon-des {
					flex: none;
					width: 100px;
					padding: 15px 5px;
					background: var(--color-main-negative);
					display: flex;
					flex-direction: column;
					justify-content: center;
					text-align: center;
					align-items: center;
					border-radius: var(--radius) 0 0 var(--radius);
					overflow: hidden;

					&-price {
						font-weight: 500;
						span {
							font-size: 30px;
						}
					}
					&-detail {
						font-size: var(--font-size-s);
						font-weight: 500;
					}
				}
				.coupon-right {
					position: relative;
					flex: auto;
					border-radius: 0 var(--radius) var(--radius) 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// border-1px
					&:after {
						position: absolute;
						content: "";
						top: 0;
						left: 0;
						width: 200%;
						height: 200%;
						border: 1px var(--color-border) solid;
						border-left: 0;
						border-radius: 0 calc(2 * var(--radius)) calc(2 * var(--radius)) 0;
						transform: scale(0.5);
						transform-origin: 0 0;
					}
					.coupon-info {
						margin-left: 5px;
						&-name {
							font-size: var(--font-size-xm);
							font-weight: 500;
						}
						&-expire {
							font-size: var(--font-size-xs);
							color: var(--color-font-grey);
						}
					}
					.coupon-btn {
						position: relative;
						margin: 0 10px;
						flex: none;
						font-size: var(--font-size-s);
						padding: 5px;
						color: var(--color-main-4);
						&::after {
							content: "";
							position: absolute;
							top: 0;
							left: 0;
							width: 200%;
							height: 200%;
							border: 1px solid var(--color-main-4);
							border-radius: calc(var(--radius) * 2);
							transform: scale(0.5);
							transform-origin: 0 0;
						}
					}
				}
			}
		}
	}
`

export default Product
