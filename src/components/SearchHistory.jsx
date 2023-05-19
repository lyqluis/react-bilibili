import styled from "styled-components"
import { List } from "antd-mobile"
import Icon from "./Icon"

export default function SearchHistory({ words, onRemove, onClick }) {
	if (!words.length) {
		// todo
		return <p>还未搜索</p>
	}
	return (
		<List>
			{words.map((word) => {
				return (
					<List.Item
						key={word}
						arrow={false}
						onClick={() => onClick(word)}
					>
						<HistoryItem>
							<Icon
								name='history'
								className='icon'
							/>
							{word}
							<Icon
								name='x'
								className='icon no-margin'
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									onRemove(word)
								}}
							/>
						</HistoryItem>
					</List.Item>
				)
			})}
		</List>
	)
}

const HistoryItem = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	line-height: 1;

	.icon {
		width: var(--font-size-m);
		height: var(--font-size-m);
		color: var(--color-font-grey);
		margin-right: 5px;
	}

	.no-margin {
		margin: 0;
	}
`
