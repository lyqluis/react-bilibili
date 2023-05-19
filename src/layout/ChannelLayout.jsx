import { Outlet } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { getAllChannels } from "../api/channel"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setChannels, initChannelsVideos } from "../store/channelSlice"

export default function ChannelLayout() {
	const { loading, data } = useFetch(getAllChannels)
	const dispatch = useDispatch()

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

	if (loading) return <p>loading</p>

	return <Outlet />
}
