import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import PageLayout from "../layout/PageLayout"
import { useDispatch, useSelector } from "react-redux"
import { selectMallState, setCart } from "../store/mallSlice"
import { useMemo } from "react"
import Section from "../components/Section"
import { Image, List, Checkbox } from "antd-mobile"
import styled from "styled-components"
import CartItem from "../components/CartItem"
import { px2vw } from "../utils/style"
import { useState } from "react"

const Cart = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector(selectMallState("cart"))
	const { preSaleCart, saleCart } = useMemo(() => {
		const preSaleCart = cart.filter((p) => p?.productInfo?.advState?.preSale)
		const saleCart = cart.filter((p) => !p?.productInfo?.advState?.preSale)
		return { preSaleCart, saleCart }
	}, [cart])

	const [isDeleteMode, setIsDeleteMode] = useState(false)
	const checkAll = (checked) => {
		// if checked
		if (checked) {
			if (isDeleteMode) {
				// select all
				setCurrentSaleBill(saleCart)
				setPreSaleBill(preSaleCart)
			} else {
				if (saleCart.length) {
					setCurrentSaleBill(saleCart)
				} else if (preSaleCart.length) {
					setPreSaleBill(preSaleCart)
				}
			}
		} else {
			setCurrentSaleBill([])
			setPreSaleBill([])
		}
	}

	const [currentSaleBill, setCurrentSaleBill] = useState([])
	const [preSaleBill, setPreSaleBill] = useState([])
	const total = useMemo(() => {
		const isPreSaleBill = !!preSaleBill.length
		const bill = isDeleteMode
			? [...preSaleBill, ...currentSaleBill]
			: isPreSaleBill
			? preSaleBill
			: currentSaleBill
		return bill.reduce(
			(acc, p) => {
				acc.count += p.number
				acc.price += p.number * (isPreSaleBill ? p.deposit : p.price)
				return acc
			},
			{ count: 0, price: 0 }
		)
	}, [currentSaleBill, preSaleBill, isDeleteMode])

	const submitOrDelete = () => {
		if (isDeleteMode) {
			const deleteTargets = [...currentSaleBill, ...preSaleBill]
			const newCart = cart.filter((product) =>
				deleteTargets.some((p) => p.id != product.id)
			)
			dispatch(setCart(newCart))
		} else {
			// submit order...
		}
	}

	return (
		<PageLayout
			header={
				<Header
					title={`购物车(${cart.length})`}
					onClickLeft={() => navigate(-1)}
					right={isDeleteMode ? "完成" : "管理"}
					onClickRight={() => setIsDeleteMode(!isDeleteMode)}
				/>
			}
		>
			<Wrapper>
				{saleCart.length > 0 && (
					<Section>
						<Checkbox
							disabled={!isDeleteMode && preSaleBill.length > 0}
							indeterminate={
								currentSaleBill.length > 0 &&
								currentSaleBill.length < saleCart.length
							}
							checked={currentSaleBill.length === saleCart.length}
							onChange={(checked) => {
								setCurrentSaleBill(checked ? saleCart : [])
							}}
						>
							国内到货
						</Checkbox>
						<Checkbox.Group
							disabled={!isDeleteMode && preSaleBill.length > 0}
							value={currentSaleBill}
							onChange={(value) => setCurrentSaleBill(value)}
						>
							<List>
								{saleCart.map((item) => {
									return (
										<List.Item key={item.id}>
											<CartItem item={item} />
										</List.Item>
									)
								})}
							</List>
						</Checkbox.Group>
					</Section>
				)}

				{preSaleCart.length > 0 && (
					<Section>
						<Checkbox
							disabled={!isDeleteMode && currentSaleBill.length > 0}
							indeterminate={
								preSaleBill.length > 0 &&
								preSaleBill.length < preSaleCart.length
							}
							checked={preSaleBill.length === preSaleCart.length}
							onChange={(checked) => {
								setPreSaleBill(checked ? preSaleCart : [])
							}}
						>
							预售区
						</Checkbox>
						<Checkbox.Group
							disabled={!isDeleteMode && currentSaleBill.length > 0}
							value={preSaleBill}
							onChange={(value) => setPreSaleBill(value)}
						>
							<List>
								{preSaleCart.map((item) => {
									return (
										<List.Item key={item.id}>
											<CartItem item={item} />
										</List.Item>
									)
								})}
							</List>
						</Checkbox.Group>
					</Section>
				)}

				<footer>
					<Checkbox onChange={checkAll}>全选</Checkbox>
					<div className='footer-right'>
						{!isDeleteMode && (
							<p className='total-price'>
								合计：¥ <span className='total-price-num'>{total.price}</span>
							</p>
						)}
						<button
							className='buy-btn'
							onClick={submitOrDelete}
						>
							{isDeleteMode ? "删除" : "结算"} ({total.count})
						</button>
					</div>
				</footer>
			</Wrapper>
		</PageLayout>
	)
}

const Wrapper = styled.div`
	background: var(--color-border);
	padding-bottom: 62px;

	.adm-list-item-content {
		padding-right: 0;
	}
	footer {
		position: fixed;
		bottom: ${px2vw`70px`};
		left: 0;
		right: 0;
		background: var(--color-background);
		box-shadow: var(--shadow);
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.footer-right {
			display: flex;
			align-items: center;
			.total-price {
				margin-right: 10px;
				color: var(--color-main-4);
				font-size: var(--font-size-m);
				&-num {
					font-size: var(--font-size-l);
				}
			}
			.buy-btn {
				flex-grow: 1;
				padding: 10px;
				font-size: var(--font-size-m);
				border-radius: 30px;
				outline: 0;
				border: 0;
				background: var(--color-main);
				color: var(--color-background);
			}
		}
	}
`

export default Cart
