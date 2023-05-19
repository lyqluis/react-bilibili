import { useNavigate } from "react-router-dom"
import Icon from "../components/Icon"
import styled from "styled-components"
import { selectChannelState } from "../store/channelSlice"
import { useSelector } from "react-redux"

export default function AllChannels() {
	const navigate = useNavigate()
	const channels = useSelector(selectChannelState("channels"))

	return (
		<Wrapper>
			{channels.map((channel) => (
				<div
					className='channel'
					key={channel.name}
					onClick={() => navigate(`/channel/${channel.name}`)}
				>
					<Icon name={`channels-${channel.name}`} />
					<p key={channel.name}>{channel.title}</p>
				</div>
			))}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: grid;
	flex-wrap: grid;
	grid-template-columns: repeat(4, 1fr);
	padding: 10px;

	.channel {
		display: grid;
		justify-items: center;
		align-items: center;
		margin: 10px;

		p {
			margin: 5px;
			font-size: var(--font-size-xm);
		}
	}
`
