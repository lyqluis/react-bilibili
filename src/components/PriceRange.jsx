import { useState, useEffect } from "react"
import styled from "styled-components"

const validateInput = (value, type) => {
	if (type === "number") {
		return value.match(/(\d*)/)[1] ?? ""
	}
	// text
	return value
}

const Input = ({
	value = "",
	type = "text",
	placeholder,
	className,
	activeClassName,
	onChange,
	onFinished,
	...props
}) => {
	const [inputVal, setInputVal] = useState(value)
	const [active, setActive] = useState(false)
	const [inputPlaceholder, setInputPlaceholder] = useState(placeholder)

	const handleBlur = () => {
		if (!inputVal) setActive(false)
		onFinished && onFinished(inputVal)
	}
	const handleChange = (e) => {
		const val = validateInput(e.target.value, type)
		setInputVal(val)
		onChange && onChange(val)
	}

	useEffect(() => {
		setInputVal(value)
		setInputPlaceholder(placeholder)
	}, [value, placeholder])

	useEffect(() => {
		inputVal && setActive(true)
		setInputPlaceholder(active && !inputVal ? "" : placeholder)
	}, [active, inputVal])

	return (
		<input
			className={`${className} ${active ? activeClassName : ""}`}
			type={"text"}
			placeholder={inputPlaceholder}
			value={inputVal}
			onFocus={() => setActive(true)}
			onBlur={handleBlur}
			onInput={handleChange}
			{...props}
		/>
	)
}

const PriceRange = ({ priceCeil, priceFlow, onChange }) => {
	const [priceRange, setPriceRange] = useState([priceFlow, priceCeil])
	const handleChange = (value, index) => {
		// todo validate priceRange (priceFlow should smaller than priceCeil)
		let newPriceRange
		if (index) {
			newPriceRange = [priceRange[0], value]
		} else {
			newPriceRange = [value, priceRange[1]]
		}
		setPriceRange(newPriceRange)
		onChange && onChange(newPriceRange)
	}

	useEffect(() => {
		setPriceRange([priceFlow, priceCeil])
	}, [priceCeil, priceFlow])

	return (
		<PriceRangeWrapper>
			<Input
				type='number'
				placeholder='最低价'
				value={priceRange[0]}
				className='input'
				activeClassName='input-active'
				onFinished={(value) => handleChange(value, 0)}
			/>
			-
			<Input
				type='number'
				placeholder='最高价'
				value={priceRange[1]}
				className='input'
				activeClassName='input-active'
				onFinished={(value) => handleChange(value, 1)}
			/>
		</PriceRangeWrapper>
	)
}

const PriceRangeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: var(--font-size-s);
	.input {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: var(--font-size-s);
		padding: 10px;
		line-height: var(--font-size-s);
		border: none;
		border-radius: var(--radius);
		background: var(--color-border);
	}
	.input-active {
		background: var(--color-background);
		border-radius: var(--radius);
		outline: var(--color-main-4) solid 1px;
		color: var(--color-main-4);
	}
`

export default PriceRange
