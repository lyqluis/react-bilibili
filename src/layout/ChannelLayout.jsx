import { Outlet } from "react-router-dom"
import useRequest from "../hooks/useRequest"
import { getAllChannels } from "../api/channel"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setChannels, initChannelsVideos } from "../store/channelSlice"
import { selectChannelState } from "../store/channelSlice"

export default function ChannelLayout() {
	const { loading, data } = useRequest(getAllChannels)
	const dispatch = useDispatch()
	const channels = useSelector(selectChannelState("channels"))

	useEffect(() => {
		if (data) {
			const channels = data.data
			dispatch(setChannels(channels))
			channels.forEach((parent) => {
				parent.children.forEach((channel) =>
					dispatch(initChannelsVideos(channel.name))
				)
			})
		}
	}, [data])

	if (!channels.length) return <p>loading</p>

	return <Outlet />
}
