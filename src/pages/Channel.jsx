import { Tabs } from "antd-mobile"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { selectChannelState } from "../store/channelSlice"
import { useSelector } from "react-redux"
import ChannelTab from "../components/ChannelTab"
import styled from "styled-components"
import { px2vw } from "../utils/style"

export default function Channel() {
	const navigate = useNavigate()
	const { channelName, childChannelName } = useParams()
	const channels = useSelector(selectChannelState("channels"))
	const [activeParent, setActiveParent] = useState(channels[0])
	const [activeChannel, setActiveChannel] = useState(channels[0].children[0])

	useEffect(() => {
		let active = activeChannel,
			parent = activeParent
		// no child path / parent path changes
		if (channelName !== parent.name) {
			parent = channels.find((c) => c.name === channelName)
			setActiveParent(parent)
		}
		// child path changes
		if (childChannelName) {
			active = parent.children.find((c) => c.name === childChannelName)
		} else {
			active = parent.children[0]
		}
		setActiveChannel(active)
	}, [channelName, childChannelName])

	return (
		<Wrapper>
			<Tabs
				activeKey={activeParent.rid.toString()}
				onChange={(key) => {
					const active = channels.find((c) => c.rid == key)
					navigate(`/channel/${active.name}`)
				}}
			>
				{channels.map((channel) => {
					return (
						<Tabs.Tab
							key={channel.rid.toString()}
							title={channel.title}
						>
							<Tabs
								activeKey={activeChannel.rid.toString()}
								onChange={(key) => {
									const active = channel.children.find((c) => c.rid == key)
									navigate(
										`/channel/${channel.name}${
											active.rid === activeParent.rid ? "" : "/" + active.name
										}`
									)
								}}
							>
								{channel.children.map((childChannel) => {
									return (
										<Tabs.Tab
											key={childChannel.rid.toString()}
											title={childChannel.title}
										>
											<ChannelTab
												channel={childChannel}
												active={childChannel === activeChannel}
											/>
										</Tabs.Tab>
									)
								})}
							</Tabs>
						</Tabs.Tab>
					)
				})}
			</Tabs>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.adm-tabs-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--color-background);
		height: ${px2vw`37.98px`};
	}
	.adm-tabs-content {
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;

		.adm-tabs-header {
			top: ${px2vw`37.98px`};
		}
	}
`
