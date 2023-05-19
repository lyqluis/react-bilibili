import styled from "styled-components"
import { List } from "antd-mobile"
import { px2vw } from "../utils/style"

export default function SearchSuggestion({ list = [], onSelect, loading }) {
	if (loading) {
		return 
	}
	return (
		<Wrapper>
			<List>
				{list.map((item) => {
					return (
						<List.Item
							key={item.id ?? item.value ?? item.name}
							arrow={false}
							onClick={() => onSelect(item.value ?? item.term ?? item.name)}
						>
							{item.name}
						</List.Item>
					)
				})}
			</List>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background: var(--color-background);
	font-size: var(--font-size-xm);
	font-weight: 300;
	padding-left: ${px2vw`10px`};
	padding-right: ${px2vw`10px`};
`
