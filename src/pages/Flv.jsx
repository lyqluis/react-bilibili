import flv from "flv.js"
import { useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMediaUrl, getVideoInfo } from "../api/video"
import { isCodecSupported } from "../utils/global"
// import { addSource, getInitBuffer } from "../utils/video"
import { addSource, getInitBuffer } from "../utils/video1"
import { useState } from "react"

const Video = () => {
	const { bvid } = useParams()
	const video = useRef(null)
	const mediaSource = useRef(null)
	const sourceBuffer = useRef(null)
	const mediaInfo = useRef(null)
	const player = MediaPlayer().create()
	const [sidx, setSidx] = useState([])

	const fetchVideoInfo = async () => {
		const { videoInfo, audioInfo, playInfo } = await getVideoInfo(bvid)
		// 视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
		const videoMimeCodec =
			(videoInfo.mimeCodec = `${videoInfo.mimeType}; codecs="${videoInfo.codecs}"`)
		const audioMimeCodec =
			(audioInfo.mimeCodec = `${audioInfo.mimeType}; codecs="${audioInfo.codecs}"`)

		console.log(playInfo)

		// check if browser support the codec
		if (!isCodecSupported(videoMimeCodec) && !isCodecSupported(audioMimeCodec))
			return

		mediaInfo.current = { videoInfo, audioInfo }
		mediaInfo.current.url = getMediaUrl(bvid)

		// create a media source instance
		// mediaSource.current = new MediaSource()
		// video.current.src = URL.createObjectURL(mediaSource.current) // 将 <video> 与 MediaSource 绑定，此处生成一个 Blob URL

		// mediaSource.current.addEventListener("sourceopen", openSource)

		// sourceBuffer.current = player.createBuffer(videoMimeCodec)
	}

	const init = async () => {
		// init player
		player.initialize(video.current, null, false)
		// fetch video info
		await fetchVideoInfo()
		// fetch & parse init buffer
		const sidxList = await getInitBuffer(
			mediaInfo.current.url,
			mediaInfo.current.videoInfo
		)

		// todo
		setSidx(sidxList)
		// append init buffer
		// sourceBuffer.current.appendBuffer(initBuffer)
	}

	const openSource = () => {
		const { videoInfo, audioInfo, url } = mediaInfo.current
		// todo combine audio & video
		addSource(videoInfo, mediaSource.current, video.current, url, sidx)
		// addSource(audioInfo, mediaSource.current, video.current, url, BUFFER_TIME)
		// addAudioSource(audioInfo, mediaSource)
	}

	useEffect(() => {
		init()
	}, [bvid])

	useEffect(() => {
		if (sidx.length) {
			// todo
			// create a media source instance
			mediaSource.current = new MediaSource()
			video.current.src = URL.createObjectURL(mediaSource.current) // 将 <video> 与 MediaSource 绑定，此处生成一个 Blob URL

			mediaSource.current.addEventListener("sourceopen", openSource)
		}

		return () => {
			if (mediaSource.current) {
				mediaSource.current.removeEventListener("sourceopen", openSource)
			}
		}
	}, [sidx])

	return (
		<>
			<video
				ref={video}
				width='100%'
				height='auto'
				controls
			>
				<source type='application/dash+xml' />
				Your browser does not support the video tag.
			</video>
		</>
	)
}

export default Video
