import styled from "styled-components"
import { Image, Checkbox, Stepper } from "antd-mobile"
import { parseDate } from "../utils/global"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeCartItem } from "../store/mallSlice"

const parseDuration = (end, start = Date.now() / 1000) => {
	if (!start || !end) return
	let seconds = end - start
	const s = seconds % 60
	seconds -= s
	const min = (seconds / 60) % 60
	seconds -= min * 60
	const h = (seconds / 60 / 60) % 24
	seconds -= h * 60 * 60
	const d = seconds / 60 / 60 / 24
	console.log(d, h, min, s)
}

const CartItem = ({ item }) => {
	const product = item?.productInfo
	const preSale = product?.advState
	const preSaleEndOrderTime =
		preSale &&
		parseDate(preSale.presaleEndOrderTime, {
			connector: ".",
			needTime: false,
			needYear: true,
			needToday: false,
		})

	const dispatch = useDispatch()
	const changeNubmer = (val) => {
		dispatch(changeCartItem({ ...item, number: val }))
	}

	return (
		<ItemWrapper>
			<Checkbox value={item}></Checkbox>
			<div className='item-right'>
				<div className='item-right-img'>
					<Image
						src={item.img}
						alt=''
					/>
				</div>
				<div className='item-right-detail'>
					<div className='item-name'>{product.name}</div>
					<div className='item-standard'>
						<span>
							{product.itemsSkuListVO.specs[0]}: {item.specValues[0]}
						</span>
					</div>
					<div className='item-price-num'>
						<div className='price'>
							<p>{preSale ? `定金截止：${preSaleEndOrderTime}` : ""}</p>
							<p className='price-total'>
								{preSale ? `全款：¥${item.price}` : ""}
							</p>
							<p className=''>
								{preSale ? "定金：" : ""}¥
								<span className='price-num'>
									{preSale ? item.deposit : item.price}
								</span>
							</p>
						</div>
						<div className='count'>
							<p>
								{product.restriction && (
									<span className='extra-info'>
										限购{product.restriction}件
									</span>
								)}
							</p>

							<Stepper
								defaultValue={item.number}
								min={1}
								max={Math.min(product?.restriction, item?.stock)}
								onChange={(val) => changeNubmer(val)}
							/>
						</div>
					</div>
				</div>
			</div>
		</ItemWrapper>
	)
}

const ItemWrapper = styled.div`
	display: flex;
	.item-right {
		display: flex;
		&-img {
			flex: none;
			margin-right: 5px;
			width: 84px;
			height: 84px;
		}
		&-detail {
			.item-name {
				font-weight: 400;
			}
			.item-standard {
				margin: 3px 0;
				font-size: var(--font-size-xs);
				span {
					padding: 2px 3px;
					background: var(--color-border);
					border-radius: var(--radius);
				}
			}
			.item-price-num {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.price {
					flex: none;
					color: var(--color-main-4);
					font-size: var(--font-size-xxs);
					font-weight: 500;
					&-total {
						color: var(--color-font);
						font-weight: 400;
					}
					&-num {
						font-size: var(--font-size-m);
						font-weight: 500;
					}
				}
				.count {
					margin-left: 5px;
					font-size: var(--font-size-xxs);
					text-align: right;
					.extra-info {
						color: var(--color-main-4);
						font-size: var(--font-size-xxs);
						font-weight: 500;
					}
					.adm-stepper {
						--input-width: 10vw;
					}
				}
			}
		}
	}
`

export default CartItem
