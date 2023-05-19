import { useState, useEffect } from "react"
import useFetch from "../hooks/useFetch"
import { Tabs } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import RankTab from "../components/RankTab"
import styled from "styled-components"
import { getRankChannels } from "../api/rank"

export default function Rank() {
	const { loading, data, finished } = useFetch(getRankChannels)
	const [channels, setChannels] = useState([])
	const [activeChannel, setActiveChannel] = useState(null)
	const navigate = useNavigate()
	const { channelName } = useParams()

	useEffect(() => {
		if (finished) {
			const channels = data.data
			channels.unshift({
				title: "总榜",
				name: "all",
				rid: 0,
			})
			setChannels(channels)
		}
	}, [data])

	useEffect(() => {
		if (channels.length) {
			let active = activeChannel ?? channels[0]
			if (channelName !== active.name) {
				active = channels.find((c) => c.name === channelName) ?? channels[0]
			}
			setActiveChannel(active)
		}
	}, [channelName, channels])

	if (!activeChannel) return <h1>loading</h1>

	return (
		<Wrapper>
			<Tabs
				activeKey={activeChannel.rid.toString()}
				onChange={(key) => {
					const active = channels.find((c) => c.rid == key)
					const path = active.name === "all" ? "" : `/${active.name}`
					navigate(`/rank${path}`)
				}}
				style={{ position: "sticky", top: 0 }}
			>
				{channels.map((channel) => {
					return (
						<Tabs.Tab
							key={channel.rid.toString()}
							title={channel.title}
						>
							<RankTab channel={channel} />
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
	}
	.adm-tabs-content {
		padding: 0;
	}
`
