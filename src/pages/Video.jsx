import { useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMediaUrl, getVideoInfo } from "../api/video"
import { isCodecSupported } from "../utils/global"
import { addSource } from "../utils/video"
import { SourceBuffer } from "../utils/video2"
import Player from "../utils/player"

const Video = () => {
	const { bvid } = useParams()
	const video = useRef(null)
	const mediaSource = useRef(null)
	const mediaInfo = useRef(null)
	const sidx = []

	const BUFFER_TIME = 10
	let videoSourceBuffer
	let videoBuffered = 0
	let audioSourceBuffer
	let audioBuffered = 0
	// let videoBuffered = 0

	const openSource = () => {
		const { videoInfo, audioInfo, url } = mediaInfo.current
		// todo combine audio & video
		// addSource(
		// 	videoInfo,
		// 	mediaSource.current,
		// 	video.current,
		// 	url,
		// 	0,
		// 	BUFFER_TIME
		// )
		const videoBuffer = new SourceBuffer(
			videoInfo,
			mediaSource.current,
			video.current,
			url
		)
		video.current.addEventListener("seeking", (e) => {
			console.log("seeking", e)
			videoBuffer.seeking = true
			const { currentTime } = e.target
			videoBuffer.changeBuffer(currentTime)
		})

		// addSource(audioInfo, mediaSource.current, video.current, url, BUFFER_TIME)
		// addAudioSource(audioInfo, mediaSource)
	}

	useEffect(() => {
		// todo fetch the video's videoinfo & audioinfo
		const createVideo = async () => {
			const player = new Player(video.current)
			const res = await getVideoInfo(bvid)
			player.init(res)
			
			// 视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
			// const videoMimeCodec =
			// 	(videoInfo.mimeCodec = `${videoInfo.mimeType}; codecs="${videoInfo.codecs}"`)
			// const audioMimeCodec =
			// 	(audioInfo.mimeCodec = `${audioInfo.mimeType}; codecs="${audioInfo.codecs}"`)

			// console.log(playInfo)

			// // check if browser support the codec
			// if (
			// 	!isCodecSupported(videoMimeCodec) &&
			// 	!isCodecSupported(audioMimeCodec)
			// )
			// 	return

			// mediaInfo.current = { videoInfo, audioInfo }
			// mediaInfo.current.url = getMediaUrl(bvid)

			// // create a media source instance
			// mediaSource.current = new MediaSource()
			// video.current.src = URL.createObjectURL(mediaSource.current) // 将 <video> 与 MediaSource 绑定，此处生成一个 Blob URL

			// mediaSource.current.addEventListener("sourceopen", openSource)
		}

		createVideo()

		return () => {
			mediaSource.current.removeEventListener("sourceopen", openSource)
		}
	}, [bvid])

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
